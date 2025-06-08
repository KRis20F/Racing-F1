import { useUserData } from '../../../hooks/useUserData';

export const Profile = () => {
  const { profile, game, finances, isLoading } = useUserData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B1437]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#4318FF]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1437] p-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-white/80 mb-4">
        <span>Páginas</span>
        <span>/</span>
        <span>Perfil</span>
      </div>

      {/* Header with glowing effect */}
      <div className="relative mb-12">
        <h1 className="text-4xl font-bold text-white relative z-10">
          Driver Profile
          <span className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-[#4318FF] to-purple-600"></span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info Card */}
        <div className="bg-[#111C44] rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-[#4318FF]/20">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#4318FF] to-purple-600 p-1 mb-6">
              <img
                src={profile?.avatar || 'https://i.imgur.com/8Km9tLL.png'}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-lg bg-[#4318FF]/10 flex items-center justify-center backdrop-blur-sm">
              <span className="text-[#4318FF] font-bold">{profile?.level || 1}</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">{profile?.username || 'Driver'}</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Rank</span>
              <span className="text-white font-semibold">{profile?.rank || 'Rookie'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Experience</span>
              <span className="text-white font-semibold">{profile?.experience || 0} XP</span>
            </div>
            <div className="w-full bg-[#1B254B] rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-[#4318FF] to-purple-600 h-2 rounded-full" 
                style={{ width: `${((profile?.experience || 0) % 1000) / 10}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Racing Stats Card */}
        <div className="bg-[#111C44] rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-[#4318FF]/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#4318FF]/10 flex items-center justify-center backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4318FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Racing Stats</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-[#1B254B] rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Best Lap Time</p>
              <p className="text-2xl font-bold text-white">{game?.bestLapTime || '--:--'}</p>
            </div>
            <div className="bg-[#1B254B] rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Total Distance</p>
              <p className="text-2xl font-bold text-white">{game?.totalDistance || 0} <span className="text-sm text-gray-400">km</span></p>
            </div>
          </div>
        </div>

        {/* Wallet Card */}
        <div className="bg-[#111C44] rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-[#4318FF]/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#4318FF]/10 flex items-center justify-center backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4318FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Wallet</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-[#1B254B] rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Balance USD</p>
              <p className="text-2xl font-bold text-white">${finances?.balance || '0.00'}</p>
            </div>
            <div className="bg-[#1B254B] rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">RCT Tokens</p>
              <p className="text-2xl font-bold text-white">{finances?.tokenBalance || '0'} <span className="text-sm text-gray-400">RCT</span></p>
            </div>
            <div className="bg-[#1B254B] rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Wallet Status</p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${profile?.publicKey ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <p className="text-white">{profile?.publicKey ? 'Connected' : 'Not Connected'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 