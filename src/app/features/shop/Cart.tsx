import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { CarListing } from '../../api/endpoints/marketplace.endpoints';

interface CartProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  items: CarListing[];
  onRemove: (productId: number) => void;
  onCheckout: () => void;
  isLoading: boolean;
}

export const Cart: React.FC<CartProps> = ({
  open,
  setOpen,
  items,
  onRemove,
  onCheckout,
  isLoading
}) => {
  const total = items.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={React.Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Carrito de compras</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Cerrar panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {items.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={`/images/cars/${product.carId}.jpg`}
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{product.name}</h3>
                                      <p className="ml-4">{product.price} RACE</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      Speed: {product.stats.speed} | Handling: {product.stats.handling}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <button
                                      type="button"
                                      onClick={() => onRemove(product.id)}
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Eliminar
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p>{total} RACE</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Impuestos y gastos de envío calculados al finalizar la compra.</p>
                      <div className="mt-6">
                        <button
                          onClick={onCheckout}
                          disabled={items.length === 0 || isLoading}
                          className={`flex w-full items-center justify-center rounded-md px-6 py-3 text-base font-medium text-white shadow-sm ${
                            items.length === 0 || isLoading
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-indigo-600 hover:bg-indigo-700'
                          }`}
                        >
                          {isLoading ? 'Procesando...' : 'Finalizar compra'}
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          o{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continuar comprando
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}; 