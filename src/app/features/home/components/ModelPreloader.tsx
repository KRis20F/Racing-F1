import { Suspense, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const MODEL_PATHS = [
  '/models/car1.glb',
  '/models/car2.glb'
] as const;

const ModelPreloader = () => {
  useEffect(() => {
    // Preload models in chunks to avoid blocking the main thread
    const preloadModels = async () => {
      for (const path of MODEL_PATHS) {
        try {
          await new Promise(resolve => setTimeout(resolve, 100)); // Add small delay between loads
          useGLTF.preload(path);
        } catch (error) {
          console.error(`Failed to preload model: ${path}`, error);
        }
      }
    };

    const preloadTimeout = setTimeout(() => {
      preloadModels();
    }, 1000); // Delay initial load to prioritize UI rendering

    return () => {
      clearTimeout(preloadTimeout);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ModelPreloader; 