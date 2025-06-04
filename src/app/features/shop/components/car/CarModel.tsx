import { useEffect, useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { CarModel as CarModelType } from '../types';
import { carModels } from '../../data/carModels';

interface ModelProps {
  car: CarModelType;
}

export function CarModel({ car }: ModelProps) {
  const modelRef = useRef<THREE.Group>();
  const { scene } = useGLTF(car.modelPath);
  
  // Memoize the model transformations
  const modelScene = useMemo(() => {
    const clonedScene = scene.clone();
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    
    clonedScene.position.set(0, 0, 0);
    clonedScene.position.sub(center);

    const scale = car.id === '1' ? 0.8 : car.scale;
    clonedScene.scale.setScalar(scale);
    
    clonedScene.position.add(new THREE.Vector3(...car.position));
    clonedScene.rotation.set(...car.rotation);

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

    return clonedScene;
  }, [scene, car.id, car.scale, car.position, car.rotation]);

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current = modelScene;
    }

    return () => {
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
    };
  }, [modelScene]);

  if (car.id === '1') {
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

  return <primitive object={modelScene} ref={modelRef} />;
} 