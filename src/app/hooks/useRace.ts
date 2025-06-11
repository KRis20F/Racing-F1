import { useMutation } from '@tanstack/react-query';
import { raceService } from '../services/raceService';
import type {
  BetRequest,
  BetResponse,
  RaceResultRequest,
  RaceResultResponse
} from '../api/endpoints/race.endpoints';

interface BetData {
  userId: number;
  rivalId: number;
  cantidad: number;
}

export const useRace = () => {
  const createBetMutation = useMutation<BetResponse, Error, BetData>({
    mutationFn: raceService.createBet
  });

  const submitRaceResultMutation = useMutation<RaceResultResponse, Error, RaceResultRequest>({
    mutationFn: raceService.submitRaceResult
  });

  return {
    createBet: createBetMutation.mutate,
    isCreatingBet: createBetMutation.isPending,
    createBetError: createBetMutation.error,

    submitRaceResult: submitRaceResultMutation.mutate,
    isSubmittingResult: submitRaceResultMutation.isPending,
    submitResultError: submitRaceResultMutation.error
  };
}; 