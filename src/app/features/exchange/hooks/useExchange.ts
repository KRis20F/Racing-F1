import { useMutation } from '@tanstack/react-query';
import { exchangeEndpoints } from '../../../api/endpoints/exchange.endpoints';
import type {
  ExchangeRequest,
  ExchangeResponse,
  TokenTransferRequest,
  NFTTransferRequest,
  NFTTransferResponse
} from '../../../api/endpoints/exchange.endpoints';

export const useExchange = () => {
  const exchangeTokenMutation = useMutation<ExchangeResponse, Error, ExchangeRequest>({
    mutationFn: exchangeEndpoints.exchangeToken
  });

  const transferTokenMutation = useMutation<void, Error, TokenTransferRequest>({
    mutationFn: exchangeEndpoints.transferToken
  });

  const transferNFTMutation = useMutation<NFTTransferResponse, Error, NFTTransferRequest>({
    mutationFn: exchangeEndpoints.transferNFT
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