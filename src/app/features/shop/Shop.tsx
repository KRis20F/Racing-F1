import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

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
  category: string;
  specs: {
    power: string;
    acceleration: string;
    topSpeed: string;
    weight: string;
  };
}

const carModels: CarModel[] = [
  {
    id: '1',
    name: 'Dodge Charger',
    price: 85000,
    modelPath: '/models3d/dodge_charger_1970_rt.glb',
    description: 'A powerful American muscle car combining modern performance with classic styling.',
    scale: 5.,
    position: [0, -0.5, 0],
    rotation: [0, Math.PI / 2, 0],
    cameraPosition: [2.5, 1.2, 2.5],
    fov: 50,
    category: 'Muscle',
    specs: {
      power: '485 HP',
      acceleration: '4.3s 0-60 mph',
      topSpeed: '175 mph',
      weight: '4,300 lbs'
    }
  },
  {
    id: '2',
    name: 'Formula 1 Generic',
    price: 2000000,
    modelPath: '/models3d/formula_1_generico_modelo_exemplo.glb',
    description: 'Experience the pinnacle of motorsport with this F1 racing machine.',
    scale: 2.0,
    position: [0, -1, 0],
    rotation: [0, Math.PI / 3, 0],
    cameraPosition: [4, 2, 5],
    fov: 45,
    category: 'Formula',
    specs: {
      power: '1,000 HP',
      acceleration: '2.6s 0-60 mph',
      topSpeed: '220 mph',
      weight: '1,752 lbs'
    }
  },
  {
    id: '3',
    name: '2022 Porsche 911 GT3',
    price: 180000,
    modelPath: '/models3d/2022_porsche_911_gt3_992.glb',
    description: 'German engineering at its finest, built for both track and road.',
    scale: 120.0,
    position: [0, -1, 0],
    rotation: [0, Math.PI / 3, 0],
    cameraPosition: [4, 2, 5],
    fov: 45,
    category: 'Sports',
    specs: {
      power: '502 HP',
      acceleration: '3.2s 0-60 mph',
      topSpeed: '197 mph',
      weight: '3,126 lbs'
    }
  },
  {
    id: '4',
    name: 'BMW M3 E46 GTR',
    price: 120000,
    modelPath: '/models3d/bmw_m3_e46_gtr.glb',
    description: 'A legendary racing icon that dominated motorsports.',
    scale: 40.0,
    position: [0, -1, 0],
    rotation: [0, Math.PI / 3, 0],
    cameraPosition: [3, 1, 5],
    fov: 60,
    category: 'Racing',
    specs: {
      power: '444 HP',
      acceleration: '3.8s 0-60 mph',
      topSpeed: '185 mph',
      weight: '2,976 lbs'
    }
  },
  {
    id: '5',
    name: '2022 Lamborghini Huracán Super Trofeo EVO2',
    price: 250000,
    modelPath: '/models3d/2022_lamborghini_huracan_super_trofeo_evo2_carb.glb',
    description: 'Italian racing excellence, designed for pure performance.',
    scale: 120.0,
    position: [0, -1, 0],
    rotation: [0, Math.PI / 3, 0],
    cameraPosition: [4, 2, 5],
    fov: 45,
    category: 'Super',
    specs: {
      power: '620 HP',
      acceleration: '2.9s 0-60 mph',
      topSpeed: '202 mph',
      weight: '2,866 lbs'
    }
  },
  {
    id: '6',
    name: '2011 Mosler Super GT',
    price: 150000,
    modelPath: '/models3d/2011_mosler_super_gt.glb',
    description: 'An exotic supercar built for ultimate speed and handling.',
    scale: 120.0,
    position: [0, -1, 0],
    rotation: [0, Math.PI / 3, 0],
    cameraPosition: [4, 2, 5],
    fov: 45,
    category: 'Super',
    specs: {
      power: '600 HP',
      acceleration: '3.1s 0-60 mph',
      topSpeed: '200 mph',
      weight: '2,500 lbs'
    }
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
    // Center the model
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    
    // Reset and apply transformations
    scene.position.set(0, 0, 0);
    scene.position.sub(center);

    // Configuración especial para el Dodge Charger
    if (car.id === '1') {
      scene.scale.setScalar(0.8);
    } else {
      scene.scale.setScalar(car.scale);
    }
    
    scene.position.add(new THREE.Vector3(...car.position));
    scene.rotation.set(...car.rotation);

    // Preload next model
    const nextCarIndex = carModels.findIndex(c => c.id === car.id) + 1;
    if (nextCarIndex < carModels.length) {
      useGLTF.preload(carModels[nextCarIndex].modelPath);
    }
  }, [car.id, scene, car.scale, car.position, car.rotation]);

  // Configuración especial para el Dodge Charger
  if (car.id === '1') {
    return (
      <>
        <ambientLight intensity={2} />
        <spotLight 
          position={[5, 5, 5]}
          angle={0.6}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <pointLight 
          position={[-5, 5, -5]} 
          intensity={1.5}
        />
        <primitive 
          object={scene}
          castShadow
          receiveShadow
        />
      </>
    );
  }

  return (
    <Stage
      environment="city"
      intensity={2}
      adjustCamera={false}
      shadows="contact"
      preset="rembrandt"
    >
      <primitive 
        object={scene}
        castShadow
        receiveShadow
      />
    </Stage>
  );
}

interface CarCardProps {
  car: CarModel;
  onAddToCart: (car: CarModel) => void;
  onAddToWishlist: (car: CarModel) => void;
  isInWishlist: boolean;
}

