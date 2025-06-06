import { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useProgress } from '@react-three/drei';
import { useUserData } from '../../../hooks/useUserData';
import { CarModel } from '../../../UI/CarModel';
import { carsEndpoints } from '../../../api/endpoints/cars.endpoints';
import type { CarListing } from '../../../api/endpoints/cars.endpoints';

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

export const Garage = () => {
  const { profile, isLoading: isProfileLoading } = useUserData();
  const [selectedCar, setSelectedCar] = useState<CarListing | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [carListings, setCarListings] = useState<CarListing[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(true);

  useEffect(() => {
    const loadCarListings = async () => {
      try {
        const { listings } = await carsEndpoints.getCarListings();
        setCarListings(listings);
        setIsLoadingModels(false);
      } catch (error) {
        console.error('Error loading car listings:', error);
        setIsLoadingModels(false);
      }
    };

    loadCarListings();
  }, []);

  if (isProfileLoading || isLoadingModels) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B1437]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#4318FF]"></div>
      </div>
    );
  }

  const userCars = profile?.cars || [];
  const userCarListings = carListings.filter(listing => 
    userCars.some(userCar => userCar.id === listing.carId)
  );

  return (
    <div className="min-h-screen bg-[#0B1437] p-8">
      {/* Header */}
      <div className="relative mb-12">
        <h1 className="text-4xl font-bold text-white relative z-10">
          Virtual Garage
          <span className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-[#4318FF] to-purple-600"></span>
        </h1>
        <p className="text-gray-400 mt-4">Your collection of racing machines</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Car List */}
        <div className="lg:col-span-1 space-y-4">
          {userCarListings.map((car) => (
            <div
              key={car.id}
              className={`bg-[#111C44] rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                selectedCar?.id === car.id
                  ? 'border-2 border-[#4318FF]'
                  : 'border-2 border-transparent'
              }`}
              onClick={() => setSelectedCar(car)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-bold">{car.name}</h3>
                  <p className="text-gray-400 text-sm">{car.modelType}</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#4318FF]/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#4318FF]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}

          {userCarListings.length === 0 && (
            <div className="text-center py-8 bg-[#111C44] rounded-xl">
              <p className="text-gray-400">No cars in your collection yet</p>
              <a 
                href="/shop" 
                className="mt-4 inline-block bg-[#4318FF] text-white px-6 py-2 rounded-lg hover:bg-[#3311CC] transition-colors"
              >
                Visit Shop
              </a>
            </div>
          )}
        </div>

        {/* 3D Viewer */}
        <div className="lg:col-span-2">
          <div className="bg-[#111C44] rounded-2xl overflow-hidden" style={{ height: '600px' }}>
            {selectedCar ? (
              <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [4, 2, 5], fov: 50 }}
              >
                <Suspense fallback={<LoadingScreen />}>
                  <Stage
                    environment="city"
                    intensity={0.6}
                    shadows
                    preset="rembrandt"
                  >
                    <CarModel 
                      modelPath={selectedCar.modelPath}
                      scale={2}
                      position={[0, -0.5, 0]}
                    />
                  </Stage>
                  <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    enableRotate={true}
                    autoRotate={isHovered}
                    autoRotateSpeed={4}
                    makeDefault
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 2}
                  />
                </Suspense>
              </Canvas>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-400">Select a car to view in 3D</p>
              </div>
            )}
          </div>

          {/* Car Details */}
          {selectedCar && (
            <div className="mt-6 bg-[#111C44] rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">{selectedCar.name}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedCar.stats && (
                  <>
                    <div className="bg-[#1B254B] rounded-xl p-4">
                      <p className="text-gray-400 text-sm">Power</p>
                      <p className="text-white font-bold">{selectedCar.stats.power}</p>
                    </div>
                    <div className="bg-[#1B254B] rounded-xl p-4">
                      <p className="text-gray-400 text-sm">Acceleration</p>
                      <p className="text-white font-bold">{selectedCar.stats.acceleration}</p>
                    </div>
                    <div className="bg-[#1B254B] rounded-xl p-4">
                      <p className="text-gray-400 text-sm">Top Speed</p>
                      <p className="text-white font-bold">{selectedCar.stats.topSpeed}</p>
                    </div>
                    <div className="bg-[#1B254B] rounded-xl p-4">
                      <p className="text-gray-400 text-sm">Weight</p>
                      <p className="text-white font-bold">{selectedCar.stats.weight}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Garage; 