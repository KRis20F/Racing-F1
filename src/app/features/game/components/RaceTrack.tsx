import { useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react';

// TODO: Implementar diseño de pista de carreras
// - Añadir fondo con perspectiva
// - Implementar animaciones de coches
// - Añadir efectos de partículas para drift
// - Incluir HUD con información de carrera

interface RaceTrackProps {
  trackId: number;
  isBetting: boolean;
  betAmount?: number;
}

const RaceTrack: React.FC<RaceTrackProps> = ({ trackId, isBetting, betAmount }) => {
  const { publicKey } = useWallet();
  const [raceStatus, setRaceStatus] = useState<'waiting' | 'racing' | 'finished'>('waiting');
  const [time, setTime] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);

  // TODO: Implementar lógica de carrera
  useEffect(() => {
    if (raceStatus === 'racing') {
      const timer = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [raceStatus]);

  const startRace = async () => {
    if (!publicKey) return;

    try {
      // TODO: Implementar lógica de inicio de carrera
      setRaceStatus('racing');
    } catch (error) {
      console.error('Error starting race:', error);
    }
  };

  return (
    <div className="race-track">
      {/* TODO: Añadir elementos visuales de la pista */}
      <div className="track-container">
        <div className="player-car">
          {/* TODO: Implementar sprite del coche */}
        </div>
      </div>

      <div className="race-hud">
        <div className="race-info">
          <span>Time: {time}s</span>
          <span>Position: {position}</span>
        </div>

        {isBetting && (
          <div className="bet-info">
            <span>Bet Amount: {betAmount} COINS</span>
          </div>
        )}

        {raceStatus === 'waiting' && (
          <button onClick={startRace}>
            Start Race
          </button>
        )}
      </div>
    </div>
  );
};

export default RaceTrack; 