import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { api } from '../../../api/api.config';
import { useAuthContext } from '../../../providers/hooks/useAuthContext';
// import { SolanaService } from '../../../api/config/solana';

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

interface BettingPanelProps {
  onBetSubmit: (betData: { userId: number; rivalId: number; cantidad: number }) => Promise<void>;
  isLoading: boolean;
  isBetting: boolean;
}

const BettingPanel: React.FC<BettingPanelProps> = ({ onBetSubmit, isLoading, isBetting }) => {
  const { publicKey } = useWallet();
  const { userData } = useAuthContext();
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAvailablePlayers();
  }, []);

  const fetchAvailablePlayers = async () => {
    try {
      setError(null);
      const response = await api.get('/api/game/available-players');
      setAvailablePlayers(response.data);
    } catch (error) {
      console.error('Error fetching players:', error);
      setError('Error loading available players. Please try again later.');
      setAvailablePlayers([]);
    }
  };

  const handleBetSubmit = async () => {
    if (!publicKey || !selectedPlayer || !userData?.profile) return;

    try {
      await onBetSubmit({
        userId: userData.profile.id,
        rivalId: selectedPlayer,
        cantidad: betAmount
      });
      
      // Reset form after successful bet
      setBetAmount(0);
      setSelectedPlayer(null);
    } catch (error) {
      console.error('Error placing bet:', error);
      setError('Error placing bet. Please try again.');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">Place Your Bet</h3>
      
      <div className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
            {error}
          </div>
        )}

        {/* Players List */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Select Player</label>
          <div className="grid gap-2">
            {availablePlayers.map(player => (
              <button
                key={player.id}
                onClick={() => setSelectedPlayer(player.id)}
                className={`p-3 rounded-lg transition-all ${
                  selectedPlayer === player.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                disabled={isLoading || isBetting}
              >
                <div className="flex justify-between items-center">
                  <span>{player.username}</span>
                  <span className="text-sm opacity-75">Rating: {player.rating}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bet Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Bet Amount</label>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter amount"
            disabled={isLoading || isBetting}
          />
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleBetSubmit}
          disabled={!selectedPlayer || betAmount <= 0 || isLoading || isBetting}
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            isLoading || isBetting
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white`}
        >
          {isLoading ? 'Processing...' : 'Place Bet'}
        </button>
      </div>
    </div>
  );
};

export default BettingPanel; 