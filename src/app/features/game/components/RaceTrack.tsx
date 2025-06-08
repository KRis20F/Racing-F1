import { useState, useEffect, useRef, useCallback, memo } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// TODO: Implementar diseño de pista de carreras
// - Añadir fondo con perspectiva
// - Implementar animaciones de coches
// - Añadir efectos de partículas para drift
// - Incluir HUD con información de carrera

interface RaceResult {
  playerId: number;
  position: number;
  time: number;
}

interface RaceTrackProps {
  isBetting: boolean;
  betAmount: number;
  onRaceComplete?: (result: RaceResult) => void;
  isSubmittingResult: boolean;
}

const RaceTrack = memo<RaceTrackProps>(({ 
  isBetting, 
  betAmount,
  onRaceComplete,
  isSubmittingResult 
}) => {

  const [raceStatus, setRaceStatus] = useState<"waiting" | "racing" | "finished">("waiting");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<typeof OrbitControls>(null);

  const handleRaceFinish = useCallback(() => {
    setRaceStatus("finished");
    if (onRaceComplete) {
      onRaceComplete({
        playerId: 1,
        position: 1,
        time: 120.5
      });
    }
  }, [onRaceComplete]);

  // Optimizar el manejo de eventos del wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (e: WheelEvent) => {
      if (controlsRef.current) {
        e.preventDefault();
      }
    };

    canvas.addEventListener('wheel', handleWheel, { passive: true });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Race container */}
      <div className="w-full h-[500px] bg-gray-900 rounded-lg overflow-hidden">
        <Canvas
          ref={canvasRef}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          camera={{ position: [0, 5, 10], fov: 45 }}
        >
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.5}
            panSpeed={0.5}
            rotateSpeed={0.5}
            makeDefault
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow={false} />
          
          {/* Escena 3D optimizada */}
          <mesh receiveShadow={false}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </Canvas>
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
      {raceStatus === "waiting" && !isSubmittingResult && (
        <button
          onClick={handleRaceFinish}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Start Race
        </button>
      )}
    </div>
  );
});

export default RaceTrack;
