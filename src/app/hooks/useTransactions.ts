import { useQuery } from '@tanstack/react-query';
import { transactionService, type Transaction, type ShopTransaction } from '../services/transactionService';
import { useUserData } from './useUserData';

export const useTransactions = () => {
  const { profile } = useUserData();
  const userId = profile?.id;

  const {
    data: transactionHistory,
    isLoading: isLoadingTransactions,
    error: transactionError,
    refetch: refetchTransactions
  } = useQuery<Transaction[]>({
    queryKey: ['transactions', userId],
    queryFn: () => userId ? transactionService.getTransactionHistory(userId) : Promise.resolve([]),
    enabled: !!userId
  });

  const {
    data: shopHistory,
    isLoading: isLoadingShopHistory,
    error: shopError,
    refetch: refetchShopHistory
  } = useQuery<ShopTransaction[]>({
    queryKey: ['shopTransactions', userId],
    queryFn: () => userId ? transactionService.getShopHistory(userId) : Promise.resolve([]),
    enabled: !!userId
  });

  return {
    // Historial general de transacciones
    transactionHistory,
    isLoadingTransactions,
    transactionError,
    refetchTransactions,

    // Historial de compras de la tienda
    shopHistory,
    isLoadingShopHistory,
    shopError,
    refetchShopHistory
  };
}; 