import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Cart } from './Cart';
import { useMarketplace } from '../../hooks/useMarketplace';
import { toast } from 'react-hot-toast';
import type { CarListing } from '../../api/endpoints/marketplace.endpoints';

const Shop = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CarListing[]>([]);

  const {
    listings,
    isLoadingListings,
    listingsError,
    buyCar,
    isBuyingCar,
    buyCarError,
    sellCar,
    isSellingCar,
    sellCarError
  } = useMarketplace();

  // Handle marketplace errors
  React.useEffect(() => {
    if (listingsError) {
      toast.error(`Error al cargar productos: ${listingsError.message}`);
    }
    if (buyCarError) {
      toast.error(`Error al comprar: ${buyCarError.message}`);
    }
    if (sellCarError) {
      toast.error(`Error al vender: ${sellCarError.message}`);
    }
  }, [listingsError, buyCarError, sellCarError]);

  const handleAddToCart = (product: CarListing) => {
    setCartItems((prev) => [...prev, product]);
    toast.success('¡Producto añadido al carrito!');
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    toast.success('Producto eliminado del carrito');
  };

  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        await buyCar({
          listingId: item.id,
          buyerId: 1 // TODO: Get actual buyer ID from user context
        });
      }
      setCartItems([]);
      setCartOpen(false);
      toast.success('¡Compra realizada con éxito!');
    } catch (error) {
      console.error('Error durante el checkout:', error);
    }
  };

  const handleSellCar = async (carData: { carId: number; price: string }) => {
    try {
      await sellCar(carData);
      toast.success('¡Coche puesto en venta con éxito!');
    } catch (error) {
      console.error('Error al poner en venta:', error);
    }
  };

  if (isLoadingListings) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">F1 Racing Shop</h1>
            <button
              onClick={() => setCartOpen(true)}
              className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <svg
                className="h-6 w-6 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Carrito ({cartItems.length})
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {listings?.listings?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              isLoading={isBuyingCar}
            />
          ))}
        </div>
      </main>

      {/* Shopping Cart Slide-over */}
      <Cart
        open={cartOpen}
        setOpen={setCartOpen}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
        isLoading={isBuyingCar}
      />
    </div>
  );
};

export default Shop; 