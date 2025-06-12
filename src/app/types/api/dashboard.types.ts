export interface UserStats {
  totalRaces: number;
  wins: number;
  losses: number;
  winRate: number;
  bestLapTime: string;
  averageLapTime: string;
  totalDistance: number;
  favoriteCar: string;
}

export interface TokenHistory {
  timestamp: string;
  price: number;
  volume: number;
}

export interface GlobalStats {
  totalUsers: number;
  activeUsers: number;
  totalRaces: number;
  totalTransactions: number;
  averageRaceTime: string;
  popularCars: string[];
  totalBets: number;
}

export interface MarketOverview {
  tokenPrice: number;
  tokenVolume: number;
  marketCap: number;
  circulatingSupply: number;
  totalSupply: number;
  priceChange24h: number;
  volumeChange24h: number;
}

export interface WalletInfo {
  wallet: {
    address: string;
    balance: string;
  };
  billing_preferences?: {
    currency: string;
    notifications: boolean;
  };
  transaction_limits?: {
    daily: number;
    monthly: number;
  };
  usdBalance?: string;
} 