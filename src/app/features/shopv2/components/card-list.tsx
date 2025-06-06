import { useContext } from 'react';
import { CarCard } from './CarCard';
import { ShopContext } from '../services/shop.context';

export interface CarListProps {
    loading: boolean;
}


export function CardList({ loading }: CarListProps) {

    const { cars } = useContext(ShopContext);

    return (<div className='flex gap-1'>
        {
            loading ? (
                <p>Loading...</p>

            ) : (
                cars.map((car) => (
                    <CarCard key={car.id} car={car}/>
                ))
            )
        }
    </div>)
}