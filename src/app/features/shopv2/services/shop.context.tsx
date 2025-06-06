import { createContext, type ReactNode } from 'react';
import type { Car } from "@/app/api/endpoints/cars.endpoints";

type ShopContextType = {
    buyCar: (car: Car) => void;
}

export const ShopContext = createContext<ShopContextType>({
    buyCar: (car: Car) => car
});

export function ShopContextProvider({ children }: { children: ReactNode }) {


    const buyCar = (car: Car) => {
        console.log(car);
    };

    const getUserInfo = () => {
        console.log();
    }


    return (
        <ShopContext.Provider value={{ buyCar }}>
            {children}
        </ShopContext.Provider>
    );
}