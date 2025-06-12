import { useQuery } from '@tanstack/react-query';
import { userEndpoints } from '../api/endpoints/user.endpoints';
import type { UserData } from '../types/api/auth.types';

export const useUserData = () => {
  const { data, isLoading, error, refetch } = useQuery<UserData>({
    queryKey: ['userData'],
    queryFn: userEndpoints.getUserData,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 1,
    select: (data) => {
      if (!data) return data;
      return {
        ...data,
        finances: {
          ...data.finances,
          tokenBalance: data.finances.tokenBalance || '0.00'
        }
      };
    }
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