import { useWallet } from '@solana/wallet-adapter-react';
import { NFTData } from '../types';

interface NFTCardProps {
  nft: NFTData;
}

export const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  const { connected } = useWallet();

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary': return 'text-yellow-400';
      case 'epic': return 'text-purple-500';
      case 'rare': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const handlePurchase = async () => {
    if (!connected) {
      alert('Please connect your wallet first!');
      return;
    }
    // Implement NFT purchase logic here
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full ${getRarityColor(nft.attributes.rarity)} bg-black bg-opacity-50`}>
          {nft.attributes.rarity}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{nft.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{nft.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Boost:</span>
            <span className="text-sm text-green-500">{nft.attributes.boost}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Type:</span>
            <span className="text-sm">{nft.attributes.type}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">{nft.price} RCF</span>
          <button
            onClick={handlePurchase}
            className={`px-4 py-2 rounded-lg ${
              connected
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!connected}
          >
            {connected ? 'Purchase' : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </div>
  );
}; 