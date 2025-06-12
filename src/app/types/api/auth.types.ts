export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  username: string;
  fechaNacimiento: string;
}

export interface Car {
  id: string;
  name: string;
  category: string;
  modelPath: string;
  thumbnail_image: string;
  stats: {
    speed: number;
    acceleration: number;
    handling: number;
    braking: number;
  };
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  publicKey?: string;
  avatar?: string;
  level: number;
  badges?: string[];
  fechaNacimiento?: string;
  cars?: Car[];
  rank?: number;
  experience?: {
    current: number;
    total: number;
  };
  finances?: {
    tokenBalance: string;
    usdBalance: string;
    wallet: {
      balance: string;
      address: string;
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
  };
}

export interface GameData {
  experience: number;
  totalRaces: number;
  wins: number;
  losses: number;
  rank: string;
  stats: {
    bestLapTime: number | null;
    carCollection: string[];
    favoriteTrack: string | null;
    totalDistance: number;
  };
}

export interface FinanceData {
  tokenBalance: string;
  usdBalance: string;
  wallet: {
    balance: string;
    address: string;
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

export interface UserData {
  profile: UserProfile;
  game: GameData;
  finances: FinanceData;
  bets: BetData[];
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfileData {
  username?: string;
  email?: string;
  avatar?: string;
  fechaNacimiento?: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: string;
  currency: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
} 