const CarCard: React.FC<CarCardProps> = ({ car, onAddToCart, onAddToWishlist, isInWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] border border-indigo-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-[450px] relative bg-gradient-to-b from-gray-800 to-gray-900">
        <Canvas 
          camera={{ 
            position: car.cameraPosition,
            fov: car.fov,
            near: 0.1,
            far: 1000
          }}
          className="w-full h-full"
          shadows
        >
          <Suspense fallback={null}>
            <color attach="background" args={['#111827']} />
            <ambientLight intensity={0.5} />
            <spotLight 
              position={[10, 10, 10]}
              angle={0.5}
              penumbra={1}
              intensity={1}
              castShadow
            />
            <Model car={car} />
            <OrbitControls
              enableZoom={false}
              autoRotate={isHovered}
              autoRotateSpeed={2}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 3}
              target={[0, 0, 0]}
              maxDistance={8}
              minDistance={3}
            />
          </Suspense>
        </Canvas>
        
        <button
          onClick={() => setShowDetails(true)}
          className="absolute bottom-4 right-4 bg-indigo-600/80 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors"
        >
          View Details
        </button>
      </div>

      <div className="p-8 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-bold text-white font-racing">
            {car.name}
          </h3>
          <button
            onClick={() => onAddToWishlist(car)}
            className={`p-2 rounded-full transition-colors ${
              isInWishlist ? 'text-red-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isInWishlist ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm">
            {car.category}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          {car.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-indigo-400 font-racing">
            ${car.price.toLocaleString()}
          </span>
          <button 
            onClick={() => onAddToCart(car)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg hover:shadow-indigo-500/25"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Car Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full mx-4"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-white">{car.name}</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-indigo-400 font-medium mb-2">Power Output</h3>
                  <p className="text-white text-2xl font-bold">{car.specs.power}</p>
                </div>
                <div>
                  <h3 className="text-indigo-400 font-medium mb-2">Acceleration</h3>
                  <p className="text-white text-2xl font-bold">{car.specs.acceleration}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-indigo-400 font-medium mb-2">Top Speed</h3>
                  <p className="text-white text-2xl font-bold">{car.specs.topSpeed}</p>
                </div>
                <div>
                  <h3 className="text-indigo-400 font-medium mb-2">Weight</h3>
                  <p className="text-white text-2xl font-bold">{car.specs.weight}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDetails(false)}
                className="px-6 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onAddToCart(car);
                  setShowDetails(false);
                }}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

// const Shop = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [sortBy, setSortBy] = useState('name');
//   const [wishlist, setWishlist] = useState<string[]>([]);
//   const [cartItems, setCartItems] = useState<CarModel[]>([]);

//   const categories = ['All', ...Array.from(new Set(carModels.map(car => car.category)))];

//   const filteredCars = carModels
//     .filter(car => 
//       (selectedCategory === 'All' || car.category === selectedCategory) &&
//       car.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (sortBy === 'price-asc') return a.price - b.price;
//       if (sortBy === 'price-desc') return b.price - a.price;
//       return a.name.localeCompare(b.name);
//     });

//   useEffect(() => {
//     // Preload first model
//     useGLTF.preload(carModels[0].modelPath);
    
//     // After a short delay, start loading the rest
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//       // Preload remaining models in background
//       carModels.slice(1).forEach(car => {
//         useGLTF.preload(car.modelPath);
//       });
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, []);

//   const handleAddToWishlist = (car: CarModel) => {
//     setWishlist(prev => 
//       prev.includes(car.id)
//         ? prev.filter(id => id !== car.id)
//         : [...prev, car.id]
//     );
//   };

//   const handleAddToCart = (car: CarModel) => {
//     setCartItems(prev => [...prev, car]);
//     // Here you would typically integrate with your cart context/state management
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
//       {isLoading && <LoadingScreen />}
      
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 shadow-2xl relative">
//         <div className="absolute inset-0 bg-black/20" />
//         <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-5xl font-bold text-white flex items-center gap-4 font-racing">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//               </svg>
//               Exclusive Car Collection
//             </h1>
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
//                 </svg>
//                 {cartItems.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                     {cartItems.length}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//           <p className="text-gray-200 text-center max-w-3xl mx-auto text-lg">
//             Experience the thrill of owning legendary racing machines. Each model is a masterpiece of engineering and design.
//           </p>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
//           <div className="flex gap-4 items-center">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search cars..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="bg-gray-800 text-white px-4 py-2 rounded-xl pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//               <svg
//                 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//               </svg>
//             </div>

//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="bg-gray-800 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>

//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="bg-gray-800 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="name">Sort by Name</option>
//             <option value="price-asc">Price: Low to High</option>
//             <option value="price-desc">Price: High to Low</option>
//           </select>
//         </div>

//         {/* Results Count */}
//         <p className="text-gray-400 mb-6">
//           Showing {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'}
//         </p>

//         {/* Car Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           <AnimatePresence>
//             {filteredCars.map((car) => (
//               <CarCard
//                 key={car.id}
//                 car={car}
//                 onAddToCart={handleAddToCart}
//                 onAddToWishlist={handleAddToWishlist}
//                 isInWishlist={wishlist.includes(car.id)}
//               />
//             ))}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 mt-20">
//         <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//           <p className="text-center text-white text-sm font-medium">
//             © 2024 F1 Racing Challenge Shop. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Shop; 