import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
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
  scale = 2,
  position = [0, -0.5, 0],
  rotation = [0, Math.PI / 3, 0]
}: CarModelProps) {
  const group = useRef<THREE.Group>();

  // Asegurarnos de que la ruta del modelo es correcta
  const fullModelPath = modelPath.startsWith('http') 
    ? modelPath 
    : `${API_URL}/static/models3d/${modelPath.split('/').pop()}`;

  console.log('Loading model from:', fullModelPath); // Para debugging

  const { scene } = useGLTF(fullModelPath);

  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      
      scene.position.sub(center);
      scene.scale.setScalar(scale);
      scene.position.add(new THREE.Vector3(...position));
      scene.rotation.set(...rotation);

      // Optimizar geometrías
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
    }

    return () => {
      if (scene) {
        scene.traverse((node) => {
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
  }, [scene, scale, position, rotation]);

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
      <primitive object={scene} ref={group} />
    </>
  );
}

export default CarModel; 