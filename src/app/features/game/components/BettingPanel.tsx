import { useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react';
import { SolanaService } from '../../config/solana';

// TODO: Implementar diseño de panel de apuestas
// - Añadir lista de jugadores disponibles
// - Mostrar historial de apuestas
// - Implementar sistema de notificaciones
// - Añadir animaciones de transacciones

interface Player {
  id: number;
  username: string;
  rating: number;
}

const BettingPanel: React.FC = () => {
  const { publicKey } = useWallet();
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState<number>(0);

  useEffect(() => {
    fetchAvailablePlayers();
  }, []);

  const fetchAvailablePlayers = async () => {
    try {
      const response = await fetch('/api/available-players');
      const data = await response.json();
      setAvailablePlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  const placeBet = async () => {
    if (!publicKey || !selectedPlayer) return;

    try {
      // TODO: Implementar lógica de apuesta
      const transaction = await SolanaService.createBet(
        publicKey.toString(),
        selectedPlayer,
        betAmount
      );

      console.log('Bet placed:', transaction);
    } catch (error) {
      console.error('Error placing bet:', error);
    }
  };

  return (
    <div className="betting-panel">
      <div className="players-list">
        <h3>Available Players</h3>
        {/* TODO: Implementar lista de jugadores con estilos */}
        {availablePlayers.map(player => (
          <div 
            key={player.id} 
            className={`player-item ${selectedPlayer === player.id ? 'selected' : ''}`}
            onClick={() => setSelectedPlayer(player.id)}
          >
            <span>{player.username}</span>
            <span>Rating: {player.rating}</span>
          </div>
        ))}
      </div>

      <div className="bet-form">
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          placeholder="Bet Amount"
        />

        <button 
          onClick={placeBet}
          disabled={!selectedPlayer || betAmount <= 0}
        >
          Place Bet
        </button>
      </div>
    </div>
  );
};

export default BettingPanel; 