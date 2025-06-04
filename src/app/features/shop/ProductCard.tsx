import React from 'react';
import type { CarListing } from '../../api/endpoints/marketplace.endpoints';

interface ProductCardProps {
  product: CarListing;
  onAddToCart: (product: CarListing) => void;
  isLoading: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isLoading }) => {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={`/images/cars/${product.carId}.jpg`}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Speed: {product.stats.speed} | Handling: {product.stats.handling}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price} RACE</p>
      </div>
      <button
        onClick={() => onAddToCart(product)}
        disabled={isLoading}
        className={`mt-4 w-full rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        }`}
      >
        {isLoading ? 'Procesando...' : 'Añadir al carrito'}
      </button>
    </div>
  );
}; 