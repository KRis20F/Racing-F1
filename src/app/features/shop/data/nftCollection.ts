import { NFTData } from '../components/types';

export const nftCollection: NFTData[] = [
  {
    id: 'nft1',
    name: 'Turbo Boost X3',
    image: '/nfts/turbo-boost.png',
    description: 'Aumenta la velocidad máxima de cualquier coche en un 15%',
    attributes: {
      rarity: 'Legendary',
      boost: '+15% Speed',
      type: 'Performance'
    },
    price: 1500
  },
  {
    id: 'nft2',
    name: 'Golden Wheels',
    image: '/nfts/golden-wheels.png',
    description: 'Ruedas doradas que mejoran el manejo en un 20%',
    attributes: {
      rarity: 'Epic',
      boost: '+20% Handling',
      type: 'Cosmetic'
    },
    price: 1200
  },
  {
    id: 'nft3',
    name: 'Nitro Pack Pro',
    image: '/nfts/nitro-pack.png',
    description: 'Sistema de nitro que mejora la aceleración en un 25%',
    attributes: {
      rarity: 'Rare',
      boost: '+25% Acceleration',
      type: 'Performance'
    },
    price: 1000
  }
]; 