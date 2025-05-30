import { useProgress } from '@react-three/drei';

const LoadingScreen = () => {
  const { progress } = useProgress();
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="text-center">
        <div className="w-32 h-32 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
        <div className="text-white text-xl font-semibold">
          Loading Models... {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 