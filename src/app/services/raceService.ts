import { raceEndpoints } from '../api/endpoints/race.endpoints';
import type {
  BetResponse,
  RaceResultRequest,
  RaceResultResponse
} from '../api/endpoints/race.endpoints';

interface BetData {
  userId: number;
  rivalId: number;
  cantidad: number;
}

export const raceService = {
  createBet: async (betData: BetData): Promise<BetResponse> => {
    return await raceEndpoints.createBet(betData);
  },

  submitRaceResult: async (resultData: RaceResultRequest): Promise<RaceResultResponse> => {
    return await raceEndpoints.submitRaceResult(resultData);
  }
}; 