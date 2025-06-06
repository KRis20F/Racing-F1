export interface UserProfile {
  id: string;
  username: string;
  profile: {
    level: number;
    experience: number;
    avatar: string;
  };
  finances: {
    wallet: string;
    tokenBalance: string;
  };
  cars: Array<{
    id: string;
    name: string;
    category: string;
  }>;
}

export interface UserStats {
  totalRaces: number;
  wins: number;
  earnings: number;
  rank: number;
}

export interface GlobalStats {
  totalUsers: number;
  activeRaces: number;
  totalPrizePool: number;
  averageEarnings: number;
} 