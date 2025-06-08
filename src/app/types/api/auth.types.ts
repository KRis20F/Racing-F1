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
  description: string;
  modelPath: string;
  category: string;
  specs: {
    power: string;
    acceleration: string;
    topSpeed: string;
    weight: string;
  };
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
  cameraPosition: [number, number, number];
  fov: number;
  preview_image?: string;
  thumbnail_image?: string;
  price?: number;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  publicKey: string;
  avatar: string;
  level: number;
  rank: string;
  experience: number;
  badges: string[];
  fechaNacimiento: string;
  cars: Car[];
}

export interface GameData {
  bestLapTime: string;
  totalDistance: number;
  totalRaces: number;
  wins: number;
  losses: number;
}

export interface FinanceData {
  usdBalance: string;
  wallet: string;
  tokenBalance: string;
  recentTransactions?: Transaction[];
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

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: string;
  currency: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
} 