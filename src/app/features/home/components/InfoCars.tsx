import { useRef, Suspense, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import type { GroupProps } from '@react-three/fiber';
import * as THREE from 'three';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const MODEL_PATH = '2011_mosler_super_gt';

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

// Componente para el modelo 3D
function Model(props: GroupProps) {
  const fullModelPath = `${API_URL}/models3d/${MODEL_PATH}.glb`;
  console.log('Attempting to load model from:', fullModelPath);
  
  try {
    const { scene } = useGLTF(fullModelPath, true);
    const scale = 120.0;
    const position: [number, number, number] = [0, -1, 0];
    const rotation: [number, number, number] = [0, Math.PI / 3, 0];
    
    // Optimizar geometrías y materiales
    scene.traverse((node: THREE.Object3D) => {
      if (node instanceof THREE.Mesh) {
        if (node.geometry) {
          node.geometry.computeBoundingSphere();
          node.geometry.computeBoundingBox();
        }
        if (node.material) {
          if (Array.isArray(node.material)) {
            node.material.forEach(mat => {
              if (mat.map) mat.map.anisotropy = 16;
              mat.needsUpdate = true;
            });
          } else {
            if (node.material.map) node.material.map.anisotropy = 16;
            node.material.needsUpdate = true;
          }
        }
      }
    });
    
    return (
      <primitive 
        object={scene} 
        scale={scale}
        position={position}
        rotation={rotation}
        {...props} 
        dispose={null}
      />
    );
  } catch (error) {
    console.error('Error loading model:', error);
    throw error;
  }
}

function ModelWithErrorBoundary(props: GroupProps) {
  return (
    <ErrorBoundary 
      fallback={<ErrorMessage />}
      onError={(error) => console.error('Error in 3D model:', error)}
      onReset={() => window.location.reload()}
    >
      <Model {...props} />
    </ErrorBoundary>
  );
}

export default function InfoCars() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [contextLost, setContextLost] = useState(false);

  const handleContextLost = useCallback(() => {
    console.warn('WebGL context lost');
    setContextLost(true);
  }, []);

  const handleContextRestored = useCallback(() => {
    console.log('WebGL context restored');
    setContextLost(false);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-4">
      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="text-center">
          <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-pink-400 mb-4">
            Autos Exclusivos
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light">
            Descubre nuestra colección de vehículos de alta gama
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-8 relative w-full max-w-6xl mx-auto justify-center items-center">
          <div className="w-full md:w-5/12 flex flex-col gap-6 backdrop-blur-lg bg-white/80 dark:bg-white/10 p-8 rounded-2xl border border-purple-100 dark:border-white/20 hover:border-purple-300 dark:hover:border-white/40 transition-all duration-300">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
              Experiencia Premium
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Accede a una selección exclusiva de los mejores autos del mundo.
              Desde superdeportivos hasta clásicos de colección, cada vehículo
              es cuidadosamente seleccionado para ofrecerte lo mejor en
              rendimiento, diseño y exclusividad.
            </p>
          </div>

          <div className="w-full md:w-7/12 h-[700px]">
            <div className="h-full w-full">
              {contextLost ? (
                <div className="flex items-center justify-center h-full bg-gray-900 rounded-lg">
                  <div className="text-center text-white p-4">
                    <p className="text-xl mb-2">Contexto WebGL perdido</p>
                    <p className="text-sm">Recargando visualización...</p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="mt-4 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Recargar página
                    </button>
                  </div>
                </div>
              ) : (
                <Canvas
                  camera={{ position: [4, 2, 5], fov: 45 }}
                  onCreated={({ gl }) => {
                    const canvas = gl.domElement;
                    canvas.addEventListener('webglcontextlost', handleContextLost);
                    canvas.addEventListener('webglcontextrestored', handleContextRestored);
                  }}
                  style={{ background: 'transparent' }}
                >
                  <ambientLight intensity={0.7} />
                  <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={1}
                    castShadow
                  />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                  <Suspense fallback={<LoadingMessage />}>
                    <ModelWithErrorBoundary />
                    <OrbitControls
                      enableZoom={false}
                      maxPolarAngle={Math.PI / 2}
                      minPolarAngle={Math.PI / 4}
                      enableDamping
                      dampingFactor={0.05}
                    />
                  </Suspense>
                </Canvas>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
