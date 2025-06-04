import { useQuery } from '@tanstack/react-query';
import { userEndpoints } from '../../../api/endpoints/user.endpoints';
import { useAuthContext } from '../../../providers/AuthProvider';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  publicKey: string;
  avatar: string;
  level: number;
  badges: string[];
  fechaNacimiento: string;
}

interface GameData {
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

interface FinanceData {
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

interface UserData {
  profile: UserProfile;
  game: GameData;
  finances: FinanceData;
}

export const useUserData = () => {
  const { user } = useAuthContext();

  const { data: userData, isLoading } = useQuery<UserData>({
    queryKey: ['userData'],
    queryFn: userEndpoints.getUserData,
    enabled: !!user
  });

  return {
    profile: userData?.profile,
    game: userData?.game,
    finances: userData?.finances,
    isLoading
  };
}; 