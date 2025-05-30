import { useMutation, useQuery } from '@tanstack/react-query';
import { marketplaceService } from '../services/marketplaceService';
import type {
  ListingsResponse,
  SellRequest,
  SellResponse,
  BuyRequest,
  BuyResponse
} from '../api/endpoints/marketplace.endpoints';

export const useMarketplace = () => {
  const {
    data: listings,
    isLoading: isLoadingListings,
    error: listingsError
  } = useQuery<ListingsResponse>({
    queryKey: ['marketplace', 'listings'],
    queryFn: marketplaceService.getListings
  });

  const sellCarMutation = useMutation<SellResponse, Error, SellRequest>({
    mutationFn: marketplaceService.sellCar
  });

  const buyCarMutation = useMutation<BuyResponse, Error, BuyRequest>({
    mutationFn: marketplaceService.buyCar
  });

  return {
    // Queries
    listings,
    isLoadingListings,
    listingsError,

    // Mutations
    sellCar: sellCarMutation.mutate,
    isSellingCar: sellCarMutation.isPending,
    sellCarError: sellCarMutation.error,

    buyCar: buyCarMutation.mutate,
    isBuyingCar: buyCarMutation.isPending,
    buyCarError: buyCarMutation.error
  };
}; 