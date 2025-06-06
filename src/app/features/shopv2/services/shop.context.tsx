import { createContext, useState, type ReactNode } from 'react';
import type { Car } from "@/app/api/endpoints/cars.endpoints";
import { resolveObjectURL } from 'buffer';
import { useMarketplace } from '@/app/hooks/useMarketplace';

type ShopContextType = {
    handleBuy: (car: Car) => void;
    cars: Car[];
    setCars: React.Dispatch<React.SetStateAction<Car[]>>;
}

export const ShopContext = createContext<ShopContextType>({
    handleBuy: (car: Car) => car,
    cars: [],
    setCars: () => { },
});

export function ShopContextProvider({ children }: { children: ReactNode }) {



    const [cars, setCars] = useState<Car[]>([]);

    const {
        listings,
        isLoadingListings,
        sellCar,
        buyCar,
        isSellingCar,
        isBuyingCar
    } = useMarketplace();




    const handleBuy = async (car: Car) => {
        const userString = localStorage.getItem('user');

        if (!userString) {
            console.error("El usuario no está en el localStorage");
            return;
        }

        const currentUser = JSON.parse(userString);

        if (typeof currentUser.id !== 'number') {
            console.error("El id del usuario no es un número válido");
            return;
        }

        try {
            await buyCar({
                listingId: car.id,
                buyerId: currentUser.id
            });

            setCars((prevCars) => prevCars.filter((carItem) =>  carItem.id !== car.id))

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <ShopContext.Provider value={{ handleBuy, cars, setCars }}>
            {children}
        </ShopContext.Provider>
    );
}