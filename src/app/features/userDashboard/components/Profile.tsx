import { useUserData } from '../../../hooks/useUserData';
import { useQuery } from '@tanstack/react-query';
import { dashboardEndpoints } from '../../../api/endpoints/dashboard.endpoints';
import type { UserStats, WalletInfo } from '../../../types/api/dashboard.types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWallet, 
  FaChartLine, 
  FaTrophy, 
  FaClock, 
  FaRoad, 
  FaMedal, 
  FaCoins, 
  FaExchangeAlt, 
  FaQrcode, 
  FaCrown,
  FaFlagCheckered,
  FaCar
} from 'react-icons/fa';
import { IoMdRocket } from 'react-icons/io';
import { GiRaceCar, GiSpeedometer, GiCarWheel } from 'react-icons/gi';
import { truncateAddress } from '../../../utils/wallet';
import { formatNumber } from '../../../utils/format';
import { Skeleton, SkeletonGroup, CardSkeleton } from '../../../UI/Skeleton';

export const Profile = () => {
  const { profile, isLoading: isLoadingProfile } = useUserData();
  const { data: userStats, isLoading: isLoadingStats } = useQuery<UserStats>({
    queryKey: ['userStats'],
    queryFn: dashboardEndpoints.getUserStats
  });
  const { data: walletInfo, isLoading: isLoadingWallet } = useQuery<WalletInfo>({
    queryKey: ['walletInfo'],
    queryFn: dashboardEndpoints.getWalletInfo
  });

  const isLoading = isLoadingProfile || isLoadingStats || isLoadingWallet;

  // Componente de Barra de Progreso
  const ProgressBar = ({ value, colorFrom, colorTo, height = 4 }: { value: number; colorFrom: string; colorTo: string; height?: number }) => (
    <div className={`w-full bg-[#1B254B] rounded-full h-${height}`}>
      <div
        className={`h-full rounded-full bg-gradient-to-r from-[${colorFrom}] to-[${colorTo}]`}
        style={{ width: `${value}%` }}
      />
    </div>
  );

  // Componente de Insignia de Nivel
  const LevelBadge = ({ level }: { level: number }) => (
    <motion.div 
      whileHover={{ scale: 1.1 }}
      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFC107] to-[#FF9800] flex items-center justify-center text-xs font-bold shadow-md"
    >
      {level}
    </motion.div>
  );

  // Componente de Botón de Wallet
  const WalletConnectButton = ({ address, className = '' }: { address?: string; className?: string }) => (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${className}`}
    >
      <FaWallet className="text-[#A66BFF]" />
      {address ? truncateAddress(address) : 'Conectar Wallet'}
    </motion.button>
  );

  // Componente de Visualización de Trofeos
  const TrophyDisplay = ({ rank }: { rank: number }) => {
    const trophyColor = () => {
      if (rank === 1) return 'text-yellow-400';
      if (rank === 2) return 'text-gray-300';
      if (rank === 3) return 'text-amber-600';
      return 'text-gray-600';
    };

    return (
      <div className="flex gap-1">
        {[1, 2, 3].map((pos) => (
          <FaMedal 
            key={pos} 
            className={`w-6 h-6 ${trophyColor} ${rank === pos ? 'animate-pulse' : ''}`} 
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B1437] to-[#1E1E3F] py-10 px-4 md:px-10">
        <SkeletonGroup>
          <div className="max-w-6xl mx-auto">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <Skeleton variant="circular" className="w-32 h-32" />
              <div className="flex-1 w-full space-y-4">
                <Skeleton variant="text" className="h-8 w-1/2 mb-2" />
                <Skeleton variant="text" className="h-4 w-1/3 mb-2" />
                <div className="flex gap-2">
                  <Skeleton variant="rectangular" className="h-6 w-24" />
                  <Skeleton variant="rectangular" className="h-6 w-24" />
                  <Skeleton variant="rectangular" className="h-6 w-32" />
                </div>
              </div>
              <Skeleton variant="circular" className="w-10 h-10" />
            </div>
            {/* Main content skeleton: 3 columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="space-y-6">
                <CardSkeleton />
                <CardSkeleton />
              </div>
              <div className="space-y-6">
                <CardSkeleton />
                <CardSkeleton />
              </div>
              <div className="space-y-6">
                <CardSkeleton />
                <CardSkeleton />
              </div>
            </div>
          </div>
        </SkeletonGroup>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4 md:px-10 text-white">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header with background */}
          <motion.div 
            className="relative rounded-t-3xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#4318FF]/30 to-[#A66BFF]/30 z-0" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] bg-cover opacity-10 z-0" />
            
            <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-[#4318FF] to-[#A66BFF] flex items-center justify-center text-4xl font-bold shadow-lg"
              >
                {profile?.username?.[0]?.toUpperCase() || 'U'}
                <div className="absolute -bottom-2 -right-2">
                  <LevelBadge level={profile?.level || 1} />
                </div>
              </motion.div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#A66BFF]">
                    {profile?.username}
                  </h1>
                  {profile?.rank === 1 && (
                    <FaCrown className="text-yellow-400 w-6 h-6 animate-pulse" />
                  )}
                </div>
                
                <p className="text-sm text-gray-300 mt-1">{profile?.email}</p>
                
                <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                  <span className="bg-[#4318FF]/20 text-[#A66BFF] text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <IoMdRocket /> Nivel {profile?.level}
                  </span>
                  <span className="bg-white/10 text-white/90 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <FaFlagCheckered /> {profile?.rank}º en el ranking
                  </span>
                  <WalletConnectButton 
                    address={walletInfo?.wallet?.address} 
                    className="text-xs bg-[#1B254B] hover:bg-[#2A3A6B]"
                  />
                </div>
              </div>
              
              <TrophyDisplay rank={profile?.rank || 0} />
            </div>
          </motion.div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left column */}
            <div className="space-y-6">
              {/* Wallet card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-[#1B254B]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#2A3A6B] shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-xl flex items-center gap-3">
                    <div className="p-2 bg-[#4318FF]/20 rounded-lg">
                      <FaWallet className="text-[#A66BFF]" />
                    </div>
                    Wallet
                  </h3>
                  <div className="flex items-center gap-1 text-sm bg-[#4318FF]/30 px-2 py-1 rounded-full">
                    <FaCoins className="text-yellow-400" />
                    <span>RCT</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Balance total</p>
                    <p className="text-2xl font-bold">${walletInfo?.usdBalance}</p>
                  </div>
                  
                  <div className="bg-[#0B1437]/50 p-3 rounded-xl border border-[#2A3A6B]">
                    <p className="text-sm text-gray-400 mb-1">Balance en RCT</p>
                    <div className="flex items-end justify-between">
                      <p className="text-xl font-bold">{formatNumber(walletInfo?.wallet?.balance || 0, 3)} RCT</p>
                      <div className="flex gap-1">
                        <button className="p-1 text-[#A66BFF] hover:text-white">
                          <FaQrcode />
                        </button>
                        <button className="p-1 text-[#A66BFF] hover:text-white">
                          <FaExchangeAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-[#4318FF] to-[#6A3AFF] px-4 py-2 rounded-lg text-sm font-medium hover:shadow-[0_0_15px_-3px_rgba(106,58,255,0.5)]"
                    >
                      Enviar
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-[#2A3A6B] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3A4A8B]"
                    >
                      Recibir
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              
              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#1B254B]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#2A3A6B] shadow-lg"
              >
                <h3 className="font-semibold text-xl flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#FFC107]/20 rounded-lg">
                    <FaMedal className="text-[#FFC107]" />
                  </div>
                  Logros
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#6A3AFF]/20 rounded-lg">
                      <FaTrophy className="text-[#A66BFF]" />
                    </div>
                    <div>
                      <p className="font-medium">Primera victoria</p>
                      <p className="text-xs text-gray-400">Completa tu primera carrera</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-8 h-8 rounded-full bg-[#2A3A6B] flex items-center justify-center">
                        <span className="text-xs">3/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 opacity-50">
                    <div className="p-2 bg-[#6A3AFF]/20 rounded-lg">
                      <GiRaceCar className="text-[#A66BFF]" />
                    </div>
                    <div>
                      <p className="font-medium">1000 km</p>
                      <p className="text-xs text-gray-400">Conduce 1000 km en total</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-8 h-8 rounded-full bg-[#2A3A6B] flex items-center justify-center">
                        <span className="text-xs">0/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 opacity-50">
                    <div className="p-2 bg-[#6A3AFF]/20 rounded-lg">
                      <GiCarWheel className="text-[#A66BFF]" />
                    </div>
                    <div>
                      <p className="font-medium">Derrape maestro</p>
                      <p className="text-xs text-gray-400">Realiza 50 derrapes perfectos</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-8 h-8 rounded-full bg-[#2A3A6B] flex items-center justify-center">
                        <span className="text-xs">0/5</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button className="mt-4 text-sm text-[#A66BFF] hover:text-white flex items-center gap-1">
                  Ver todos los logros <span>→</span>
                </button>
              </motion.div>
            </div>
            
            {/* Middle column */}
            <div className="space-y-6">
              {/* Progress */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-[#1B254B]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#2A3A6B] shadow-lg"
              >
                <h3 className="font-semibold text-xl flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#00C853]/20 rounded-lg">
                    <FaChartLine className="text-[#00C853]" />
                  </div>
                  Progreso
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Nivel {profile?.level}</span>
                      <span className="font-medium">
                        {profile?.experience?.current || 0} / {profile?.experience?.total || 1000} XP
                      </span>
                    </div>
                    <ProgressBar 
                      value={(profile?.experience?.current || 0) / (profile?.experience?.total || 1000) * 100} 
                      colorFrom="#4318FF" 
                      colorTo="#A66BFF" 
                      height={8}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-[#0B1437]/50 p-3 rounded-xl border border-[#2A3A6B]">
                      <p className="text-sm text-gray-400">Victorias</p>
                      <p className="text-xl font-bold text-[#A66BFF]">{formatNumber(userStats?.wins || 0, 2)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[#1B254B]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#2A3A6B] shadow-lg"
              >
                <h3 className="font-semibold text-xl flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#FF5722]/20 rounded-lg">
                    <FaCar className="text-[#FF5722]" />
                  </div>
                  Actividad reciente
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-[#0B1437]/30 rounded-lg hover:bg-[#0B1437]/50 transition-colors">
                    <div className="p-2 bg-[#6A3AFF]/20 rounded-lg">
                      <FaTrophy className="text-[#A66BFF]" />
                    </div>
                    <div>
                      <p className="font-medium">Victoria en carrera</p>
                      <p className="text-xs text-gray-400">Hace 2 horas</p>
                    </div>
                    <div className="ml-auto text-[#A66BFF] font-bold">+50 XP</div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-[#0B1437]/30 rounded-lg hover:bg-[#0B1437]/50 transition-colors">
                    <div className="p-2 bg-[#6A3AFF]/20 rounded-lg">
                      <FaCoins className="text-[#FFC107]" />
                    </div>
                    <div>
                      <p className="font-medium">Recompensa diaria</p>
                      <p className="text-xs text-gray-400">Ayer</p>
                    </div>
                    <div className="ml-auto text-[#FFC107] font-bold">+10 RCT</div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-[#0B1437]/30 rounded-lg hover:bg-[#0B1437]/50 transition-colors">
                    <div className="p-2 bg-[#6A3AFF]/20 rounded-lg">
                      <FaChartLine className="text-[#00C853]" />
                    </div>
                    <div>
                      <p className="font-medium">Nivel alcanzado</p>
                      <p className="text-xs text-gray-400">Ayer</p>
                    </div>
                    <div className="ml-auto text-[#00C853] font-bold">Nivel {profile?.level || 1}</div>
                  </div>
                </div>
                
                <button className="mt-4 text-sm text-[#A66BFF] hover:text-white flex items-center gap-1">
                  Ver historial completo <span>→</span>
                </button>
              </motion.div>
            </div>
            
            {/* Right column */}
            <div className="space-y-6">
              {/* Stats */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-[#1B254B]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#2A3A6B] shadow-lg"
              >
                <h3 className="font-semibold text-xl flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#FF4081]/20 rounded-lg">
                    <GiRaceCar className="text-[#FF4081]" />
                  </div>
                  Estadísticas
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-[#0B1437]/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FaClock className="text-blue-300" />
                      <span>Mejor vuelta</span>
                    </div>
                    <span className="font-mono font-bold">{userStats?.bestLapTime || '--:--'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-[#0B1437]/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FaRoad className="text-green-400" />
                      <span>Distancia total</span>
                    </div>
                    <span className="font-mono font-bold">{userStats?.totalDistance || 0} km</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-[#0B1437]/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <GiSpeedometer className="text-purple-400" />
                      <span>Velocidad máxima</span>
                    </div>
                    <span className="font-mono font-bold">N/A</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-[#0B1437]/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FaTrophy className="text-yellow-400" />
                      <span>Podios</span>
                    </div>
                    <span className="font-mono font-bold">N/A</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-[#0B1437]/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FaExchangeAlt className="text-red-400" />
                      <span>Overtakes</span>
                    </div>
                    <span className="font-mono font-bold">N/A</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Upgrades */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-[#1B254B]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#2A3A6B] shadow-lg"
              >
                <h3 className="font-semibold text-xl flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#00BCD4]/20 rounded-lg">
                    <IoMdRocket className="text-[#00BCD4]" />
                  </div>
                  Mejoras disponibles
                </h3>
                
                <div className="space-y-4">
                  <div className="p-3 bg-gradient-to-r from-[#0B1437]/50 to-[#1B254B]/50 rounded-lg border border-[#2A3A6B]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#6A3AFF]/20 rounded-lg">
                        <GiCarWheel className="text-[#A66BFF]" />
                      </div>
                      <div>
                        <p className="font-medium">Motor turbo</p>
                        <p className="text-xs text-gray-400">Aumenta tu velocidad máxima</p>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-sm font-bold text-[#A66BFF]">500 RCT</span>
                      <button className="text-xs bg-[#6A3AFF] hover:bg-[#7A4AFF] px-3 py-1 rounded-full">
                        Comprar
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gradient-to-r from-[#0B1437]/50 to-[#1B254B]/50 rounded-lg border border-[#2A3A6B] opacity-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#6A3AFF]/20 rounded-lg">
                        <GiSpeedometer className="text-[#A66BFF]" />
                      </div>
                      <div>
                        <p className="font-medium">Neumáticos de carrera</p>
                        <p className="text-xs text-gray-400">Mejor tracción en curvas</p>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-sm font-bold text-[#A66BFF]">750 RCT</span>
                      <button className="text-xs bg-[#6A3AFF] hover:bg-[#7A4AFF] px-3 py-1 rounded-full" disabled>
                        Nivel 3 requerido
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Profile;