import { motion } from 'framer-motion';
import { CarModel } from '../types';

interface CartProps {
  items: CarModel[];
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ items, onRemoveItem, onCheckout, isOpen, onClose }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween' }}
        className="bg-white dark:bg-gray-800 w-full max-w-md h-full p-6 overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            Your cart is empty
          </p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">
                      ${item.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-2xl font-bold">
                  ${total.toLocaleString()}
                </span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}; 