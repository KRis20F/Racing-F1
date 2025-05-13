import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Preload, useProgress } from '@react-three/drei';
import * as THREE from 'three';

interface CarModel {
  id: string;
  name: string;
  price: number;
  modelPath: string;
  description: string;
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
  cameraPosition: [number, number, number];
  fov: number;
}

const carModels: CarModel[] = [
  {
    id: '1',
    name: '1978 Pontiac Firebird Formula',
    price: 75000,
    modelPath: '/models3d/1978_pontiac_firebird_formula.glb',
    description: 'A classic American muscle car with timeless design and raw power.',
    scale: 8.0,
    position: [0, -0.2, 0],
    rotation: [0, Math.PI / 3, 0],
    cameraPosition: [2, 1, 2],
    fov: 30
  },
  {
    id: '2',
    name: 'Formula 1 Generic',
    price: 2000000,
    modelPath: '/models3d/formula_1_generico_modelo_exemplo.glb',
    description: 'Experience the pinnacle of motorsport with this F1 racing machine.',
    scale: 10.0,
    position: [0, -0.2, 0],
    rotation: [0, Math.PI / 3, 0],
    cameraPosition: [2, 1, 2],
    fov: 30
  },
  {
    id: '3',
    name: '2022 Porsche 911 GT3',
    price: 180000,
    modelPath: '/models3d/2022_porsche_911_gt3_992.glb',
    description: 'German engineering at its finest, built for both track and road.',
    scale: 12.0,
    position: [0, -0.2, 0],
    rotation: [0, Math.PI / 3, 0],
    cameraPosition: [2, 1, 2],
    fov: 30
  },
  {
    id: '4',
    name: 'BMW M3 E46 GTR',
    price: 120000,
    modelPath: '/models3d/bmw_m3_e46_gtr.glb',
    description: 'A legendary racing icon that dominated motorsports.',
    scale: 9.0,
    position: [0, -1.2, 0],
    rotation: [0, Math.PI / 3, 0],
    cameraPosition: [5, 2.5, 6],
    fov: 100
  },
  {
    id: '5',
    name: '2022 Lamborghini Huracán Super Trofeo EVO2',
    price: 250000,
    modelPath: '/models3d/2022_lamborghini_huracan_super_trofeo_evo2_carb.glb',
    description: 'Italian racing excellence, designed for pure performance.',
    scale: 9.0,
    position: [0, -1.2, 0],
    rotation: [0, Math.PI / 3, 0],
    cameraPosition: [5, 2.5, 6],
    fov: 42
  },
  {
    id: '6',
    name: '2011 Mosler Super GT',
    price: 150000,
    modelPath: '/models3d/2011_mosler_super_gt.glb',
    description: 'An exotic supercar built for ultimate speed and handling.',
    scale: 8.5,
    position: [0, -1.2, 0],
    rotation: [0, Math.PI / 3, 0],
    cameraPosition: [5, 2.5, 6],
    fov: 42
  }
];

const LoadingScreen = () => {
  const { progress } = useProgress();
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-indigo-400 text-lg">Loading Models... {progress.toFixed(0)}%</p>
      </div>
    </div>
  );
};

function Model({ car }: { car: CarModel }) {
  const { scene } = useGLTF(car.modelPath);
  
  useEffect(() => {
    // Centrar el modelo
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
    
    // Aplicar escala
    scene.scale.set(car.scale, car.scale, car.scale);
    
    // Aplicar posición después de centrar
    scene.position.add(new THREE.Vector3(...car.position));
    
    // Aplicar rotación
    scene.rotation.set(...car.rotation);

    const nextCarIndex = carModels.findIndex(c => c.id === car.id) + 1;
    if (nextCarIndex < carModels.length) {
      useGLTF.preload(carModels[nextCarIndex].modelPath);
    }
  }, [car.id, scene, car.scale, car.position, car.rotation]);

  return (
    <Stage
      environment="city"
      intensity={1.5}
      preset="rembrandt"
      adjustCamera={false}
    >
      <primitive 
        object={scene}
      />
    </Stage>
  );
}

const CarCard = ({ car }: { car: CarModel }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] border border-indigo-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-[450px] relative bg-gradient-to-b from-gray-800 to-gray-900">
        <Canvas 
          camera={{ 
            position: [2, 1, 2],
            fov: 30,
            near: 0.1,
            far: 1000
          }}
          className="w-full h-full"
          shadows
        >
          <Suspense fallback={null}>
            <color attach="background" args={['#111827']} />
            <ambientLight intensity={2} />
            <spotLight 
              position={[3, 3, 3]} 
              angle={0.4} 
              penumbra={1} 
              intensity={3} 
              castShadow 
            />
            <Model car={car} />
            <OrbitControls
              enableZoom={true}
              autoRotate={isHovered}
              autoRotateSpeed={2}
              maxPolarAngle={Math.PI / 1.8}
              minPolarAngle={Math.PI / 2.5}
              target={[0, 0, 0]}
              maxDistance={5}
              minDistance={1.5}
            />
          </Suspense>
        </Canvas>
      </div>
      <div className="p-8 bg-gradient-to-b from-gray-900 to-gray-800">
        <h3 className="text-2xl font-bold text-white mb-3 font-racing">
          {car.name}
        </h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          {car.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-indigo-400 font-racing">
            ${car.price.toLocaleString()}
          </span>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105 font-medium shadow-lg hover:shadow-indigo-500/25">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const Shop = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload first model
    useGLTF.preload(carModels[0].modelPath);
    
    // After a short delay, start loading the rest
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Preload remaining models in background
      carModels.slice(1).forEach(car => {
        useGLTF.preload(car.modelPath);
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {isLoading && <LoadingScreen />}
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 shadow-2xl relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-5xl font-bold text-white flex items-center gap-4 font-racing text-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Exclusive Car Collection
          </h1>
          <p className="text-gray-200 text-center max-w-3xl mx-auto text-lg">
            Experience the thrill of owning legendary racing machines. Each model is a masterpiece of engineering and design.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {carModels.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 mt-20">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white text-sm font-medium">
            © 2024 F1 Racing Challenge Shop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Shop; 