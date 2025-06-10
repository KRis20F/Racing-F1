import BettingPanel from "./components/BettingPanel";
import Leaderboard from "./components/Leaderboard";
import { useEffect, useState } from "react";
import { useRace } from "../../hooks/useRace";
import { toast } from "react-hot-toast";
import type { BetRequest } from "../../api/endpoints/race.endpoints";
import Navbar from "../../UI/Navbar";
import { useMatchmaking } from '../../hooks/useMatchmaking';

interface SimpleBetData {
  playerId: number;
  amount: number;
}

const Game = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isBetting, setIsBetting] = useState(false);
  const matchmaking = useMatchmaking();
  const [rivalId, setRivalId] = useState<number | null>(null);
  const [playerNumber, setPlayerNumber] = useState<number | null>(null);

  const {
    createBet,
    isCreatingBet,
    createBetError,
    submitResultError
  } = useRace();

  useEffect(() => {
    if (matchmaking.data) {
      console.log('[FRONT] Matchmaking data:', matchmaking.data);
      if (matchmaking.data.status === 'matched') {
        setRivalId(matchmaking.data.rivalId ?? null);
        setPlayerNumber(matchmaking.data.player);
      } else if (matchmaking.data.status === 'waiting') {
        setPlayerNumber(matchmaking.data.player);
      }
    }
  }, [matchmaking.data]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle race-related errors
  useEffect(() => {
    if (createBetError) {
      toast.error(`Error al crear apuesta: ${createBetError.message}`);
    }
    if (submitResultError) {
      toast.error(`Error al enviar resultado: ${submitResultError.message}`);
    }
  }, [createBetError, submitResultError]);

  const handleBetSubmit = async (betData: SimpleBetData) => {
    try {
      setIsBetting(true);
      const fullBetData: BetRequest = {
        raceId: 1, // TODO: Get actual race ID
        amount: betData.amount.toString(),
        carId: 1, // TODO: Get selected car ID
        position: 1 // TODO: Get predicted position
      };
      await createBet(fullBetData);
      toast.success('¡Apuesta realizada con éxito!');
    } catch (error) {
      console.error('Error al procesar la apuesta:', error);
    } finally {
      setIsBetting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar >
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-indigo-900 flex flex-col items-center justify-start pt-36 pb-10 overflow-x-hidden">
        {/* HERO HEADER */}
        <div className="w-full flex flex-col items-center mb-10">
          <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-lg bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-600 bg-clip-text ">F1 Racing Challenge</h1>
          <p className="mt-4 text-xl md:text-2xl text-indigo-200 font-semibold">¡Compite, apuesta y lidera la pista!</p>
        </div>
        {/* DEBUG: Estado de matchmaking */}
        {process.env.NODE_ENV !== 'production' && (
          <pre className="text-xs text-white bg-black/50 p-2 rounded mt-2 max-w-xl overflow-x-auto">
            {JSON.stringify(matchmaking.data, null, 2)}
          </pre>
        )}
        {/* MATCHMAKING STATUS */}
        {matchmaking.isPending && (
          <div className="text-indigo-200 text-xl font-semibold mb-8">Buscando partida...</div>
        )}
        {playerNumber === 1 && !rivalId && (
          <div className="text-indigo-200 text-xl font-semibold mb-8">Esperando a otro jugador...</div>
        )}
        {/* GAME WINDOW Y PANELES SOLO SI HAY MATCH */}
        {rivalId && (
          <div className="relative w-full flex justify-center items-center">
            <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-indigo-500">
              <iframe
                src="https://itch.io/embed-upload/13934810?color=2D1B69"
                allowFullScreen
                width="100%"
                height="100%"
                frameBorder="0"
                className="w-full h-full min-h-[400px] bg-black"
                title="Play RacingFi"
              ></iframe>
            </div>
            {/* BETTING PANEL OVERLAY */}
            <div className="hidden md:block absolute right-[-60px] bottom-[-40px] z-20">
              <div className="rounded-2xl bg-white/10 backdrop-blur-lg border-2 border-fuchsia-500/60 shadow-xl p-6 w-80 flex flex-col items-center">
                <h2 className="text-xl font-bold text-fuchsia-200 mb-4">Apuesta Rápida</h2>
                <BettingPanel
                  onBetSubmit={handleBetSubmit}
                  isLoading={isCreatingBet}
                  isBetting={isBetting}
                />
              </div>
            </div>
            {/* LEADERBOARD OVERLAY */}
            <div className="hidden md:block absolute left-[-60px] bottom-[-40px] z-20">
              <div className="rounded-2xl bg-white/10 backdrop-blur-lg border-2 border-indigo-500/60 shadow-xl p-6 w-80 flex flex-col items-center">
                <h2 className="text-xl font-bold text-indigo-200 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" /></svg>
                  Leaderboard
                </h2>
                <Leaderboard />
              </div>
            </div>
          </div>
        )}
        {/* MOBILE PANELS (STACKED BELOW GAME) */}
        {rivalId && (
          <div className="w-full flex flex-col gap-6 mt-10 md:hidden">
            <div className="rounded-2xl bg-white/10 backdrop-blur-lg border-2 border-fuchsia-500/60 shadow-xl p-6 w-full max-w-md mx-auto flex flex-col items-center">
              <h2 className="text-xl font-bold text-fuchsia-200 mb-4">Apuesta Rápida</h2>
              <BettingPanel
                onBetSubmit={handleBetSubmit}
                isLoading={isCreatingBet}
                isBetting={isBetting}
              />
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-lg border-2 border-indigo-500/60 shadow-xl p-6 w-full max-w-md mx-auto flex flex-col items-center">
              <h2 className="text-xl font-bold text-indigo-200 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" /></svg>
                Leaderboard
              </h2>
              <Leaderboard />
            </div>
          </div>
        )}
      </div>
      </Navbar>
    </>
  );
};

export default Game;
