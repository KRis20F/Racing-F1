import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const ModelPreloader = () => {
  useEffect(() => {
    // Preload all models
    useGLTF.preload('/models/f1.glb');
    useGLTF.preload('/models/porsche.glb');
    useGLTF.preload('/models/bmw.glb');
    useGLTF.preload('/models/lamborghini.glb');
    useGLTF.preload('/models/mosler.glb');
  }, []);

  return null; // This component doesn't render anything
};

export default ModelPreloader; 