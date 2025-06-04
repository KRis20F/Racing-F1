import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { carModels } from '../data/carModels';

// Dividir los modelos en chunks más pequeños
const CHUNK_SIZE = 2;
const MODEL_CHUNKS = carModels.reduce((chunks, model, index) => {
  const chunkIndex = Math.floor(index / CHUNK_SIZE);
  if (!chunks[chunkIndex]) chunks[chunkIndex] = [];
  chunks[chunkIndex].push(model.modelPath);
  return chunks;
}, [] as string[][]);

export const useModelPreloader = () => {
  const loadedModels = useRef(new Set<string>());

  useEffect(() => {
    let mounted = true;
    
    const loadChunk = async (chunk: string[]) => {
      if (!mounted) return;
      
      const newModels = chunk.filter(model => !loadedModels.current.has(model));
      
      await Promise.all(
        newModels.map(async (model) => {
          try {
            await useGLTF.preload(model);
            loadedModels.current.add(model);
          } catch (error) {
            console.error(`Failed to load model: ${model}`, error);
          }
        })
      );
      
      // Dar tiempo al navegador para respirar
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    const loadModels = async () => {
      for (const chunk of MODEL_CHUNKS) {
        if (!mounted) break;
        await loadChunk(chunk);
      }
    };

    // Retrasar la carga inicial para priorizar la UI
    const timeoutId = setTimeout(() => {
      loadModels();
    }, 2000);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      
      // Limpiar modelos al desmontar
      loadedModels.current.forEach(model => {
        useGLTF.clear(model);
      });
      loadedModels.current.clear();
    };
  }, []);

  return { loadedCount: loadedModels.current.size };
}; 