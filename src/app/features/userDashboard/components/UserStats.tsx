interface UserStatsProps {
  stats?: {
    bestLapTime: number | null;
    totalDistance: number;
    favoriteTrack: string | null;
    winRate: number;
    totalRaces: number;
    wins: number;
    losses: number;
  };
}

export const UserStats = ({ stats }: UserStatsProps) => {
  // Formatear el tiempo de vuelta (asumiendo que está en milisegundos)
  const formatLapTime = (ms: number | null) => {
    if (!ms) return '--:--:---';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
  };

  // Formatear la distancia en km
  const formatDistance = (meters: number) => {
    return `${(meters / 1000).toFixed(1)} km`;
  };

  return (
    <div className="rounded-2xl bg-[#111C44] p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Racing Stats</h3>
      <div className="space-y-4">
        {/* Best Lap Time */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Best Lap</span>
            <span className="text-white">{formatLapTime(stats?.bestLapTime)}</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div className="h-full w-[85%] bg-indigo-600 rounded-full"></div>
          </div>
        </div>

        {/* Total Distance */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Total Distance</span>
            <span className="text-white">{formatDistance(stats?.totalDistance || 0)}</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div className="h-full w-[65%] bg-purple-600 rounded-full"></div>
          </div>
        </div>

        {/* Race Stats */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Total Races</span>
            <span className="text-white">{stats?.totalRaces || 0}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Wins</span>
            <span className="text-green-400">{stats?.wins || 0}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Losses</span>
            <span className="text-red-400">{stats?.losses || 0}</span>
          </div>
        </div>

        {/* Win Rate */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Win Rate</span>
            <span className="text-white">{stats?.winRate?.toFixed(1) || 0}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div 
              className="h-full bg-green-600 rounded-full"
              style={{ width: `${stats?.winRate || 0}%` }}
            ></div>
          </div>
        </div>

        {/* Favorite Track */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Favorite Track</span>
            <span className="text-white">{stats?.favoriteTrack || 'None'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 