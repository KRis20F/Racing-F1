import { type Car } from '../../../api/endpoints/cars.endpoints';
import { CarCard } from './CarCard';

export interface CarListProps {
    carList: Car[];
    loading: boolean;
}


export function CardList({ carList, loading }: CarListProps) {


    return (<div className='flex gap-1'>
        {
            loading ? (
                <p>Loading...</p>

            ) : (
                carList.map((car) => (
                    <CarCard key={car.id} car={car}/>
                ))
            )
        }
    </div>)
}