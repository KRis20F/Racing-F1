import type { MarketplaceCar } from "@/app/api/endpoints/marketplace.endpoints";
import { CarCard } from "./CarCard";
import { motion } from "framer-motion";

interface CardListProps {
    carList: MarketplaceCar[];
    loading?: boolean;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export function CardList({ carList, loading }: CardListProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={`skeleton-${i}`} className="animate-pulse">
                        <div className="h-56 bg-[#1B254B] rounded-xl mb-4" />
                        <div className="h-6 bg-[#1B254B] rounded w-3/4 mb-2" />
                        <div className="h-4 bg-[#1B254B] rounded w-1/2 mb-4" />
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {[1, 2, 3, 4].map((j) => (
                                <div key={`skeleton-${i}-spec-${j}`}>
                                    <div className="h-3 bg-[#1B254B] rounded w-1/2 mb-1" />
                                    <div className="h-4 bg-[#1B254B] rounded w-3/4" />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="h-3 bg-[#1B254B] rounded w-16 mb-1" />
                                <div className="h-6 bg-[#1B254B] rounded w-24" />
                            </div>
                            <div className="h-10 bg-[#1B254B] rounded w-24" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!carList.length) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl font-bold text-white mb-2">No hay autos disponibles</h3>
                <p className="text-gray-400">Vuelve más tarde para ver nuevos autos en venta</p>
            </div>
        );
    }

    // Eliminar autos duplicados por key compuesta antes de renderizar
    const seen = new Set();
    const uniqueCars = carList.filter(car => {
        const k = `car-${car.id}-${car.market_status}-${car.model_path || car.name}-${car.price}`;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
    });

    return (
        <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-12"
        >
            {uniqueCars.map((car) => {
                const uniqueKey = `car-${car.id}-${car.market_status}-${car.model_path || car.name}-${car.price}`;
                return (
                    <motion.div
                        key={uniqueKey}
                        variants={item}
                        className="transform hover:scale-[1.02] transition-transform duration-300"
                    >
                        <CarCard car={car} />
                    </motion.div>
                );
            })}
        </motion.div>
    );
}