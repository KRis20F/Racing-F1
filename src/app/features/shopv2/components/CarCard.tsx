import type { MarketplaceCar } from "@/app/api/endpoints/marketplace.endpoints";
import { useContext, useState, Suspense } from "react";
import { ShopContext } from "../services/shop.context";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CarModel } from "@/app/UI/CarModel/index";
import { CAR_MODELS_CONFIG } from "../config/carModels.config";
import { useUserData } from "@/app/hooks/useUserData";
import Popup from "@/app/UI/Popup";
import { FaTachometerAlt, FaBolt, FaRoad, FaCogs } from 'react-icons/fa';

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

// Skill bar visual
function CarSkillBar({ label, value, max, icon, color }: { label: string; value: number; max: number; icon: JSX.Element; color: string }) {
    const percent = Math.min(100, Math.round((value / max) * 100));
    return (
        <div className="mb-2">
            <div className="flex items-center mb-1">
                <span className="mr-2 text-lg">{icon}</span>
                <span className="text-xs text-gray-300 w-24">{label}</span>
                <span className="ml-auto text-xs font-bold text-white">{value}</span>
            </div>
            <div className="w-full h-2 bg-[#222B4B] rounded-full overflow-hidden">
                <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percent}%`, background: color }}
                ></div>
            </div>
        </div>
    );
}

export function CarCard({ car }: CardCardProps) {
    const { buyCar } = useContext(ShopContext);
    const { finances } = useUserData();
    const [modelError, setModelError] = useState(false);
    const [buying, setBuying] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupConfig, setPopupConfig] = useState<{
        type: 'success' | 'error' | 'info';
        title: string;
        message: string;
    }>({ type: 'info', title: '', message: '' });

    const getModelName = (path: string) => {
        const matches = path.toLowerCase().match(/([^/]+)\.glb$/);
        return matches ? matches[1] : 'default';
    };

    const modelName = car.model_path ? getModelName(car.model_path) : 'default';
    const modelConfig = CAR_MODELS_CONFIG[modelName] || CAR_MODELS_CONFIG.default;
    const isAvailable = car.market_status?.trim().toLowerCase() === 'en_venta';
    const userBalance = Number(finances?.tokenBalance || 0);
    const carPrice = Number(car.current_price || 0);
    const hasEnoughBalance = userBalance >= carPrice;

    // Manejo robusto de compra con feedback
    const handleBuy = async () => {
        if (!isAvailable) return;
        if (!hasEnoughBalance) {
            setPopupConfig({
                type: 'error',
                title: 'Saldo insuficiente',
                message: `No tienes suficientes RCT para comprar este auto.`
            });
            setShowPopup(true);
            return;
        }

        setBuying(true);
        try {
            await buyCar(car);
            setPopupConfig({
                type: 'success',
                title: 'Compra exitosa',
                message: `Has gastado ${car.current_price} RCT en ${car.name}.`
            });
            setShowPopup(true);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Ha ocurrido un error al procesar la compra.';
            setPopupConfig({
                type: 'error',
                title: 'Error en la compra',
                message: errorMessage
            });
            setShowPopup(true);
        } finally {
            setBuying(false);
        }
    };

    return (
        <>
            <div className="p-5 bg-gradient-to-br from-[#111C44] via-[#1B254B] to-[#4318FF]/30 rounded-2xl text-white shadow-2xl border border-[#4318FF]/40 hover:shadow-[0_0_32px_4px_#4318FF55] hover:border-[#4318FF] transition-all duration-300 group relative max-w-xl mx-auto">
                <div className="h-56 bg-[#1B254B] rounded-xl mb-4 overflow-hidden relative border border-[#4318FF]/20 group-hover:border-[#4318FF]/60 transition-all">
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

                <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                        <h3 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-lg">{car.name}</h3>
                        <p className="text-[#a3aed0] text-sm font-medium">{car.category}</p>
                    </div>
                    <div className="text-right md:text-left">
                        <span className="block text-xs text-gray-400">Precio</span>
                        <span className="text-2xl font-bold text-[#facc15] drop-shadow">{car.current_price} RCT</span>
                    </div>
                </div>
                {/* Skills visuales estilo Need for Speed */}
                <div className="mb-6">
                    <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">Skills</p>
                    <div className="space-y-2">
                        <CarSkillBar label="Potencia" value={parseInt(car.specs.power)} max={1000} icon={<FaBolt />} color="#facc15" />
                        <CarSkillBar label="Velocidad" value={parseInt(car.specs.topSpeed)} max={400} icon={<FaTachometerAlt />} color="#60a5fa" />
                        <CarSkillBar label="Aceleración" value={parseFloat(car.specs.acceleration)} max={10} icon={<FaRoad />} color="#34d399" />
                        <CarSkillBar label="Manejo" value={Number.isNaN(parseInt(car.specs.handling)) ? 80 : parseInt(car.specs.handling)} max={100} icon={<FaCogs />} color="#a78bfa" />
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <p className="text-xs text-gray-400 mb-1 line-clamp-2 min-h-[32px]">{car.description}</p>
                    <button 
                        className={`px-6 py-2 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 border-2 border-[#4318FF] bg-[#4318FF] hover:bg-[#634fff] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#facc15] focus:ring-offset-2 ${
                            !isAvailable
                                ? 'bg-purple-600/50 border-purple-600/50 cursor-not-allowed' 
                                : buying ? 'bg-purple-600/70 border-purple-600/70' : ''
                        }`}
                        onClick={handleBuy}
                        disabled={!isAvailable || buying}
                    >
                        {buying ? 'Comprando...' : 'Comprar'}
                    </button>
                </div>
            </div>

            <Popup
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                type={popupConfig.type}
                title={popupConfig.title}
                message={popupConfig.message}
                autoClose={true}
                autoCloseTime={5000}
            />
        </>
    );
}
