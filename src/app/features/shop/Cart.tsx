import React from 'react';
import { Cart as CartType, CartItem } from '../../../types/shop';

interface CartProps {
    cart: CartType;
    onUpdateQuantity: (itemId: string, newQuantity: number) => void;
    onRemoveItem: (itemId: string) => void;
}

export const Cart: React.FC<CartProps> = ({ cart, onUpdateQuantity, onRemoveItem }) => {
    return (
        <div className="bg-gray-900 rounded-2xl shadow-xl p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                <span className="mr-3">Shopping Cart</span>
                {cart.items.length > 0 && (
                    <span className="bg-indigo-500 text-white text-sm rounded-full px-2 py-1 min-w-[1.5rem] text-center">
                        {cart.items.length}
                    </span>
                )}
            </h2>

            {cart.items.length === 0 ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <p className="text-gray-400 text-lg mb-2">Your cart is empty</p>
                    <p className="text-gray-500 text-sm">Start adding some awesome F1 merchandise!</p>
                </div>
            ) : (
                <>
                    <div className="space-y-6 mb-8">
                        {cart.items.map((item: CartItem) => (
                            <div key={item.product.id} 
                                className="flex items-center gap-4 bg-gray-800/50 rounded-xl p-4 transition-transform hover:scale-[1.02]">
                                <img 
                                    src={item.product.image} 
                                    alt={item.product.name} 
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-medium truncate">
                                        {item.product.name}
                                    </h3>
                                    <p className="text-indigo-400 font-semibold mt-1">
                                        ${item.product.price.toFixed(2)}
                                    </p>
                                    
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="flex items-center bg-gray-800 rounded-lg">
                                            <button
                                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                                className="px-3 py-1 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="px-3 py-1 text-white font-medium">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                                className="px-3 py-1 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                                                disabled={item.quantity >= item.product.stock}
                                            >
                                                +
                                            </button>
                                        </div>
                                        
                                        <button
                                            onClick={() => onRemoveItem(item.product.id)}
                                            className="text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-700 pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="text-white font-medium">${cart.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-400">Shipping</span>
                            <span className="text-green-400">Free</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold mb-8">
                            <span className="text-white">Total</span>
                            <span className="text-indigo-400">${cart.total.toFixed(2)}</span>
                        </div>

                        <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold 
                            transition-all duration-300 transform hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98]
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}; 