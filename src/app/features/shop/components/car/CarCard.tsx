import { useState, useCallback, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { CarModel } from './CarModel';
import { StatBar } from './StatBar';
import { CarCardProps } from '../types';

export const CarCard: React.FC<CarCardProps> = memo(({ car, onAddToCart, onAddToWishlist, isInWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const getStatValue = useCallback((stat: string, type: 'power' | 'speed' | 'acceleration' | 'weight') => {
    const value = stat.match(/\d+/)?.[0];
    if (!value) return 0;
    
    const baseValues = {
      power: 1000,
      speed: 220,
      acceleration: 2.5,
      weight: 1500
    };
    
    switch (type) {
      case 'power':
        return (parseInt(value) / baseValues.power) * 100;
      case 'speed':
        return (parseInt(value) / baseValues.speed) * 100;
      case 'acceleration':
        const accValue = parseFloat(value);
        return ((baseValues.acceleration * 2 - accValue) / baseValues.acceleration) * 50;
      case 'weight':
        return ((baseValues.weight * 2 - parseInt(value)) / baseValues.weight) * 50;
      default:
        return 0;
    }
  }, []);

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-64">
        <Canvas
          shadows={false}
          dpr={[1, 2]}
          camera={{ position: car.cameraPosition, fov: car.fov }}
          performance={{ min: 0.5 }}
        >
          <Stage
            environment="city"
            intensity={0.6}
            contactShadow={false}
            shadowBias={-0.001}
          >
            <CarModel car={car} />
          </Stage>
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={isHovered}
            autoRotate={isHovered}
            autoRotateSpeed={4}
            makeDefault
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold">{car.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{car.category}</p>
          </div>
          <button
            onClick={() => onAddToWishlist(car)}
            className="text-2xl text-gray-400 hover:text-red-500 transition-colors"
          >
            {isInWishlist ? '❤️' : '🤍'}
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6">{car.description}</p>

        <div className="space-y-4">
          <StatBar label="Power" value={getStatValue(car.specs.power, 'power')} />
          <StatBar label="Speed" value={getStatValue(car.specs.topSpeed, 'speed')} />
          <StatBar label="Acceleration" value={getStatValue(car.specs.acceleration, 'acceleration')} />
          <StatBar label="Weight" value={getStatValue(car.specs.weight, 'weight')} />
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-2xl font-bold">${car.price.toLocaleString()}</span>
          <button
            onClick={() => onAddToCart(car)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}); 