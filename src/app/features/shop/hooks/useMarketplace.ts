import { useQuery } from '@tanstack/react-query';
import { api } from '../../../api/api.config';
import { CarListing } from '../data/carModels';

export const useMarketplace = () => {
  const { data: listings, isLoading } = useQuery({
    queryKey: ['marketplace', 'listings'],
    queryFn: async () => {
      const response = await api.get<{ listings: CarListing[] }>('/api/marketplace/listings');
      return response.data.listings;
    }
  });

  return {
    listings,
    isLoading
  };
}; 