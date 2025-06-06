import { useQuery } from '@tanstack/react-query';
import { dashboardEndpoints } from '../api/endpoints/dashboard.endpoints';
import type { UserData } from '../types/api/auth.types';

export const useUserData = () => {
  const { data, isLoading, error, refetch } = useQuery<UserData>({
    queryKey: ['userProfile'],
    queryFn: dashboardEndpoints.getUserProfile,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 1
  });

  return {
    profile: data?.profile,
    game: data?.game,
    finances: data?.finances,
    isLoading,
    error,
    refetch
  };
}; 