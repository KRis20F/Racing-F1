import { useRef, Suspense } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

interface CarModelProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

// Loading component using Html from drei
function LoadingMessage() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    </Html>
  );
}

// Error component using Html from drei
function ErrorMessage() {
  return (
    <Html center>
      <div className="text-red-500 text-center">
        <p className="text-xl font-bold mb-2">Error al cargar el modelo 3D</p>
        <p className="text-sm mb-2">El servidor no está respondiendo</p>
        <p className="text-xs text-gray-500">Asegúrate de que el servidor backend esté corriendo en {API_URL}</p>
      </div>
    </Html>
  );
}

export function CarModel({ 
  modelPath,
  scale = 180.0,
  position = [0, -0.35, 0],
  rotation = [0, Math.PI / 4, 0]
}: CarModelProps) {
  const group = useRef<THREE.Group>(null);
  
  // Asegurarnos de que la ruta del modelo es correcta
  const fullModelPath = modelPath.startsWith('http') 
    ? modelPath 
    : modelPath.startsWith('/') 
      ? `${API_URL}${modelPath}`
      : `${API_URL}/models3d/${modelPath}`;

  console.log('Loading model from:', fullModelPath);
  
  // Cargar el modelo (hooks deben estar en el nivel superior)
  const { scene } = useGLTF(fullModelPath);

  // Si no hay escena, mostrar error
  if (!scene) {
    console.error('No scene loaded');
    return <ErrorMessage />;
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
            mat.needsUpdate = true;
          });
        } else {
          node.material.needsUpdate = true;
        }
      }
    }
  });

  return (
    <Suspense fallback={<LoadingMessage />}>
      <primitive 
        object={scene} 
        ref={group}
        scale={scale}
        position={position}
        rotation={rotation}
        dispose={null}
      />
    </Suspense>
  );
}

export default CarModel; 