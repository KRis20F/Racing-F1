import React from 'react';
import type { WelcomeGifts } from '../../services/walletService';

interface WalletDialogProps {
  isOpen: boolean;
  onClose: () => void;
  welcomeGifts?: WelcomeGifts;
}

export const WalletDialog = ({ isOpen, onClose, welcomeGifts }: WalletDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
        
        <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6 shadow-xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ¡Bienvenido a Racing F1!
            </h3>
            
            {welcomeGifts && (
              <div className="space-y-6">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2">
                    Tokens de Bienvenida
                  </h4>
                  <p className="text-green-600 dark:text-green-300">
                    {welcomeGifts.tokens.amount} {welcomeGifts.tokens.symbol}
                  </p>
                  <p className="text-sm text-green-500 dark:text-green-400">
                    Valor: ${welcomeGifts.tokens.usdValue}
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2">
                    Auto de Regalo
                  </h4>
                  <p className="text-blue-600 dark:text-blue-300">
                    {welcomeGifts.car.name}
                  </p>
                  <div className="text-sm text-blue-500 dark:text-blue-400 mt-2">
                    <p>Potencia: {welcomeGifts.car.specs.power}</p>
                    <p>0-60 mph: {welcomeGifts.car.specs.acceleration}</p>
                    <p>Velocidad Máxima: {welcomeGifts.car.specs.topSpeed}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={onClose}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 