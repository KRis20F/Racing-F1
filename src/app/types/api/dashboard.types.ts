export interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

export interface ProfileData {
  level: number;
  experience: number;
  rank: string;
}

export interface StatsData {
  totalRaces: number;
  wins: number;
  losses: number;
  winRate: number;
  bestLapTime: number;
  totalDistance: number;
  favoriteTrack: string;
  carCollection: string[];
  experience: number;
  rank: string;
}

export interface WalletData {
  usd: number;
  tokens: number;
  wallet: {
    address: string;
    balance: string;
  };
  transaction_limits: {
    daily_limit: number;
    monthly_limit: number;
    max_transaction: number;
  };
  billing_preferences: {
    auto_pay: boolean;
    invoice_email: string | null;
    default_currency: string;
  };
}

export interface UserStats {
  totalRaces: number;
  wins: number;
  tokenBalance: number;
  level: number;
}

export interface UserProfile {
  profile: {
    username: string;
    rank: string;
    level: number;
    experience: number;
  };
  game: {
    bestLapTime: string;
    totalDistance: number;
  };
}

export interface TokenPriceHistory {
  name: string;
  value: number;
  avg: number;
}

export interface GlobalStats {
  activeRacers: {
    month: string;
    value: number;
  }[];
  weeklyChange: string;
}

export interface MarketOverview {
  tokenPrice: {
    value: number;
    trend: 'up' | 'down';
  };
  volume24h: number;
  marketCap: number;
}

export interface WalletInfo {
  usdBalance: number;
  rctBalance: number;
  walletAddress: string;
} 