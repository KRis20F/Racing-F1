import { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, PerspectiveCamera } from '@react-three/drei';
import { useUserData } from '../../../hooks/useUserData';
import { CarModel } from '../../../UI/CarModel/index';
import type { Car } from '../../../types/api/auth.types';
import { Skeleton, SkeletonGroup, CardSkeleton } from '../../../UI/Skeleton';

const LoadingScreen = () => (
  <Html center>
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-indigo-400 text-lg">Loading Model...</p>
    </div>
  </Html>
);

const ErrorScreen = ({ message }: { message: string }) => (
  <Html center>
    <div className="text-center">
      <div className="text-red-500 bg-black/50 p-4 rounded-lg">
        {message}
      </div>
    </div>
  </Html>
);

export const Garage = () => {
  const { profile, isLoading: isProfileLoading } = useUserData();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Set first car as selected when profile loads
  useEffect(() => {
    if (profile?.cars && profile.cars.length > 0 && !selectedCar) {
      setSelectedCar(profile.cars[0]);
    }
  }, [profile?.cars, selectedCar]);

  if (isProfileLoading) {
    return (
      <div className="min-h-screen bg-[#0B1437] p-8">
        <SkeletonGroup>
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 text-white/80 mb-4">
            <Skeleton variant="text" className="h-4 w-24" />
            <Skeleton variant="text" className="h-4 w-4" />
            <Skeleton variant="text" className="h-4 w-20" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Car List Skeleton */}
            <div className="lg:col-span-1 space-y-4">
              {[1,2,3].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
            {/* 3D Viewer Skeleton + Car Details Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              <Skeleton variant="rectangular" className="w-full h-[400px] rounded-2xl" animation="wave" />
              <CardSkeleton />
            </div>
          </div>
        </SkeletonGroup>
      </div>
    );
  }

  const userCars = profile?.cars || [];

  return (
    <div className="min-h-screen bg-[#0B1437] p-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-white/80 mb-4">
        <span>Páginas</span>
        <span>/</span>
        <span>Garage</span>
      </div>

      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Car List */}
        <div className="lg:col-span-1 space-y-4">
          {userCars.map((car) => (
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
                  <p className="text-gray-400 text-sm">{car.category}</p>
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

          {userCars.length === 0 && (
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
          <div className="bg-[#111C44] rounded-2xl overflow-hidden" style={{ height: '400px' }}>
            {selectedCar ? (
              <Canvas
                shadows
                dpr={[1, 2]}
                gl={{ 
                  antialias: true,
                  preserveDrawingBuffer: true,
                  powerPreference: "high-performance"
                }}
                onError={(e) => setError(e instanceof Error ? e.message : 'Failed to load 3D model')}
              >
                <color attach="background" args={['#111C44']} />
                <PerspectiveCamera makeDefault position={[4, 2, 5]} fov={50} />
                <ambientLight intensity={0.8} />
                <spotLight
                  position={[10, 10, 10]}
                  angle={0.15}
                  penumbra={1}
                  intensity={1}
                  castShadow
                />
                <Suspense fallback={<LoadingScreen />}>
                  {error ? (
                    <ErrorScreen message={error} />
                  ) : (
                    <CarModel 
                      modelPath={selectedCar.modelPath}
                      scale={130}
                      position={[0, -0.35, 0]}
                      rotation={[0, Math.PI / 4, 0]}
                    />
                  )}
                </Suspense>
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  enableRotate={true}
                  autoRotate={isHovered}
                  autoRotateSpeed={4}
                  makeDefault
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 2}
                />
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
                {selectedCar.specs && (
                  <>
                    <div className="bg-[#1B254B] rounded-xl p-4">
                      <p className="text-gray-400 text-sm">Power</p>
                      <p className="text-white font-bold">{selectedCar.specs.power}</p>
                    </div>
                    <div className="bg-[#1B254B] rounded-xl p-4">
                      <p className="text-gray-400 text-sm">Top Speed</p>
                      <p className="text-white font-bold">{selectedCar.specs.topSpeed}</p>
                    </div>
                    <div className="bg-[#1B254B] rounded-xl p-4">
                      <p className="text-gray-400 text-sm">Acceleration</p>
                      <p className="text-white font-bold">{selectedCar.specs.acceleration}</p>
                    </div>
                    <div className="bg-[#1B254B] rounded-xl p-4">
                      <p className="text-gray-400 text-sm">Weight</p>
                      <p className="text-white font-bold">{selectedCar.specs.weight}</p>
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