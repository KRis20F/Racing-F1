import type { MarketplaceCar } from "@/app/api/endpoints/marketplace.endpoints";
import { useContext, useState } from "react";
import { ShopContext } from "../services/shop.context";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { CarModel } from "@/app/UI/CarModel";

interface CardCardProps {
    car: MarketplaceCar;
}

const DEFAULT_MODEL_PROPS = {
    scale: 100,
    position: [0, -0.35, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    cameraPosition: [2.5, 1.5, 2.5] as [number, number, number],
    fov: 50
};

export function CarCard({ car }: CardCardProps) {
    const { buyCar, isLoading, error } = useContext(ShopContext);
    const [modelError, setModelError] = useState(false);

    return (
        <div className="p-5 bg-[#111C44] rounded-xl text-white hover:bg-[#1A275B] transition-colors">
            {/* Car Preview */}
            <div className="h-48 bg-[#1B254B] rounded-xl mb-4 overflow-hidden relative">
                {car.model_path ? (
                    <Canvas
                        camera={{ position: DEFAULT_MODEL_PROPS.cameraPosition, fov: DEFAULT_MODEL_PROPS.fov }}
                        gl={{ preserveDrawingBuffer: true }}
                        onError={() => setModelError(true)}
                    >
                        <color attach="background" args={['#1B254B']} />
                        {!modelError ? (
                            <>
                                <group>
                                    <CarModel
                                        modelPath={car.model_path}
                                        scale={DEFAULT_MODEL_PROPS.scale}
                                        position={DEFAULT_MODEL_PROPS.position}
                                        rotation={DEFAULT_MODEL_PROPS.rotation}
                                    />
                                    <ambientLight intensity={1} />
                                    <spotLight
                                        position={[10, 10, 10]}
                                        angle={0.15}
                                        penumbra={1}
                                        intensity={1.5}
                                    />
                                    <pointLight position={[-10, -10, -10]} intensity={0.8} />
                                </group>
                                <OrbitControls
                                    enableZoom={false}
                                    maxPolarAngle={Math.PI / 2}
                                    minPolarAngle={Math.PI / 4}
                                    autoRotate={true}
                                    autoRotateSpeed={2}
                                />
                            </>
                        ) : (
                            <Html center>
                                <div className="text-center">
                                    <p className="text-red-500">Error al cargar el modelo</p>
                                </div>
                            </Html>
                        )}
                    </Canvas>
                ) : car.preview_image ? (
                    <img 
                        src={car.preview_image} 
                        alt={car.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400">Vista previa no disponible</p>
                    </div>
                )}
            </div>

            <div className="mb-4">
                <h3 className="text-xl font-bold">{car.name}</h3>
                <p className="text-gray-400">{car.category}</p>
                <p className="text-sm text-gray-400 mt-2">{car.description}</p>
            </div>
            
            <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Especificaciones:</p>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <p className="text-sm text-gray-400">Potencia</p>
                        <p className="font-medium">{car.specs.power}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Velocidad Máx.</p>
                        <p className="font-medium">{car.specs.topSpeed}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Aceleración</p>
                        <p className="font-medium">{car.specs.acceleration}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Peso</p>
                        <p className="font-medium">{car.specs.weight}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-400">Precio</p>
                    <p className="text-xl font-bold">{car.current_price} RCT</p>
                    <p className="text-sm text-gray-400">
                        Estado: {car.market_status === 'available' ? 'Disponible' : 'No disponible'}
                    </p>
                </div>
                <button 
                    className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                        isLoading || car.market_status !== 'available'
                            ? 'bg-purple-600/50 cursor-not-allowed' 
                            : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                    onClick={() => car.market_status === 'available' && buyCar(car)}
                    disabled={isLoading || car.market_status !== 'available'}
                >
                    {isLoading ? 'Comprando...' : 
                     car.market_status !== 'available' ? 'No disponible' : 
                     'Comprar'}
                </button>
            </div>

            {error && (
                <p className="mt-2 text-sm text-red-500">
                    {error.message}
                </p>
            )}
        </div>
    );
}