import { api } from '../api.config';

export interface CarSpecs {
  power: string;
  weight: string;
  topSpeed: string;
  acceleration: string;
  handling: string;
}

export interface MarketplaceCar {
  id: number;
  name: string;
  category: string;
  current_price: string;
  price: number;
  description: string;
  market_status: 'en_venta' | 'pending';
  model_path: string;
  preview_image: string;
  thumbnail_image: string;
  seller_id: number | null;
  specs: CarSpecs;
}

export interface ListingsResponse {
  listings: MarketplaceCar[];
}

export interface BuyRequest {
  listingId: number;
}

export interface SellRequest {
  carId: number;
  price: number;
}

export interface SellResponse {
  listingId: number;
  carId: number;
  price: string;
  status: 'LISTED' | 'SOLD' | 'CANCELLED';
  timestamp: string;
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
  getListings: async (): Promise<MarketplaceCar[]> => {
    const response = await api.get<MarketplaceCar[]>('/api/marketplace/listings');
    return response.data;
  },

  buyCar: async (data: BuyRequest) => {
    const response = await api.post('/api/marketplace/buy', data);
    return response.data;
  },

  sellCar: async (data: SellRequest) => {
    const response = await api.post('/api/marketplace/sell', data);
    return response.data;
  }
}; 