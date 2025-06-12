import { useQuery } from '@tanstack/react-query';
import { marketplaceEndpoints } from '@/app/api/endpoints/marketplace.endpoints';
import { CardList } from './components/card-list';
import { ShopContextProvider } from "./services/shop.context";
import Navbar from '../../UI/Navbar';
import { useState } from 'react';
import { FaCar, FaTrophy, FaRocket, FaHistory, FaSearch } from 'react-icons/fa';
import { GiMuscularTorso, GiF1Car, GiRaceCar } from 'react-icons/gi';
import { carsEndpoints } from '@/app/api/endpoints/cars.endpoints';

const categories = [
    { id: 'all', name: 'Todos', icon: FaCar },
    { id: 'muscle', name: 'Muscle Cars', icon: GiMuscularTorso },
    { id: 'f1', name: 'Formula 1', icon: GiF1Car },
    { id: 'sport', name: 'Sport Cars', icon: GiRaceCar },
    { id: 'super', name: 'Superautos', icon: FaRocket }
];

// Mapeo de iconos y nombres bonitos para cada categoría
const categoryDisplay: Record<string, { label: string; icon: JSX.Element }> = {
    muscle: { label: 'Muscle Cars', icon: <GiMuscularTorso className="text-[#f87171] text-2xl mx-auto mb-2" /> },
    formula: { label: 'F1 Cars', icon: <GiF1Car className="text-[#60a5fa] text-2xl mx-auto mb-2" /> },
    f1: { label: 'F1 Cars', icon: <GiF1Car className="text-[#60a5fa] text-2xl mx-auto mb-2" /> },
    super: { label: 'Superautos', icon: <FaRocket className="text-[#34d399] text-2xl mx-auto mb-2" /> },
    supercar: { label: 'Superautos', icon: <FaRocket className="text-[#34d399] text-2xl mx-auto mb-2" /> },
    sports: { label: 'Sports', icon: <GiRaceCar className="text-[#a78bfa] text-2xl mx-auto mb-2" /> },
    racing: { label: 'Racing', icon: <GiRaceCar className="text-[#fbbf24] text-2xl mx-auto mb-2" /> },
    clásico: { label: 'Clásicos', icon: <FaHistory className="text-[#a78bfa] text-2xl mx-auto mb-2" /> },
    clasico: { label: 'Clásicos', icon: <FaHistory className="text-[#a78bfa] text-2xl mx-auto mb-2" /> },
    classic: { label: 'Clásicos', icon: <FaHistory className="text-[#a78bfa] text-2xl mx-auto mb-2" /> },
};

export function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const { data: cars = [], isLoading: loading } = useQuery({
        queryKey: ['marketplace'],
        queryFn: marketplaceEndpoints.getListings
    });

    const { data: categoryCountsData = [] } = useQuery({
        queryKey: ['category-counts'],
        queryFn: carsEndpoints.getCategoryCounts
    });

    // Mapear los conteos a un objeto para fácil acceso
    const categoryCounts = categoryCountsData.reduce((acc, item) => {
        acc[item.category.toLowerCase()] = item.count;
        return acc;
    }, {} as Record<string, number>);

    const premiumCount = cars.length;

    // Filtrado de autos por categoría y búsqueda
    const filteredCars = cars.filter(car => {
        // Filtrado por categoría
        let matchesCategory = true;
        if (selectedCategory !== 'all') {
            const cat = (car.category || '').toLowerCase();
            if (selectedCategory === 'muscle') matchesCategory = cat.includes('muscle');
            else if (selectedCategory === 'f1') matchesCategory = cat.includes('formula') || cat.includes('f1');
            else if (selectedCategory === 'sport') matchesCategory = cat.includes('sport');
            else if (selectedCategory === 'super') matchesCategory = cat.includes('super');
            else matchesCategory = false;
        }

        // Filtrado por búsqueda
        const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (car.category || '').toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // Log de categorías para debug
    console.log('Respuesta completa categoryCountsData:', categoryCountsData);
    console.log('Categorías recibidas:', categoryCountsData.map(c => c.category));

    return (
        <div className="flex flex-col">
            <Navbar>
                <main className="min-h-screen pt-0 bg-[#0B1437]">
                    {/* Video Hero Header */}
                    <div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
                        <video 
                            autoPlay 
                            loop 
                            muted 
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-40"
                        >
                            <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1437]/90 via-[#0B1437]/70 to-[#0B1437]" />
                        
                        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                                Racing F1 Shop
                                <span className="block text-[#4318FF] text-2xl md:text-3xl mt-2">Colección Premium</span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                                Explora nuestra colección exclusiva de autos de alto rendimiento y domina las pistas
                            </p>
                            
                            {/* Barra de búsqueda */}
                            <div className="relative max-w-xl mx-auto">
                                <input 
                                    type="text"
                                    placeholder="Buscar auto..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/10 border-2 border-[#4318FF]/30 rounded-full py-3 px-6 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-[#4318FF] transition-colors"
                                />
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" />
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
                        {/* Categorías con iconos */}
                        <div className="flex flex-wrap gap-4 mb-12 justify-center">
                            {categories.map((category) => {
                                const Icon = category.icon;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`group flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                                            selectedCategory === category.id
                                                ? 'bg-[#4318FF] text-white shadow-lg shadow-[#4318FF]/50'
                                                : 'bg-[#1B254B] text-white/70 hover:bg-[#4318FF]/20'
                                        }`}
                                    >
                                        <Icon className={`text-xl transition-colors ${
                                            selectedCategory === category.id ? 'text-white' : 'text-[#4318FF] group-hover:text-white'
                                        }`} />
                                        {category.name}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Stats rápidos */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            {/* Autos Premium siempre visible */}
                            <div className="bg-[#1B254B] rounded-xl p-4 text-center">
                                <FaTrophy className="text-[#facc15] text-2xl mx-auto mb-2" />
                                <p className="text-white/70 text-sm">Autos Premium</p>
                                <p className="text-2xl font-bold text-white">{premiumCount}</p>
                            </div>
                            {/* Tarjetas dinámicas por categoría, con fallback, aunque count sea 0 */}
                            {categoryCountsData.length === 0 && (
                                <div className="col-span-3 text-center text-white/60 py-4">No hay categorías disponibles desde el backend.</div>
                            )}
                            {Object.entries(categoryCounts).map(([cat, count]) => {
                                const key = cat.toLowerCase();
                                const display = categoryDisplay[key];
                                if (display) {
                                    return (
                                        <div key={cat} className="bg-[#1B254B] rounded-xl p-4 text-center">
                                            {display.icon}
                                            <p className="text-white/70 text-sm">{display.label}</p>
                                            <p className="text-2xl font-bold text-white">{count}</p>
                                        </div>
                                    );
                                }
                                // Fallback visual para categorías no mapeadas
                                return (
                                    <div key={cat} className="bg-[#1B254B] rounded-xl p-4 text-center">
                                        <FaCar className="text-[#4318FF] text-2xl mx-auto mb-2" />
                                        <p className="text-white/70 text-sm">{cat.charAt(0).toUpperCase() + cat.slice(1)}</p>
                                        <p className="text-2xl font-bold text-white">{count}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <ShopContextProvider>
                            <CardList carList={filteredCars} loading={loading}/>
                        </ShopContextProvider>
                    </div>
                </main>
            </Navbar>
        </div>
    );
}