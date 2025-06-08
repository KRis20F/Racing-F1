import { api } from '../api.config';

export interface BuyCarRequest {
  carId: number;
}

export interface BuyCarResponse {
  status: string;
  message: string;
  carId: number;
  buyerId: number;
  price: string;
  signature: string;
}

export const shopEndpoints = {
  buyCar: async (data: BuyCarRequest): Promise<BuyCarResponse> => {
    const response = await api.post('/api/shop/buy', data);
    return response.data;
  }
}; 