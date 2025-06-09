import type { MarketplaceCar } from "@/app/api/endpoints/marketplace.endpoints";
import { useContext, useState, Suspense } from "react";
import { ShopContext } from "../services/shop.context";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CarModel } from "@/app/UI/CarModel";
import { CAR_MODELS_CONFIG } from "../config/carModels.config";

interface CardCardProps {
    car: MarketplaceCar;
}

function ModelError() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1B254B]">
            <p className="text-red-500">Error al cargar el modelo</p>
        </div>
    );
}

export function CarCard({ car }: CardCardProps) {
    const { buyCar, isLoading, error } = useContext(ShopContext);
    const [modelError, setModelError] = useState(false);
    const [buying, setBuying] = useState(false);

    const getModelName = (path: string) => {
        const matches = path.toLowerCase().match(/([^/]+)\.glb$/);
        return matches ? matches[1] : 'default';
    };

    const modelName = car.model_path ? getModelName(car.model_path) : 'default';
    const modelConfig = CAR_MODELS_CONFIG[modelName] || CAR_MODELS_CONFIG.default;
    const isAvailable = car.market_status?.trim().toLowerCase() === 'en_venta';

    // Manejo robusto de compra con feedback
    const handleBuy = async () => {
        if (!isAvailable) return;
        setBuying(true);
        try {
            await buyCar(car);
            // Mostrar algo de sucess
            console.log("Compra realizada con éxito")
            
        } catch (e: any) {
            // Mostrar algo de error

            console.error(e)
        } finally {
            setBuying(false);
        }
    };


    return (
        <div className="p-5 bg-[#111C44] rounded-xl text-white hover:bg-[#1A275B] transition-colors">
            <div className="h-48 bg-[#1B254B] rounded-xl mb-4 overflow-hidden relative">
                {car.model_path && !modelError ? (
                    <Canvas
                        camera={{ 
                            position: modelConfig.cameraPosition, 
                            fov: modelConfig.fov,
                            near: 0.1,
                            far: 1000
                        }}
                        gl={{ 
                            preserveDrawingBuffer: true,
                            antialias: true,
                            alpha: true
                        }}
                        onError={() => setModelError(true)}
                    >
                        <color attach="background" args={['#1B254B']} />
                        <Suspense fallback={null}>
                            <ambientLight intensity={2} />
                            <directionalLight
                                position={[5, 5, 5]}
                                intensity={2}
                                castShadow
                            />
                            <directionalLight
                                position={[-5, 3, -5]}
                                intensity={1.5}
                                castShadow
                            />
                            <pointLight position={[10, 0, 0]} intensity={1.5} />
                            <pointLight position={[-10, 0, 0]} intensity={1.5} />
                            <spotLight
                                position={[0, 10, 0]}
                                angle={0.5}
                                penumbra={1}
                                intensity={2}
                                castShadow
                            />

                            <CarModel
                                modelPath={car.model_path.toLowerCase()}
                                scale={modelConfig.scale}
                                position={modelConfig.position}
                                rotation={modelConfig.rotation}
                            />
                            
                            <OrbitControls
                                enableZoom={false}
                                maxPolarAngle={Math.PI / 1.5}
                                minPolarAngle={Math.PI / 3}
                                autoRotate={true}
                                autoRotateSpeed={1.5}
                            />
                        </Suspense>
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
                {modelError && <ModelError />}
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
                        Estado: {car.market_status === 'en_venta' ? 'Disponible' : 'No disponible'}
                    </p>
                </div>
                <button 
                    className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                        !isAvailable
                            ? 'bg-purple-600/50 cursor-not-allowed' 
                            : buying ? 'bg-purple-600/70' : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                    onClick={handleBuy}
                    disabled={!isAvailable || buying}
                >
                    {buying ? 'Comprando...' : 'Comprar'}
                </button>
            </div>
        </div>
    );
}