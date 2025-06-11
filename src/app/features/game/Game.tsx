import BettingPanel from "./components/BettingPanel";
import Leaderboard from "./components/Leaderboard";
import { useState } from "react";
import { useRace } from "../../hooks/useRace";
import { toast } from "react-hot-toast";
import Navbar from "../../UI/Navbar";

interface BetData {
  userId: number;
  rivalId: number;
  cantidad: number;
}

const Game = () => {
  const [isBetting, setIsBetting] = useState(false);
  const { createBet, isCreatingBet } = useRace();

  const handleBetSubmit = async (betData: BetData) => {
    try {
      setIsBetting(true);
      await createBet(betData);
      toast.success('¡Apuesta realizada con éxito!');
    } catch (error) {
      console.error('Error al procesar la apuesta:', error);
      toast.error('Error al procesar la apuesta');
    } finally {
      setIsBetting(false);
    }
  };

  return (
    <Navbar>
      <div className="min-h-screen bg-[#0B1437]">
        {/* Header con título y stats */}
        <div className="w-full bg-gradient-to-b from-[#0B1437] to-[#1B254B] pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-600 mb-4">
                F1 Racing Challenge
              </h1>
              <p className="text-xl md:text-2xl text-indigo-200 font-medium">
                ¡Compite, apuesta y lidera la pista!
              </p>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="max-w-[2000px] mx-auto px-6 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Ventana de Juego Central */}
            <div className="col-span-12 xl:col-span-8">
              <div className="rounded-3xl overflow-hidden border-4 border-indigo-500/20 shadow-2xl bg-black/40">
                <iframe
                  src="https://itch.io/embed-upload/13934810?color=2D1B69"
                  allowFullScreen
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="w-full aspect-[16/9] min-h-[600px]"
                  title="Play RacingFi"
                ></iframe>
              </div>
            </div>

            {/* Panel Derecho - Apuestas */}
            <div className="col-span-12 xl:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Panel de Apuestas */}
                <div className="rounded-2xl bg-white/5 backdrop-blur-lg border border-fuchsia-500/20 shadow-xl p-6">
                  <h2 className="text-2xl font-bold text-fuchsia-200 mb-6">Apuesta Rápida</h2>
                  <BettingPanel
                    onBetSubmit={handleBetSubmit}
                    isLoading={isCreatingBet}
                    isBetting={isBetting}
                  />
                </div>

                {/* Leaderboard */}
                <div className="rounded-2xl bg-white/5 backdrop-blur-lg border border-indigo-500/20 shadow-xl p-6">
                  <h2 className="text-2xl font-bold text-indigo-200 mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                    </svg>
                    Leaderboard
                  </h2>
                  <Leaderboard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Game;
