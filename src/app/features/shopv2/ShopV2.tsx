import { useAllCars } from "@/app/hooks/useCars";
import { CardList } from './components/card-list';
import { useContext, useEffect } from "react";
import { ShopContext } from "./services/shop.context";

export function ShopPage() {
    const { data: cars = [], isLoading: loading } = useAllCars();
    const { cars: contextCars, setCars } = useContext(ShopContext);

    useEffect(() => {
        if (JSON.stringify(cars) !== JSON.stringify(contextCars)) {
            setCars(cars);
        }
    }, [cars, contextCars, setCars]);

    return (
        <main className="mt-[300px]">
            <CardList loading={loading} />
        </main>
    );
}
