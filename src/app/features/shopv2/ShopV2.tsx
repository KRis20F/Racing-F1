import { useAllCars } from "@/app/hooks/useCars";
import { CardList } from './components/card-list';
import { ShopContext, ShopContextProvider } from "./services/shop.context";

export function ShopPage() {

    const { data: cars = [], isLoading: loading } = useAllCars();

    console.log(cars);

    return (
        <main className="mt-[300px]">
            <ShopContextProvider>
                <CardList carList={cars} loading={loading}/>
            </ShopContextProvider>
        </main>
    )
}