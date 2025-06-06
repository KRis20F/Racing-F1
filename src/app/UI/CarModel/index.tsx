import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

interface CarModelProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function CarModel({ 
  modelPath,
  scale = 80,
  position = [0, -1, 0],
  rotation = [0, Math.PI / 3, 0]
}: CarModelProps) {
  const group = useRef<THREE.Group>(null);
  
  // Asegurarnos de que la ruta del modelo es correcta
  const fullModelPath = modelPath.startsWith('http') 
    ? modelPath 
    : `${API_URL}/models3d/${modelPath.split('/').pop()?.replace('.glb', '')}.glb`;

  console.log('Loading model from:', fullModelPath);
  
  // Cargar el modelo
  const { scene } = useGLTF(fullModelPath);

  if (!scene) {
    return (
      <Html center>
        <div className="text-red-500">
          Error: Modelo no disponible
        </div>
      </Html>
    );
  }

  // Configurar el modelo
  if (group.current) {
    group.current.scale.setScalar(scale);
    group.current.position.set(...position);
    group.current.rotation.set(...rotation);
  }

  // Optimizar geometrías y materiales
  scene.traverse((node) => {
    if (node instanceof THREE.Mesh) {
      if (node.geometry) {
        node.geometry.computeBoundingSphere();
        node.geometry.computeBoundingBox();
      }
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

  return (
    <primitive 
      object={scene} 
      ref={group}
      dispose={null}
    />
  );
}

export default CarModel; 