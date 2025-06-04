import type { ReactNode } from 'react';

export interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
}

export interface UserStats {
  level: number;
  experience: number;
  totalRaces: number;
  wins: number;
  losses: number;
  rank: string;
  tokenBalance: string;
  stats: {
    racingStats: {
      avgSpeed: number;
      bestLap: string;
      totalDistance: number;
    };
    earnings: {
      total: number;
      monthly: number;
      weekly: number;
    };
  };
}

export interface UserProfile {
  profile: {
    username: string;
    level: number;
    rank: string;
    experience: number;
  };
  game: {
    bestLapTime: string;
    totalDistance: number;
  };
  finances: {
    balance: WalletBalance;
    wallet: Wallet;
    recentTransactions?: Transaction[];
    tokenBalance: string;
  };
  cars: Car[];
}

export interface TokenHistory {
  name: string;
  value: number;
  avg: number;
}

export interface GlobalStats {
  totalUsers: number;
  totalBets: number;
  totalRaces: number;
}

export interface MarketOverview {
  totalCars: number;
  popularCars: Car[];
  recentTransactions: Transaction[];
  marketStats: {
    totalVolume: string;
    avgPrice: string;
    activeListings: number;
    last24hTransactions: number;
  };
}

export interface WalletInfo {
  usdBalance: number;
  rctBalance: number;
  walletAddress: string;
}

export interface Car {
  name: string;
  id: string;
  type: string;
}

export interface Wallet {
  address: string;
  network: string;
}

export interface PaymentCard {
  id: string;
  last4: string;
  brand: 'visa' | 'mastercard' | 'amex';
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'RACE_REWARD' | 'BET';
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  timestamp: string;
  description?: string;
}

export interface WalletBalance {
  balance: string;
  usdBalance: string;
  pendingBalance: string;
}

export interface TransactionHistory {
  transactions: Transaction[];
  totalCount: number;
  hasMore: boolean;
} 