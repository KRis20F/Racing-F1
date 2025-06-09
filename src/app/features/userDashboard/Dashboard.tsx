import { Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Area, AreaChart } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { dashboardEndpoints } from '../../api/endpoints/dashboard.endpoints';
import type { UserStats, GlobalStats, TokenHistory } from '../../types/api/dashboard.types';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { WalletDialog } from '../../UI/WalletDialog';
import { DashboardSkeleton } from '../../UI/Skeleton/DashboardSkeletons';
import { useUserData } from '../../hooks/useUserData';
import Sidebar from '../../UI/Sidebar';
import { StatCard } from './components/StatCard';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { CarModel } from '../../UI/CarModel';
import { BASE_PATH } from '../../providers/AuthContext';

export const Dashboard = () => {
  const location = useLocation();
  const isDashboardRoot = location.pathname === BASE_PATH || location.pathname === `${BASE_PATH}/dashboard`;
  const [showWalletDialog, setShowWalletDialog] = useState(false);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);

  const { data: userStats, isLoading: isLoadingStats } = useQuery<UserStats>({
    queryKey: ['userStats'],
    queryFn: dashboardEndpoints.getUserStats
  });

  const { profile, game, finances, isLoading: isLoadingProfile } = useUserData();

  const { data: globalStats, isLoading: isLoadingGlobal } = useQuery<GlobalStats>({
    queryKey: ['globalStats'],
    queryFn: dashboardEndpoints.getGlobalStats
  });

  const { data: tokenHistory, isLoading: isLoadingHistory } = useQuery<TokenHistory[]>({
    queryKey: ['tokenHistory'],
    queryFn: dashboardEndpoints.getTokenHistory
  });

  const isLoading = isLoadingStats || isLoadingProfile || isLoadingGlobal || isLoadingHistory;

  // Preparar datos para los gráficos con manejo seguro de undefined
  const monthlyData = tokenHistory || [];
  const weeklyData = [{
    name: 'Total Races',
    value: globalStats?.totalRaces || 0
  }];
  const hasData = tokenHistory && tokenHistory.length > 0;

  // Calcular el win rate
  const totalRaces = userStats?.totalRaces || 0;
  const wins = userStats?.wins || 0;
  const winRate = totalRaces > 0 ? ((wins / totalRaces) * 100).toFixed(1) : "0.0";

  // Obtener el balance de RCT con manejo seguro
  const rctBalance = finances?.tokenBalance || '0.00';
  const publicKey = profile?.publicKey;
  const walletStatus = publicKey ? `${rctBalance} RCT` : 'No Wallet';

  // Show welcome dialog on first visit
  useEffect(() => {
    const dialogDismissed = localStorage.getItem('welcomeDialogDismissed');
    
    if (!isLoadingProfile && !dialogDismissed && isDashboardRoot) {
      setShowWalletDialog(true);
    }
  }, [isLoadingProfile, isDashboardRoot]);

  const handleCloseDialog = () => {
    setShowWalletDialog(false);
    localStorage.setItem('welcomeDialogDismissed', 'true');
  };

  const renderDashboardContent = () => {
    if (isLoading) {
      return <DashboardSkeleton />;
    }

  return (
      <>
        <WalletDialog 
          isOpen={showWalletDialog} 
          onClose={handleCloseDialog}
        />

          {/* Top Navigation Bar */}
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-white/80">
            <span>Páginas</span>
              <span>/</span>
            <span>Panel Principal</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                placeholder="Buscar..."
                className="bg-[#111C44] border border-gray-700 rounded-full py-1.5 px-4 text-white w-64 pl-9 text-sm"
                />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <StatCard
            title="Carreras Totales"
            value={userStats?.totalRaces?.toString() || "0"}
              change="+12%"
              icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M3 3.75A1.5 1.5 0 014.5 2.25h15A1.5 1.5 0 0121 3.75v15a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 18.75v-15zM4.5 3.75a.75.75 0 00-.75.75V7.5h4.5v-3.75h-3.75zm0 4.5v3.75h3.75v-3.75h-3.75zm5.25 0v3.75h3.75v-3.75h-3.75zm5.25 0v3.75h3.75v-3.75h-3.75zm3.75 5.25h-3.75v3.75h3.75v-3.75zm-5.25 0h-3.75v3.75h3.75v-3.75zm-5.25 0h-3.75v3.75h3.75v-3.75z" clipRule="evenodd" />
                </svg>
              }
            />
            <StatCard
            title="Porcentaje de Victorias"
            value={`${winRate}%`}
              change="+5%"
              icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
                </svg>
              }
            />
            <StatCard
            title="Balance RCT"
            value={walletStatus}
            change={"+8%"}
              icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                  <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" />
                </svg>
              }
            />
            <StatCard
            title="Nivel"
            value={profile?.level?.toString() || "0"}
              change="+2"
              icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              }
            />
          </div>

          {/* Welcome Card with Racing Stats */}
        <div className="rounded-[20px] bg-[#111C44] p-4 mb-4 relative overflow-hidden">
            <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=2070&auto=format&fit=crop')`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#111C44] via-[#111C44]/80 to-transparent"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div>
                <p className="text-gray-400 mb-1">Bienvenido de nuevo</p>
                <h1 className="text-3xl font-bold text-white mb-2">{profile?.username || 'Piloto'}</h1>
                <p className="text-gray-400">Rango: {profile?.rank || 'Novato'}</p>
                <div className="text-gray-400">
                  <p>Experiencia: {profile?.experience || 0} XP</p>
                  <p className="text-sm">Siguiente nivel: {((profile?.level || 0) + 1) * 1000 - (profile?.experience || 0)} XP restantes</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-400">Mejor Tiempo por Vuelta</p>
                <p className="text-2xl font-bold text-white">{game?.bestLapTime || '--:--'}</p>
                <p className="text-gray-400 mt-2">Distancia Total</p>
                <p className="text-xl font-bold text-white">{game?.totalDistance || 0}km</p>
              </div>
              </div>
            </div>
          </div>

        {/* Racing Performance & Car Collection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Racing Performance */}
            <div className="bg-[#111C44] rounded-[20px] p-6">
              <h2 className="text-xl font-bold text-white mb-4">Rendimiento en Carreras</h2>
              <p className="text-gray-400 text-sm mb-4">Porcentaje de victorias y estadísticas</p>
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#1B254B"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#4318FF"
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * (parseInt(winRate) || 0)) / 100}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-2xl font-bold text-white">{winRate}%</span>
                      <p className="text-xs text-gray-400">Victorias</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-[#1B254B] rounded-xl p-3">
                  <p className="text-gray-400 text-sm">Victorias</p>
                  <p className="text-xl font-bold text-green-500">{userStats?.wins || 0}</p>
                </div>
                <div className="bg-[#1B254B] rounded-xl p-3">
                  <p className="text-gray-400 text-sm">Derrotas</p>
                  <p className="text-xl font-bold text-red-500">{userStats?.losses || 0}</p>
                </div>
              </div>
            </div>

            {/* Car Collection */}
            <div className="bg-[#111C44] rounded-[20px] p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Colección de Autos</h2>
                  <p className="text-gray-400 text-sm">Tus vehículos de carreras</p>
                </div>
                <Link to="/garage" className="bg-[#4318FF] text-white px-4 py-2 rounded-lg hover:bg-[#3311CC] transition-colors">
                  Ver Todos
                </Link>
              </div>
              {profile?.cars && profile.cars.length > 0 ? (
                <div>
                  {/* Car Info */}
                  <div className="mb-2 flex justify-between items-center">
                    <div>
                      <h3 className="text-white text-lg font-semibold">{profile.cars[selectedCar || 0]?.name}</h3>
                      <p className="text-gray-400">{profile.cars[selectedCar || 0]?.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedCar(prev => (prev === 0 ? profile.cars.length - 1 : prev! - 1))}
                        className="p-2 rounded-full bg-[#1B254B] hover:bg-[#4318FF] transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => setSelectedCar(prev => (prev === profile.cars.length - 1 ? 0 : prev! + 1))}
                        className="p-2 rounded-full bg-[#1B254B] hover:bg-[#4318FF] transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* 3D Model Viewer */}
                  <div className="h-[280px] bg-[#1B254B] rounded-xl overflow-hidden">
                    <ErrorBoundary
                      fallback={
                        <div className="flex items-center justify-center h-full text-red-500">
                          Error al cargar el modelo 3D
                        </div>
                      }
                    >
                      <Canvas
                        camera={{ position: [2.5, 1.5, 2.5], fov: 50 }}
                        gl={{ preserveDrawingBuffer: true, antialias: true }}
                        dpr={[1, 2]}
                      >
                        <color attach="background" args={['#1B254B']} />
                        <Suspense fallback={
                          <Html center>
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                          </Html>
                        }>
                          <group>
                            {profile.cars[selectedCar || 0]?.modelPath && (
                              <CarModel 
                                modelPath={profile.cars[selectedCar || 0].modelPath}
                                scale={2}
                                position={[0, -0.5, 0]}
                                rotation={[0, Math.PI / 3, 0]}
                              />
                            )}
                            <ambientLight intensity={1} />
                            <spotLight
                              position={[10, 10, 10]}
                              angle={0.15}
                              penumbra={1}
                              intensity={1.5}
                            />
                            <pointLight position={[-10, -10, -10]} intensity={0.8} />
                          </group>
                          <OrbitControls
                            enableZoom={false}
                            maxPolarAngle={Math.PI / 2}
                            minPolarAngle={Math.PI / 4}
                            autoRotate={true}
                            autoRotateSpeed={2}
                          />
                        </Suspense>
                      </Canvas>
                    </ErrorBoundary>
                  </div>

                  {/* Navigation Dots */}
                  <div className="flex justify-center gap-2 mt-2">
                    {profile.cars.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCar(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === selectedCar ? 'bg-[#4318FF]' : 'bg-[#1B254B]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No tienes autos en tu colección</p>
                  <Link 
                    to="/shop" 
                    className="mt-4 inline-block bg-[#4318FF] text-white px-6 py-2 rounded-lg hover:bg-[#3311CC] transition-colors"
                  >
                    Ir a la tienda
                  </Link>
                </div>
              )}
            </div>
          </div>

        {/* Token Overview */}
        <div className="bg-[#111C44] rounded-[20px] p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-6">Resumen de Tokens</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1B254B] rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                  <p className="text-white">Precio del Token</p>
                    <p className="text-gray-400 text-sm">+2.4%</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#1B254B] rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                  <p className="text-white">Volumen 24h</p>
                    <p className="text-gray-400 text-sm">+1.2M RCT</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#1B254B] rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <div>
                  <p className="text-white">Cap. de Mercado</p>
                    <p className="text-gray-400 text-sm">25M RCT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Token Price History Chart */}
          <div className="bg-[#111C44] rounded-[20px] p-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white">Historial de Precios del Token</h2>
              <p className="text-green-500">Usuarios Totales: {globalStats?.totalUsers || 0}</p>
            </div>
            <div className="h-[250px] w-full">
              {hasData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4318FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4318FF" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00E396" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00E396" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#1B254B" 
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="name" 
                      stroke="#A3AED0"
                      tick={{ fill: '#A3AED0' }}
                    />
                    <YAxis 
                      stroke="#A3AED0"
                      tick={{ fill: '#A3AED0' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#111C44',
                        border: 'none',
                        borderRadius: '10px',
                        color: '#fff'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#4318FF"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                      name="Precio"
                    />
                    <Area
                      type="monotone"
                      dataKey="avg"
                      stroke="#00E396"
                      fillOpacity={1}
                      fill="url(#colorAvg)"
                      name="Promedio"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">No hay datos disponibles</p>
                </div>
              )}
            </div>
          </div>

          {/* Racing Overview Chart */}
          <div className="bg-[#111C44] rounded-[20px] p-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white">Resumen de Carreras</h2>
              <p className="text-green-500">Apuestas Totales: {globalStats?.totalBets || 0}</p>
              </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="#1B254B" 
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="name" 
                    stroke="#A3AED0"
                    tick={{ fill: '#A3AED0' }}
                  />
                  <YAxis 
                    stroke="#A3AED0"
                    tick={{ fill: '#A3AED0' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#111C44',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#fff'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#4318FF" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#0B1437]">
      <Sidebar />
      <div className="flex-1 pl-64">
        <div className="p-4">
          <div className="max-w-[1400px] mx-auto">
            {isDashboardRoot ? renderDashboardContent() : <Outlet />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;