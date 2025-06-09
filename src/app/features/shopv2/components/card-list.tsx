import type { MarketplaceCar } from "@/app/api/endpoints/marketplace.endpoints";
import { CarCard } from "./CarCard";
import { useShopContext } from "../services/shop.context";

interface CardListProps {
    carList: MarketplaceCar[];
    loading?: boolean;
}

export function CardList({ carList, loading }: CardListProps) {
    const { cars } = useShopContext();

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={`skeleton-${i}`} className="animate-pulse">
                        <div className="h-48 bg-[#1B254B] rounded-xl mb-4" />
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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car, index) => (
                <div key={`${car.id}-${car.status}-${index}`}>
                    <CarCard car={car} />
                </div>
            ))}
        </div>
    );
}