import { useMutation, useQueryClient } from '@tanstack/react-query';
import { exchangeEndpoints } from '../../../api/endpoints/exchange.endpoints';
import type {
  ExchangeRequest,
  ExchangeResponse,
  TokenTransferRequest,
  NFTTransferRequest,
  NFTTransferResponse,
  CreateOrderRequest,
  Order
} from '../../../api/endpoints/exchange.endpoints';
import { exchangeService } from '../../../services/exchangeService';

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

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation<Order, Error, CreateOrderRequest>({
    mutationFn: exchangeService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orderbook'] as const });
      queryClient.invalidateQueries({ queryKey: ['recent-trades'] as const });
    }
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId: number) => exchangeService.cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orderbook'] as const });
      queryClient.invalidateQueries({ queryKey: ['recent-trades'] as const });
    }
  });
}; 