import { api } from '../api.config';

export interface CarStats {
  speed: number;
  handling: number;
  acceleration: number;
}

export interface CarListing {
  id: number;
  carId: number;
  name: string;
  price: string;
  seller: string;
  stats: CarStats;
}

export interface ListingsResponse {
  listings: CarListing[];
}

export interface SellRequest {
  carId: number;
  price: string;
}

export interface SellResponse {
  listingId: number;
  carId: number;
  price: string;
  status: 'LISTED' | 'SOLD' | 'CANCELLED';
  timestamp: string;
}

export interface BuyRequest {
  listingId: number;
  buyerId: number;
}

export interface BuyResponse {
  status: string;
  message: string;
  carId: number;
  buyerId: number;
  sellerId: number;
  price: string;
  signature: string;
}

export const marketplaceEndpoints = {
  getListings: async (): Promise<ListingsResponse> => {
    const response = await api.get<ListingsResponse>('/api/marketplace/listings');
    return response.data;
  },

  sellCar: async (data: SellRequest): Promise<SellResponse> => {
    const response = await api.post<SellResponse>('/api/marketplace/sell', data);
    return response.data;
  },

  buyCar: async (data: BuyRequest): Promise<BuyResponse> => {
    const response = await api.post<BuyResponse>('/api/marketplace/buy', data);
    return response.data;
  }
}; 