import { useQuery } from '@tanstack/react-query';
import { raceEndpoints } from '../api/endpoints/race.endpoints';

export const useMatchmaking = () => {
  return useQuery({
    queryKey: ['matchmaking'],
    queryFn: raceEndpoints.joinMatchmaking,
    refetchInterval: 5000, // cada 5 segundos
    refetchOnWindowFocus: false
  });
}; 