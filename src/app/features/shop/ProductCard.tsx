import React from 'react';
import { Product } from '../../../types/shop';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="group relative bg-gray-900 rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80"></div>
            </div>
            
            <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                            {product.name}
                        </h3>
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-400 bg-indigo-400/10 rounded-full">
                            {product.category}
                        </span>
                    </div>
                    <span className="text-2xl font-bold text-white">
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <p className="text-gray-300 text-sm mb-6 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between">
                    <span className={`text-sm ${product.stock > 10 ? 'text-green-400' : product.stock > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'} 
                        <span className="text-gray-400 ml-1">({product.stock} units)</span>
                    </span>
                    
                    <button
                        onClick={() => onAddToCart(product)}
                        disabled={product.stock === 0}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform
                            ${product.stock === 0 
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                                : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105 active:scale-95'
                            }`}
                    >
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}; 