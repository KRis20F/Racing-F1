import type { CarModel } from '../components/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface CarListing {
  id: string;
  carId: string;
  name: string;
  price: number;
  seller: string;  // category en el backend
  stats: {
    speed: number;
    handling: number;
    acceleration: number;
  };
  modelPath: string;  // model_path en el backend
}

// Los modelos 3D locales para desarrollo
export const carModels: CarModel[] = [
  {
    id: '1',
    name: 'Dodge Charger',
    price: 85000,
    modelPath: `${API_URL}/api/cars/model/dodge_charger_1970_rt`,
    description: 'A powerful American muscle car combining modern performance with classic styling.',
    scale: 5.,
    position: [0, -0.5, 0],
    rotation: [0, Math.PI / 2, 0],
    cameraPosition: [2.5, 1.2, 2.5],
    fov: 50,
    category: 'Muscle',
    specs: {
      power: '485 HP',
      acceleration: '4.3s 0-60 mph',
      topSpeed: '175 mph',
      weight: '4,300 lbs'
    }
  },
  {
    id: '2',
    name: 'Formula 1 Generic',
    price: 2000000,
    modelPath: `${API_URL}/api/cars/model/formula_1_generico_modelo_exemplo`,
    description: 'Experience the pinnacle of motorsport with this F1 racing machine.',
    scale: 2.0,
    position: [0, -1, 0],
    rotation: [0, Math.PI / 3, 0],
    cameraPosition: [4, 2, 5],
    fov: 45,
    category: 'Formula',
    specs: {
      power: '1,000 HP',
      acceleration: '2.6s 0-60 mph',
      topSpeed: '220 mph',
      weight: '1,752 lbs'
    }
  },
  {
    id: '3',
    name: '2022 Porsche 911 GT3',
    price: 180000,
    modelPath: `${API_URL}/api/cars/model/2022_porsche_911_gt3_992`,
    description: 'German engineering at its finest, built for both track and road.',
    scale: 120.0,
    position: [0, -1, 0],
    rotation: [0, Math.PI / 3, 0],
    cameraPosition: [4, 2, 5],
    fov: 45,
    category: 'Sports',
    specs: {
      power: '502 HP',
      acceleration: '3.2s 0-60 mph',
      topSpeed: '197 mph',
      weight: '3,126 lbs'
    }
  },
  {
    id: '4',
    name: 'BMW M3 E46 GTR',
    price: 120000,
    modelPath: `${API_URL}/api/cars/model/bmw_m3_e46_gtr`,
    description: 'A legendary racing icon that dominated motorsports.',
    scale: 40.0,
    position: [0, -1, 0],
    rotation: [0, Math.PI / 3, 0],
    cameraPosition: [3, 1, 5],
    fov: 60,
    category: 'Racing',
    specs: {
      power: '444 HP',
      acceleration: '3.8s 0-60 mph',
      topSpeed: '185 mph',
      weight: '2,976 lbs'
    }
  },
  {
    id: '5',
    name: '2022 Lamborghini Huracán Super Trofeo EVO2',
    price: 250000,
    modelPath: `${API_URL}/api/cars/model/2022_lamborghini_huracan_super_trofeo_evo2_carb`,
    description: 'Italian racing excellence, designed for pure performance.',
    scale: 120.0,
    position: [0, -1, 0],
    rotation: [0, Math.PI / 3, 0],
    cameraPosition: [4, 2, 5],
    fov: 45,
    category: 'Super',
    specs: {
      power: '620 HP',
      acceleration: '2.9s 0-60 mph',
      topSpeed: '202 mph',
      weight: '2,866 lbs'
    }
  },
  {
    id: '6',
    name: '2011 Mosler Super GT',
    price: 150000,
    modelPath: `${API_URL}/api/cars/model/2011_mosler_super_gt`,
    description: 'An exotic supercar built for ultimate speed and handling.',
    scale: 120.0,
    position: [0, -1, 0],
    rotation: [0, Math.PI / 3, 0],
    cameraPosition: [4, 2, 5],
    fov: 45,
    category: 'Super',
    specs: {
      power: '600 HP',
      acceleration: '3.1s 0-60 mph',
      topSpeed: '200 mph',
      weight: '2,500 lbs'
    }
  }
]; 