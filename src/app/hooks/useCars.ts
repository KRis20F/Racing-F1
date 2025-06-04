import { useQuery } from '@tanstack/react-query';
import { carsEndpoints, type Car } from '../api/endpoints/cars.endpoints';

// Hook para obtener todos los coches
export const useAllCars = () => {
  return useQuery<Car[]>({
    queryKey: ['cars'],
    queryFn: carsEndpoints.getAllCars
  });
};

// Hook para obtener coches por categoría
export const useCarsByCategory = (category: string) => {
  return useQuery<Car[]>({
    queryKey: ['cars', 'category', category],
    queryFn: () => carsEndpoints.getCarsByCategory(category),
    enabled: !!category
  });
};

// Hook para obtener un coche por ID
export const useCarById = (id: string) => {
  return useQuery<Car>({
    queryKey: ['cars', 'id', id],
    queryFn: () => carsEndpoints.getCarById(id),
    enabled: !!id
  });
};

// Hook para obtener los coches del usuario
export const useUserCars = (userId: string) => {
  return useQuery<Car[]>({
    queryKey: ['cars', 'user', userId],
    queryFn: () => carsEndpoints.getUserCars(userId),
    enabled: !!userId
  });
}; 