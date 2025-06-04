import { useMutation } from '@tanstack/react-query';
import { exchangeEndpoints, type NFTTransferRequest, type NFTTransferResponse } from '../api/endpoints/exchange.endpoints';

export const useNFTTransfer = () => {
  return useMutation<NFTTransferResponse, Error, NFTTransferRequest>({
    mutationFn: exchangeEndpoints.transferNFT,
    onError: (error) => {
      console.error('Error al transferir NFT:', error);
    }
  });
}; 