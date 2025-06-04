import { marketplaceEndpoints } from '../api/endpoints/marketplace.endpoints';
import type {
  ListingsResponse,
  SellRequest,
  SellResponse,
  BuyRequest,
  BuyResponse
} from '../api/endpoints/marketplace.endpoints';

export const marketplaceService = {
  getListings: async (): Promise<ListingsResponse> => {
    return await marketplaceEndpoints.getListings();
  },

  sellCar: async (data: SellRequest): Promise<SellResponse> => {
    return await marketplaceEndpoints.sellCar(data);
  },

  buyCar: async (data: BuyRequest): Promise<BuyResponse> => {
    return await marketplaceEndpoints.buyCar(data);
  }
}; 