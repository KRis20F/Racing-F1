import React, { useEffect, useState } from 'react';

// TODO: Implementar diseño de tabla de clasificación
// - Añadir animaciones de cambios de posición
// - Implementar filtros y búsqueda
// - Añadir estadísticas detalladas
// - Incluir gráficos de progreso

interface LeaderboardEntry {
  rank: number;
  username: string;
  wins: number;
  totalEarnings: number;
  rating: number;
}

const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [filter, setFilter] = useState<'all' | 'weekly' | 'monthly'>('all');

  useEffect(() => {
    fetchLeaderboard();
  }, [filter]);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`/api/leaderboard?filter=${filter}`);
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h2>Leaderboard</h2>
        <div className="filter-buttons">
          {/* TODO: Implementar botones de filtro con estilos */}
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All Time
          </button>
          <button 
            className={filter === 'weekly' ? 'active' : ''}
            onClick={() => setFilter('weekly')}
          >
            Weekly
          </button>
          <button 
            className={filter === 'monthly' ? 'active' : ''}
            onClick={() => setFilter('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="leaderboard-table">
        {/* TODO: Implementar tabla con estilos */}
        {entries.map(entry => (
          <div key={entry.rank} className="leaderboard-row">
            <span className="rank">{entry.rank}</span>
            <span className="username">{entry.username}</span>
            <span className="wins">{entry.wins}</span>
            <span className="earnings">{entry.totalEarnings} COINS</span>
            <span className="rating">{entry.rating}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard; 