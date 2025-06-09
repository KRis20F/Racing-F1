import { useRef, Suspense, useEffect } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import type { GLTF } from 'three-stdlib';
import * as THREE from 'three';

function joinUrl(base: string, path: string) {
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

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
function ErrorMessage({ error }: { error?: string }) {
  return (
    <Html center>
      <div className="text-red-500 text-center">
        <p className="text-xl font-bold mb-2">Error al cargar el modelo 3D</p>
        <p className="text-sm mb-2">{error || 'El servidor no está respondiendo'}</p>
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
  const { gl } = useThree();
  
  // Handle WebGL context loss
  useEffect(() => {
    const canvas = gl.domElement;
    
    const handleContextLost = (event: Event) => {
      event.preventDefault();
    };

    const handleContextRestored = () => {
      if (group.current) {
        // Force scene update
        group.current.traverse((node: THREE.Object3D) => {
          if (node instanceof THREE.Mesh) {
            if (node.material) {
              if (Array.isArray(node.material)) {
                node.material.forEach(mat => mat.needsUpdate = true);
              } else {
                node.material.needsUpdate = true;
              }
            }
          }
        });
      }
    };

    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [gl]);
  
  // Ensure model path is correct
  const fullModelPath = modelPath.startsWith('http') 
    ? modelPath 
    : modelPath.startsWith('/') 
      ? joinUrl(API_URL, modelPath)
      : joinUrl(API_URL, `models3d/${modelPath}`);
  
  // Load the model (hooks must be at the top level)
  const { scene } = useGLTF(fullModelPath) as GLTF & { errors?: string[] };

  // If no scene or errors, show error message
  if (!scene) {
    return <ErrorMessage error="Failed to load 3D model" />;
  }

  try {
    // Optimizar geometrías y materiales
    scene.traverse((node: THREE.Object3D) => {
      if (node instanceof THREE.Mesh) {
        // Habilitar sombras
        node.castShadow = true;
        node.receiveShadow = true;

        if (node.geometry) {
          node.geometry.computeBoundingSphere();
          node.geometry.computeBoundingBox();
        }
        
        if (node.material) {
          const isMuscleCarModel = modelPath.includes('pontiac') || 
                                 modelPath.includes('dodge_charger') || 
                                 modelPath.includes('bmw_m3');

          if (Array.isArray(node.material)) {
            node.material.forEach(mat => {
              mat.needsUpdate = true;
              if (mat instanceof THREE.MeshStandardMaterial) {
                // Configuración específica para muscle cars
                if (isMuscleCarModel) {
                  mat.roughness = 0.6;  // Más brillante
                  mat.metalness = 0.7;  // Más metálico
                  mat.envMapIntensity = 2.0;  // Más reflectivo
                } else {
                  mat.roughness = 0.8;
                  mat.metalness = 0.4;
                  mat.envMapIntensity = 1.5;
                }
              }
            });
          } else {
            node.material.needsUpdate = true;
            if (node.material instanceof THREE.MeshStandardMaterial) {
              // Configuración específica para muscle cars
              if (isMuscleCarModel) {
                node.material.roughness = 0.6;  // Más brillante
                node.material.metalness = 0.7;  // Más metálico
                node.material.envMapIntensity = 2.0;  // Más reflectivo
              } else {
                node.material.roughness = 0.8;
                node.material.metalness = 0.4;
                node.material.envMapIntensity = 1.5;
              }
            }
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
        />
      </Suspense>
    );
  } catch (error) {
    return <ErrorMessage error={error instanceof Error ? error.message : 'Error desconocido'} />;
  }
}

export default CarModel; 