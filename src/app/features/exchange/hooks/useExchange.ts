import { useMutation } from '@tanstack/react-query';
import { exchangeService } from '../../../services/exchangeService';
import type {
  ExchangeRequest,
  ExchangeResponse,
  TokenTransferRequest,
  NFTTransferRequest
} from '../../../api/endpoints/exchange.endpoints';

export const useExchange = () => {
  const exchangeTokenMutation = useMutation<ExchangeResponse, Error, ExchangeRequest>({
    mutationFn: exchangeService.exchangeToken
  });

  const transferTokenMutation = useMutation<void, Error, TokenTransferRequest>({
    mutationFn: exchangeService.transferToken
  });

  const transferNFTMutation = useMutation<void, Error, NFTTransferRequest>({
    mutationFn: exchangeService.transferNFT
  });

  return {
    exchangeToken: exchangeTokenMutation.mutate,
    isExchangingToken: exchangeTokenMutation.isPending,
    exchangeTokenError: exchangeTokenMutation.error,

    transferToken: transferTokenMutation.mutate,
    isTransferringToken: transferTokenMutation.isPending,
    transferTokenError: transferTokenMutation.error,

    transferNFT: transferNFTMutation.mutate,
    isTransferringNFT: transferNFTMutation.isPending,
    transferNFTError: transferNFTMutation.error
  };
}; 