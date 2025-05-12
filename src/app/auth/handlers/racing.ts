import api from '../core/api/apiProvides';

export interface Race {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  status: 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED';
  participants: number;
  prize: string;
  entryFee: string;
}

export interface RaceResult {
  position: number;
  driver: string;
  time: string;
  points: number;
  prize: string;
}

export const getRaces = async (status?: Race['status']): Promise<Race[]> => {
  const response = await api.get<Race[]>('/races', {
    params: { status }
  });
  return response.data;
};

export const getRaceDetails = async (raceId: string): Promise<Race & { results: RaceResult[] }> => {
  const response = await api.get<Race & { results: RaceResult[] }>(`/races/${raceId}`);
  return response.data;
};

export const joinRace = async (raceId: string) => {
  const response = await api.post(`/races/${raceId}/join`);
  return response.data;
};

export const submitRaceResult = async (raceId: string, time: string) => {
  const response = await api.post(`/races/${raceId}/result`, { time });
  return response.data;
};

export const getLeaderboard = async (timeframe: 'daily' | 'weekly' | 'monthly' | 'all-time') => {
  const response = await api.get(`/leaderboard/${timeframe}`);
  return response.data;
};

export const getUserStats = async () => {
  const response = await api.get('/user/stats');
  return response.data;
};
