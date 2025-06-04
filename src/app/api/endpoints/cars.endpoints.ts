import { api } from '../api.config';

// Tipos
export interface Car {
  id: string;
  name: string;
  category: string;
  price: number;
  modelPath: string;
  description: string;
  specs: {
    power: string;
    acceleration: string;
    topSpeed: string;
    weight: string;
  };
}

// Endpoints
export const carsEndpoints = {
  // Obtener todos los coches
  getAllCars: async (): Promise<Car[]> => {
    const response = await api.get('/api/cars');
    return response.data;
  },

  // Obtener coches por categoría
  getCarsByCategory: async (category: string): Promise<Car[]> => {
    const response = await api.get(`/api/cars/category/${category}`);
    return response.data;
  },

  // Obtener coche por ID
  getCarById: async (id: string): Promise<Car> => {
    const response = await api.get(`/api/cars/${id}`);
    return response.data;
  },

  // Obtener coches del usuario (garage)
  getUserCars: async (userId: string): Promise<Car[]> => {
    const response = await api.get(`/api/cars/user/${userId}`);
    return response.data;
  }
}; 