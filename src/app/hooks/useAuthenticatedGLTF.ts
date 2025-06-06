import { useEffect, useState } from 'react';
import type { GLTF } from 'three-stdlib';
import { GLTFLoader } from 'three-stdlib';

export function useAuthenticatedGLTF(url: string) {
  const [gltf, setGltf] = useState<GLTF | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();

    loader.loadAsync(url)
      .then(setGltf)
      .catch((err: Error) => {
        console.error('Error loading model:', err);
        setError(err);
      });
  }, [url]);

  return { gltf, error };
} 