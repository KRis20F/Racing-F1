import { useQuery } from '@tanstack/react-query';
import { api } from '../../../api/api.config';

export interface CarListing {
  id: string;
  carId: string;
  name: string;
  price: number;
  seller: string;
  stats: {
    speed: number;
    handling: number;
    acceleration: number;
  };
  modelPath: string;
  modelSize: string;
  modelType: string;
}

export const useCarListings = () => {
  return useQuery({
    queryKey: ['carListings'],
    queryFn: async () => {
      const { data } = await api.get<{ listings: CarListing[] }>('/api/cars/listings');
      return data.listings;
    }
  });
}; 