import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { walletService } from '../services/walletService';
import { storage } from '../utils/storage';
import { dashboardEndpoints } from '../api/endpoints/dashboard.endpoints';
import type { UserData } from '../types/api/auth.types';
import type {
  WalletResponse,
  TokenAccountResponse,
  TransferResponse,
  TokenBalanceResponse
} from '../api/endpoints/wallet.endpoints';

interface WalletError extends Error {
  response?: {
    data?: {
      error?: string;
      status?: number;
      wallet?: {
        publicKey: string;
      };
    };
  };
}

export type WalletCreationStep = 0 | 1 | 2 | 3;

export const useWallet = (onStepChange?: (step: WalletCreationStep) => void) => {
  // Si no se proporciona publicKey, intentamos obtenerla del storage
  const storedPublicKey = storage.getPublicKey();

  const {
    data: tokenBalance,
    isLoading: isLoadingBalance,
    error: balanceError,
    refetch: refetchBalance
  } = useQuery<TokenBalanceResponse, WalletError>({
    queryKey: ['tokenBalance', storedPublicKey],
    queryFn: () => walletService.getTokenBalance(storedPublicKey!),
    enabled: !!storedPublicKey,
    retry: (failureCount, error) => {
      // Only retry if it's not a 400 error (which indicates invalid request)
      const status = error?.response?.data?.status;
      if (error?.response?.data?.error === 'Invalid wallet address') {
        storage.setPublicKey(''); // Clear the public key by setting it to empty string
        return false;
      }
      return status !== 400 && failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * (attemptIndex + 1), 5000), // Exponential backoff
    staleTime: 30000,
    refetchOnWindowFocus: false
  });

  const queryClient = useQueryClient();

  const createWalletMutation = useMutation<WalletResponse, WalletError>({
    mutationFn: walletService.createWallet,
    onSuccess: (data) => {
      if (data.user?.publicKey) {
        storage.setPublicKey(data.user.publicKey);
        // Invalidar queries relacionadas
        queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        queryClient.invalidateQueries({ queryKey: ['userData'] });
        queryClient.invalidateQueries({ queryKey: ['tokenBalance'] });
      }
    }
  });

  const createTokenAccountMutation = useMutation<TokenAccountResponse, WalletError, string>({
    mutationFn: walletService.createTokenAccount,
    onSuccess: () => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      queryClient.invalidateQueries({ queryKey: ['userData'] });
      queryClient.invalidateQueries({ queryKey: ['tokenBalance'] });
    }
  });

  const transferTokensMutation = useMutation<
    TransferResponse,
    WalletError,
    { fromPublicKey: string; toPublicKey: string; amount: string }
  >({
    mutationFn: ({ fromPublicKey, toPublicKey, amount }) =>
      walletService.transferTokens(fromPublicKey, toPublicKey, amount)
  });

  // Nueva función que combina la creación de wallet y cuenta de token
  const createFullWallet = async () => {
    try {
      console.log('Iniciando creación de wallet completa...');
      onStepChange?.(0); // Creando Wallet
      
      let walletPublicKey: string;
      
      try {
        // 1. Intentar crear la wallet
        console.log('Paso 1: Creando wallet...');
        const walletResponse = await createWalletMutation.mutateAsync();
        console.log('Wallet creada:', walletResponse);
        if (!walletResponse.user?.publicKey) {
          throw new Error('No se recibió la public key de la wallet');
        }
        walletPublicKey = walletResponse.user.publicKey;
        onStepChange?.(1); // Wallet Creada

        // Forzar actualización inmediata
        await queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        await queryClient.invalidateQueries({ queryKey: ['userData'] });
      } catch (error) {
        const walletError = error as WalletError;
        // Si el error es que ya tiene wallet, usamos esa
        if (walletError?.response?.data?.error === 'El usuario ya tiene wallet') {
          console.log('El usuario ya tiene wallet, usando la existente');
          if (walletError.response.data.wallet?.publicKey) {
            walletPublicKey = walletError.response.data.wallet.publicKey;
            storage.setPublicKey(walletPublicKey);
            onStepChange?.(1); // Wallet ya existía
          } else {
            // Si no tenemos la public key en el error, intentamos obtenerla del storage o del perfil
            const storedKey = storage.getPublicKey();
            if (storedKey) {
              walletPublicKey = storedKey;
              onStepChange?.(1);
            } else {
              // Forzar actualización del perfil para obtener la public key
              const profile = await queryClient.fetchQuery<UserData>({
                queryKey: ['userProfile'],
                queryFn: dashboardEndpoints.getUserProfile
              });
              if (profile?.finances?.wallet?.address) {
                walletPublicKey = profile.finances.wallet.address;
                storage.setPublicKey(walletPublicKey);
                onStepChange?.(1);
              } else {
                throw new Error('No se pudo obtener la public key de la wallet');
              }
            }
          }
        } else {
          throw error;
        }
      }

      // 2. Crear cuenta de token
      console.log('Paso 2: Creando cuenta de token...');
      onStepChange?.(2);
      
      try {
        const tokenAccount = await createTokenAccountMutation.mutateAsync(walletPublicKey);
        console.log('Cuenta de token creada:', tokenAccount);
        onStepChange?.(3);

        // Forzar actualización inmediata después de crear la cuenta de token
        await queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        await queryClient.invalidateQueries({ queryKey: ['userData'] });
        await queryClient.invalidateQueries({ queryKey: ['tokenBalance'] });
      } catch (error) {
        const tokenError = error as WalletError;
        // Si ya existe la cuenta de token, no es un error
        if (tokenError?.response?.data?.error === 'Token account already exists') {
          console.log('La cuenta de token ya existe');
          onStepChange?.(3);
        } else {
          throw error;
        }
      }

      // 3. Refrescar el balance con reintento
      console.log('Paso 3: Actualizando balance...');
      let retries = 0;
      const maxRetries = 3;
      
      while (retries < maxRetries) {
        try {
          await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar 2 segundos
          const result = await refetchBalance();
          if (result.data) {
            console.log('Balance actualizado exitosamente:', result.data);
            break;
          }
        } catch (error: unknown) {
          console.log(`Intento ${retries + 1} fallido, reintentando...`, error);
        }
        retries++;
      }

      return {
        user: { publicKey: walletPublicKey },
        wallet: { address: walletPublicKey }
      };
    } catch (error) {
      console.error('Error al crear wallet completa:', error);
      throw error;
    }
  };

  return {
    // Queries
    tokenBalance,
    isLoadingBalance,
    balanceError,
    storedPublicKey,
    refetchBalance,

    // Mutations
    createFullWallet,
    createWallet: createWalletMutation.mutate,
    isCreatingWallet: createWalletMutation.isPending || createTokenAccountMutation.isPending,
    createWalletError: createWalletMutation.error || createTokenAccountMutation.error,

    createTokenAccount: createTokenAccountMutation.mutate,
    isCreatingTokenAccount: createTokenAccountMutation.isPending,
    createTokenAccountError: createTokenAccountMutation.error,

    transferTokens: transferTokensMutation.mutate,
    isTransferringTokens: transferTokensMutation.isPending,
    transferTokensError: transferTokensMutation.error
  };
}; 