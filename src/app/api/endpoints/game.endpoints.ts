import { api } from '../api.config';

// Types
export interface Car {
  id: number;
  name: string;
  category: string;
  price: number;
  modelPath: string;
  description: string;
  specs: {
    power: string;
    acceleration: string;
    topSpeed: string;
    weight: string;
  };
}

export interface CarStats {
  speed: number;
  handling: number;
  acceleration: number;
}

export interface Race {
  id: string;
  startTime: string;
  status: 'pending' | 'in_progress' | 'completed';
  participants: string[];
  winner?: string;
  prize: number;
}

export interface Bet {
  id: string;
  raceId: string;
  amount: number;
  selectedCar: string;
  status: 'pending' | 'won' | 'lost';
}

export interface MarketplaceListing {
  id: string;
  carId: string;
  price: number;
  seller: string;
  status: 'active' | 'sold';
}

// Game Endpoints
export const gameEndpoints = {
  // Cars
  getAllCars: async (): Promise<Car[]> => {
    const response = await api.get('/api/cars');
    return response.data;
  },

  getCarById: async (id: string): Promise<Car> => {
    const response = await api.get(`/api/cars/${id}`);
    return response.data;
  },

  getUserCars: async (): Promise<Car[]> => {
    const response = await api.get('/api/cars/user');
    return response.data;
  },

  // Races
  getActiveRaces: async (): Promise<Race[]> => {
    const response = await api.get('/api/races/active');
    return response.data;
  },

  getRaceById: async (id: string): Promise<Race> => {
    const response = await api.get(`/api/races/${id}`);
    return response.data;
  },

  placeBet: async (data: { raceId: string; amount: number; carId: string }): Promise<Bet> => {
    const response = await api.post('/api/races/bet', data);
    return response.data;
  },

  getUserBets: async (): Promise<Bet[]> => {
    const response = await api.get('/api/races/bets');
    return response.data;
  },

  // Marketplace
  getMarketplaceListings: async (): Promise<MarketplaceListing[]> => {
    const response = await api.get('/api/marketplace/listings');
    return response.data;
  },

  createListing: async (data: { carId: string; price: number }): Promise<MarketplaceListing> => {
    const response = await api.post('/api/marketplace/listings', data);
    return response.data;
  },

  buyListing: async (listingId: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.post(`/api/marketplace/buy/${listingId}`);
    return response.data;
  },

  cancelListing: async (listingId: string): Promise<{ success: boolean }> => {
    const response = await api.delete(`/api/marketplace/listings/${listingId}`);
    return response.data;
  }
}; 