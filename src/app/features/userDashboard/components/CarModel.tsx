import { useEffect, useMemo, useRef, useState } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Car } from '../../../types/api/auth.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

interface ModelProps {
  car: Car;
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    </Html>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <Html center>
      <div className="text-red-500 bg-black/50 p-4 rounded-lg">
        {message}
      </div>
    </Html>
  );
}

export function CarModel({ car }: ModelProps) {
  const modelRef = useRef<THREE.Group>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Asegurarnos de que la ruta del modelo es correcta
  const modelPath = car.modelPath.startsWith('http') 
    ? car.modelPath 
    : `${API_URL}/models3d/${car.modelPath.split('/').pop()}`;

  console.log('Loading model from:', modelPath); // Para debugging
  
  let gltf;
  try {
    gltf = useGLTF(modelPath);
  } catch (err) {
    console.error('Error loading model:', err);
    return <ErrorMessage message="Error al cargar el modelo" />;
  }
  
  const { scene } = gltf;
  
  // Memoize the model transformations
  const modelScene = useMemo(() => {
    try {
      const clonedScene = scene.clone();
      const box = new THREE.Box3().setFromObject(clonedScene);
      const center = box.getCenter(new THREE.Vector3());
      
      clonedScene.position.set(0, 0, 0);
      clonedScene.position.sub(center);

      clonedScene.scale.setScalar(car.scale || 120.0);
      clonedScene.position.add(new THREE.Vector3(...(car.position || [0, -1, 0])));
      clonedScene.rotation.set(...(car.rotation || [0, Math.PI / 3, 0]));

      // Optimizar geometrías
      clonedScene.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          // Combinar geometrías si es posible
          if (node.geometry) {
            node.geometry.computeBoundingSphere();
            node.geometry.computeBoundingBox();
          }
          // Optimizar materiales
          if (node.material) {
            if (Array.isArray(node.material)) {
              node.material.forEach(mat => {
                mat.needsUpdate = false;
              });
            } else {
              node.material.needsUpdate = false;
            }
          }
        }
      });

      setIsLoading(false);
      return clonedScene;
    } catch (err) {
      console.error('Error processing model:', err);
      setError('Error al procesar el modelo');
      setIsLoading(false);
      return null;
    }
  }, [scene, car.scale, car.position, car.rotation]);

  useEffect(() => {
    if (modelRef.current && modelScene) {
      modelRef.current = modelScene;
    }

    return () => {
      if (modelScene) {
        // Cleanup cloned geometries and materials
        modelScene.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.geometry.dispose();
            if (Array.isArray(node.material)) {
              node.material.forEach(material => material.dispose());
            } else {
              node.material.dispose();
            }
          }
        });
      }
    };
  }, [modelScene]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!modelScene) return <ErrorMessage message="No se pudo cargar el modelo" />;

  return (
    <>
      <ambientLight intensity={1.5} />
      <spotLight 
        position={[5, 5, 5]}
        angle={0.6}
        penumbra={1}
        intensity={1.5}
        castShadow={false}
      />
      <primitive object={modelScene} ref={modelRef} />
    </>
  );
} 