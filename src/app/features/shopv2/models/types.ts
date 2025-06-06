export interface CarModel {
  id: string;
  name: string;
  price: number;
  modelPath: string;
  description: string;
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
  cameraPosition: [number, number, number];
  fov: number;
  category: string;
  specs: {
    power: string;
    acceleration: string;
    topSpeed: string;
    weight: string;
  };
}

export interface NFTData {
  id: string;
  name: string;
  image: string;
  description: string;
  attributes: {
    rarity: string;
    boost: string;
    type: string;
  };
  price: number;
}

