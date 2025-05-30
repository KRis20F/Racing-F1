import { useProgress } from '@react-three/drei';

export const LoadingScreen = () => {
  const { progress } = useProgress();
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-indigo-400 text-lg">Loading Models... {progress.toFixed(0)}%</p>
      </div>
    </div>
  );
}; 