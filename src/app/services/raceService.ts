import { raceEndpoints } from '../api/endpoints/race.endpoints';
import type {
  BetRequest,
  BetResponse,
  RaceResultRequest,
  RaceResultResponse
} from '../api/endpoints/race.endpoints';

export const raceService = {
  createBet: async (betData: BetRequest): Promise<BetResponse> => {
    return await raceEndpoints.createBet(betData);
  },

  submitRaceResult: async (resultData: RaceResultRequest): Promise<RaceResultResponse> => {
    return await raceEndpoints.submitRaceResult(resultData);
  }
}; 