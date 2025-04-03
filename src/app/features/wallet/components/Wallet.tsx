import { useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react';
import { SolanaService } from '../../config/solana';

interface WalletData {
  coins: number;
  cars: Array<{
    id: number;
    name: string;
    quantity: number;
  }>;
}

const Wallet: React.FC = () => {
  const { publicKey } = useWallet();
  const [walletData, setWalletData] = useState<WalletData | null>(null);

  useEffect(() => {
    if (publicKey) {
      fetchWalletData();
    }
  }, [publicKey]);

  const fetchWalletData = async () => {
    try {
      // Obtener balance de tokens
      const coins = await SolanaService.getTokenBalance(publicKey.toString());
      
      // Obtener coches del usuario
      const response = await fetch(`/api/user-cars/${publicKey}`);
      const cars = await response.json();

      setWalletData({ coins, cars });
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    }
  };

  return (
    <div className="wallet">
      <h2>Mi Wallet</h2>
      <div className="balance">
        <h3>Balance: {walletData?.coins} COINS</h3>
      </div>
      <div className="cars">
        <h3>Mis Coches</h3>
        {walletData?.cars.map(car => (
          <div key={car.id} className="car-item">
            <span>{car.name}</span>
            <span>x{car.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wallet; 