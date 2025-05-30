import { exchangeEndpoints } from '../api/endpoints/exchange.endpoints';
import type {
  ExchangeRequest,
  ExchangeResponse,
  TokenTransferRequest,
  NFTTransferRequest
} from '../api/endpoints/exchange.endpoints';

export const exchangeService = {
  exchangeToken: async (data: ExchangeRequest): Promise<ExchangeResponse> => {
    return await exchangeEndpoints.exchangeToken(data);
  },

  transferToken: async (data: TokenTransferRequest): Promise<void> => {
    await exchangeEndpoints.transferToken(data);
  },

  transferNFT: async (data: NFTTransferRequest): Promise<void> => {
    await exchangeEndpoints.transferNFT(data);
  }
}; 