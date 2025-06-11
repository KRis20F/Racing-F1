import { useQuery } from '@tanstack/react-query';
import { marketplaceEndpoints } from '@/app/api/endpoints/marketplace.endpoints';
import { CardList } from './components/card-list';
import { ShopContextProvider } from "./services/shop.context";
import Navbar from '../../UI/Navbar';

export function ShopPage() {
    const { data: cars = [], isLoading: loading } = useQuery({
        queryKey: ['marketplace'],
        queryFn: marketplaceEndpoints.getListings
    });

    return (
        <div className="flex flex-col">
            <Navbar>
                <main className="min-h-screen pt-36 bg-[#0B1437] p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-white/80 mb-6">
                            <span>Páginas</span>
                            <span>/</span>
                            <span>Tienda</span>
                        </div>

                        <ShopContextProvider>
                            <CardList carList={cars} loading={loading}/>
                        </ShopContextProvider>
                    </div>
                </main>
            </Navbar>
        </div>
    );
}