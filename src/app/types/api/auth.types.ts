export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  username: string;
  fechaNacimiento: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  publicKey: string;
  avatar: string;
  level: number;
  badges: string[];
  fechaNacimiento: string;
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