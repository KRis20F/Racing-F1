import { useState } from 'react';
import type { WelcomeGifts } from '../services/walletService';

export type WalletCreationStep = 0 | 1 | 2 | 3;

export const useWallet = () => {
  const [showWelcomeGifts, setShowWelcomeGifts] = useState(false);
  const [welcomeGifts, setWelcomeGifts] = useState<WelcomeGifts | null>(null);

  const showGifts = (gifts: WelcomeGifts) => {
    setWelcomeGifts(gifts);
    setShowWelcomeGifts(true);
  };

  const hideGifts = () => {
    setShowWelcomeGifts(false);
    setWelcomeGifts(null);
  };

  return {
    showWelcomeGifts,
    welcomeGifts,
    showGifts,
    hideGifts
  };
}; 