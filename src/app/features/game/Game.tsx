import BettingPanel from "./components/BettingPanel";
import Leaderboard from "./components/Leaderboard";
import RaceTrack from "./components/RaceTrack";

const Game = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Race Game</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel izquierdo - Apuestas */}
          <div className="lg:col-span-1">
            <BettingPanel />
          </div>

          {/* Panel central - Pista de carreras */}
          <div className="lg:col-span-2">
            <RaceTrack trackId={1} isBetting={true} betAmount={0} />
          </div>

          {/* Panel inferior - Tabla de clasificación */}
          <div className="lg:col-span-3">
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
