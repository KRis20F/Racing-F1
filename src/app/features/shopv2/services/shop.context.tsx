import { createContext, type ReactNode } from 'react';
import type { MarketplaceCar } from '@/app/api/endpoints/marketplace.endpoints';
import { shopEndpoints } from '@/app/api/endpoints/shop.endpoints';
import { useUserData } from '@/app/hooks/useUserData';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ShopContextType = {
    buyCar: (car: MarketplaceCar) => void;
    isLoading: boolean;
    error: Error | null;
}

export const ShopContext = createContext<ShopContextType>({
    buyCar: () => {},
    isLoading: false,
    error: null
});



export function ShopContextProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();
    const { profile } = useUserData();

    const { mutate: buyCarMutation, isPending: isLoading, error } = useMutation({
        mutationFn: async (car: MarketplaceCar) => {
            if (!profile?.id) throw new Error('Usuario no autenticado');
            if (car.market_status !== 'en_venta') throw new Error('Este auto no está disponible');
            
            return shopEndpoints.buyCar({
                carId: car.id
            });
        },
        onSuccess: () => {
            // Invalidar queries para refrescar los datos
            queryClient.invalidateQueries({ queryKey: ['marketplace'] });
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        }
    });

    const buyCar = (car: MarketplaceCar) => {
        buyCarMutation(car);
    };

    return (
        <ShopContext.Provider value={{ buyCar, isLoading, error: error as Error | null }}>
            {children}
        </ShopContext.Provider>
    );
}