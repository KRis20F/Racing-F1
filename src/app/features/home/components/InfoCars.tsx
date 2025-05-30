import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

// Componente para el modelo 3D
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Model(props: Record<string, any>) {
  const { scene } = useGLTF("/models3d/2011_mosler_super_gt.glb", true);
  return <primitive object={scene} {...props} />;
}

// Añadimos un componente para el mensaje de carga
function LoadingMessage() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export default function InfoCars() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
              <Canvas
                camera={{ position: [4, 2, 5], fov: 45 }}
                gl={{
                  preserveDrawingBuffer: true,
                  antialias: true,
                }}
                dpr={[1, 2]}
              >
                <ambientLight intensity={0.7} />
                <spotLight
                  position={[10, 10, 10]}
                  angle={0.15}
                  penumbra={1}
                  intensity={1}
                />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <Suspense fallback={<LoadingMessage />}>
                  <Model
                    scale={120}
                    position={[0, -0.5, 1]}
                    rotation={[0, Math.PI / 3, 0]}
                  />
                  <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 4}
                  />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
