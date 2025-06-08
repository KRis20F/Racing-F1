import BettingPanel from "./components/BettingPanel";
import Leaderboard from "./components/Leaderboard";
import { useEffect, useState } from "react";
import { useRace } from "../../hooks/useRace";
import { toast } from "react-hot-toast";
import type { BetRequest } from "../../api/endpoints/race.endpoints";

interface SimpleBetData {
  playerId: number;
  amount: number;
}

const Game = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isBetting, setIsBetting] = useState(false);

  const {
    createBet,
    isCreatingBet,
    createBetError,
    submitResultError
  } = useRace();

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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      {/* Racing-themed header */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white flex items-center gap-4 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            F1 Racing Challenge
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Window */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
              <div className="w-full h-[700px] relative">
                <iframe 
                  src="https://itch.io/embed-upload/9812011?color=333333" 
                  allowFullScreen 
                  width="100%" 
                  height="100%"
                  frameBorder="0"
                  className="absolute top-0 left-0 w-full h-full"
                  title="RacingFi - Multiplayer Online Racing Game"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Betting Panel */}
          <div>
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
              <BettingPanel 
                onBetSubmit={handleBetSubmit}
                isLoading={isCreatingBet}
                isBetting={isBetting}
              />
            </div>
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
              <Leaderboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
