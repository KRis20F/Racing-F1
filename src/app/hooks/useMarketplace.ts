import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { marketplaceEndpoints } from '../api/endpoints/marketplace.endpoints';
import type {
  ListingsResponse,
  SellRequest,
  SellResponse,
  BuyRequest,
  BuyResponse
} from '../api/endpoints/marketplace.endpoints';

export const useMarketplace = () => {
  const queryClient = useQueryClient();

  // Query para obtener listados
  const {
    data: listings,
    isLoading: isLoadingListings,
    error: listingsError,
    refetch: refetchListings
  } = useQuery<ListingsResponse>({
    queryKey: ['marketplace', 'listings'],
    queryFn: marketplaceEndpoints.getListings
  });

  // Mutation para vender
  const sellCarMutation = useMutation<SellResponse, Error, SellRequest>({
    mutationFn: marketplaceEndpoints.sellCar,
    onSuccess: () => {
      // Invalidar queries relacionadas al completar la venta
      queryClient.invalidateQueries({ queryKey: ['marketplace', 'listings'] });
      queryClient.invalidateQueries({ queryKey: ['userCars'] });
    }
  });

  // Mutation para comprar
  const buyCarMutation = useMutation<BuyResponse, Error, BuyRequest>({
    mutationFn: marketplaceEndpoints.buyCar,
    onSuccess: () => {
      // Invalidar queries relacionadas al completar la compra
      queryClient.invalidateQueries({ queryKey: ['marketplace', 'listings'] });
      queryClient.invalidateQueries({ queryKey: ['userCars'] });
    }
  });

  return {
    // Queries
    listings,
    isLoadingListings,
    listingsError,
    refetchListings,

    // Mutations
    sellCar: sellCarMutation.mutate,
    isSellingCar: sellCarMutation.isPending,
    sellCarError: sellCarMutation.error,

    buyCar: buyCarMutation.mutate,
    isBuyingCar: buyCarMutation.isPending,
    buyCarError: buyCarMutation.error
  };
}; 