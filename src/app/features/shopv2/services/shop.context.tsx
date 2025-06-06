import { createContext, useState, type ReactNode } from 'react';
import type { Car } from "@/app/api/endpoints/cars.endpoints";
import { resolveObjectURL } from 'buffer';

type ShopContextType = {
    buyCar: (car: Car) => void;
    cars: Car[];
    setCars: React.Dispatch<React.SetStateAction<Car[]>>;
}

export const ShopContext = createContext<ShopContextType>({
    buyCar: (car: Car) => car,
    cars: [],
    setCars: () => { },
});

export function ShopContextProvider({ children }: { children: ReactNode }) {


    const [cars, setCars] = useState<Car[]>([]);


    const buyCar = (car: Car) => {

        let userInfo = localStorage.getItem('user');

        if (!userInfo) {
            console.error("El usuario no esta en el localStorage");
            return;
        }

        userInfo = JSON.parse(userInfo);
        
    };


    return (
        <ShopContext.Provider value={{ buyCar, cars, setCars }}>
            {children}
        </ShopContext.Provider>
    );
}