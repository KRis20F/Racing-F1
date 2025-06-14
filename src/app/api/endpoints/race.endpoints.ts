import { api } from '../api.config';

export interface BetRequest {
  userId: number;
  rivalId: number;
  cantidad: number;
}

export interface BetResponse {
  status: string;
  message: string;
}

export interface RaceResult {
  position: number;
  carId: number;
  time: string;
}

export interface RaceResultRequest {
  raceId: number;
  results: RaceResult[];
}

export interface RaceWinner {
  position: number;
  carId: number;
  prize: string;
}

export interface RaceResultResponse {
  raceId: number;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
  winners: RaceWinner[];
  timestamp: string;
}

export interface MatchmakingResponse {
  status: 'waiting' | 'matched';
  message: string;
  player: number;
  rivalId?: number;
  you?: number;
}

export const raceEndpoints = {
  createBet: async (betData: BetRequest): Promise<BetResponse> => {
    const response = await api.post<BetResponse>('/api/bet/create', betData);
    return response.data;
  },

  submitRaceResult: async (resultData: RaceResultRequest): Promise<RaceResultResponse> => {
    const response = await api.post<RaceResultResponse>('/race/result', resultData);
    return response.data;
  },

  joinMatchmaking: async (): Promise<MatchmakingResponse> => {
    const response = await api.post<MatchmakingResponse>('/api/race/matchmaking/join');
    return response.data;
  }
}; 