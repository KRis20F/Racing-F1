import { api } from '../api.config';

// Tipos
export interface Car {
  id: number; //? Se ha cambiado a number
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

export interface CarStats {
  power: string;
  acceleration: string;
  topSpeed: string;
  weight: string;
}

export interface CarListing {
  id: string;
  carId: string;
  name: string;
  price: number;
  seller: string;
  stats: CarStats;
  modelPath: string;
  modelSize: string;
  modelType: string;
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
  },

  // Obtener listado de coches con modelos 3D
  getCarListings: async (): Promise<{ listings: CarListing[] }> => {
    const response = await api.get('/api/cars/listings');
    return response.data;
  },

  // Obtener lista de modelos 3D disponibles
  getAvailableModels: async (): Promise<{ models: { id: string; filename: string; size: string; type: string; }[] }> => {
    const response = await api.get('/api/cars/models');
    return response.data;
  }
}; 