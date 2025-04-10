import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";

// TODO: Implementar diseño de pista de carreras
// - Añadir fondo con perspectiva
// - Implementar animaciones de coches
// - Añadir efectos de partículas para drift
// - Incluir HUD con información de carrera

interface RaceTrackProps {
  isBetting: boolean;
  betAmount?: number;
}

const RaceTrack: React.FC<RaceTrackProps> = ({ isBetting, betAmount }) => {
  const { publicKey } = useWallet();
  const [raceStatus, setRaceStatus] = useState<
    "waiting" | "racing" | "finished"
  >("waiting");

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Contenedor principal para Unity (placeholder por ahora) */}
      <div className="w-full h-[500px] bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
        <p className="text-white text-xl">Unity Game Loading...</p>
      </div>

      {/* HUD de la carrera */}
      <div className="bg-gray-800 p-4 rounded-lg text-white">
        <div className="flex justify-between items-center">
          {/* Estado de la carrera */}
          <div className="text-lg font-bold">
            Status: {raceStatus.toUpperCase()}
          </div>

          {/* Información de apuesta */}
          {isBetting && (
            <div className="bg-yellow-600 px-4 py-2 rounded">
              Bet Amount: {betAmount} COINS
            </div>
          )}
        </div>
      </div>

      {/* Controles */}
      <div className="flex justify-center gap-4">
        {raceStatus === "waiting" && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
            onClick={() => setRaceStatus("racing")}
          >
            Start Race
          </button>
        )}
        {raceStatus === "finished" && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
            onClick={() => setRaceStatus("waiting")}
          >
            Race Again
          </button>
        )}
      </div>
    </div>
  );
};

export default RaceTrack;
