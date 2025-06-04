import { useQuery } from '@tanstack/react-query';
import { userEndpoints } from '../../../api/endpoints/user.endpoints';
import { useAuthContext } from '../../../providers/AuthProvider';
import type { UserData } from '../../../types/api/auth.types';

const Profile = () => {
  const { user } = useAuthContext();
  const { data: userData, isLoading } = useQuery<UserData>({
    queryKey: ['userData'],
    queryFn: userEndpoints.getUserData,
    enabled: !!user
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1B1B3A] text-white p-6">
        <div className="animate-pulse">
          <div className="h-32 bg-[#111C44] rounded-[20px] mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-[#111C44] rounded-[20px]"></div>
            <div className="h-64 bg-[#111C44] rounded-[20px]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1B1B3A] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl mb-6">Perfil de Usuario</h1>

        {/* Información Principal */}
        <div className="bg-[#111C44] rounded-[20px] p-8">
          <div className="flex items-start gap-8">
            <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center">
              {userData?.profile?.avatar ? (
                <img 
                  src={userData.profile.avatar} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-4xl">{userData?.profile?.username?.[0]?.toUpperCase()}</span>
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{userData?.profile?.username}</h2>
              <p className="text-gray-400">{userData?.profile?.email}</p>
              <div className="mt-4 flex gap-4">
                <div>
                  <p className="text-sm text-gray-400">Nivel</p>
                  <p className="text-xl font-bold">{userData?.profile?.level}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Experiencia</p>
                  <p className="text-xl font-bold">{userData?.game?.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Rango</p>
                  <p className="text-xl font-bold">{userData?.game?.rank}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas de Juego y Finanzas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Estadísticas de Juego */}
          <div className="bg-[#111C44] rounded-[20px] p-8">
            <h3 className="text-xl font-bold mb-6">Estadísticas de Carreras</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Carreras Totales</span>
                <span className="font-bold">{userData?.game?.totalRaces}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Victorias</span>
                <span className="font-bold text-green-500">{userData?.game?.wins}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Derrotas</span>
                <span className="font-bold text-red-500">{userData?.game?.losses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Mejor Tiempo</span>
                <span className="font-bold">{userData?.game?.stats?.bestLapTime || '--:--'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Distancia Total</span>
                <span className="font-bold">{userData?.game?.stats?.totalDistance || 0}km</span>
              </div>
            </div>
          </div>

          {/* Información Financiera */}
          <div className="bg-[#111C44] rounded-[20px] p-8">
            <h3 className="text-xl font-bold mb-6">Información Financiera</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Balance RCT</span>
                <span className="font-bold">{userData?.finances?.tokenBalance} RCT</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Balance USD</span>
                <span className="font-bold">${userData?.finances?.usdBalance}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Wallet</span>
                <span className="font-mono text-sm">
                  {userData?.finances?.wallet ? userData.finances.wallet.address : 'No Creada / Conectada'}
                </span>
              </div>
              <div className="mt-6">
                <h4 className="text-sm text-gray-400 mb-2">Límites de Transacción</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Diario</span>
                    <span className="text-sm">${userData?.finances?.transaction_limits?.daily_limit}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mensual</span>
                    <span className="text-sm">${userData?.finances?.transaction_limits?.monthly_limit}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
