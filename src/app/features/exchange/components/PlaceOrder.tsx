import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
// import { Html } from "@react-three/drei"; // Eliminado porque no se usa
import { CarModel } from '../../userDashboard/components/CarModel';
import { useUserData } from '../../../hooks/useUserData';
import UserSearchInput from '../../../UI/UserSearchInput';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../api/api.config';

interface PlaceOrderProps {
  pair: string;
}

const useExchangeUsers = () => {
  return useQuery({
    queryKey: ['exchange-users'],
    queryFn: async () => {
      const { data } = await api.get('/api/wallet/users');
      return data;
    }
  });
};

const PlaceOrder = ({ pair }: PlaceOrderProps) => {
  const [section, setSection] = useState<'order' | 'transfer'>('order');
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [transferType, setTransferType] = useState<'token' | 'nft'>('token');
  const [transferTo, setTransferTo] = useState<null | { value: string; label: string; avatarUrl?: string }>(null);
  const [transferAmount, setTransferAmount] = useState("");
  const { profile } = useUserData();
  const cars = profile?.cars || [];
  const [selectedCar, setSelectedCar] = useState(0);
  const { data: users } = useExchangeUsers();

  // Convertir usuarios a opciones para el UserSearchInput, excluyendo al usuario actual
  const userOptions = (users || [])
    .filter((u: { id: string | number }) => u.id !== String(profile?.id))
    .map((u: { id: string; username: string; avatar?: string }) => ({
      value: u.id,
      label: u.username,
      avatarUrl: u.avatar || undefined
    }));
  const transferToError = '';

  const calculateTotal = () => {
    if (!price || !amount) return "0.00";
    return (parseFloat(price) * parseFloat(amount)).toFixed(2);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Botones grandes para alternar sección */}
      <div className="flex gap-4 mb-6">
        <button
          className={`flex-1 py-3 rounded-xl text-lg font-bold transition-colors shadow-md ${
            section === 'order'
              ? 'bg-indigo-600 text-white scale-105'
              : 'bg-gray-800 text-indigo-300 hover:bg-gray-700'
          }`}
          onClick={() => setSection('order')}
          type="button"
        >
          Order
        </button>
        <button
          className={`flex-1 py-3 rounded-xl text-lg font-bold transition-colors shadow-md ${
            section === 'transfer'
              ? 'bg-fuchsia-600 text-white scale-105'
              : 'bg-gray-800 text-fuchsia-300 hover:bg-gray-700'
          }`}
          onClick={() => setSection('transfer')}
          type="button"
        >
          Transfer
        </button>
      </div>

      {/* Sección Order */}
      {section === 'order' && (
        <div className="animate-fade-in flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Place Order</h3>
            <div className="flex bg-[rgba(255,255,255,0.1)] rounded-lg p-1">
              <button
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  orderType === "limit"
                    ? "bg-[rgba(255,255,255,0.1)]"
                    : "hover:bg-[rgba(255,255,255,0.05)]"
                }`}
                onClick={() => setOrderType("limit")}
                type="button"
              >
                Limit
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  orderType === "market"
                    ? "bg-[rgba(255,255,255,0.1)]"
                    : "hover:bg-[rgba(255,255,255,0.05)]"
                }`}
                onClick={() => setOrderType("market")}
                type="button"
              >
                Market
              </button>
            </div>
          </div>

          <form className="flex-1 flex flex-col">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  side === "buy"
                    ? "bg-green-500/20 text-green-500"
                    : "bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)]"
                }`}
                onClick={() => setSide("buy")}
              >
                Buy
              </button>
              <button
                type="button"
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  side === "sell"
                    ? "bg-red-500/20 text-red-500"
                    : "bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)]"
                }`}
                onClick={() => setSide("sell")}
              >
                Sell
              </button>
            </div>

            <div className="space-y-4">
              {orderType === "limit" && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Price ({pair.split("/")[1]})
                  </label>
                  <input
                    type="number"
                    step="0.00001"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Amount ({pair.split("/")[0]})
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              {orderType === "limit" && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Total ({pair.split("/")[1]})
                  </label>
                  <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2">
                    {calculateTotal()}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              className={`mt-auto py-3 px-4 rounded-lg font-medium transition-colors ${
                side === "buy"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {side === "buy" ? "Buy" : "Sell"} {pair.split("/")[0]}
            </button>
          </form>
        </div>
      )}

      {/* Sección Transfer */}
      {section === 'transfer' && (
        <div className="animate-fade-in flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Transfer</h3>
            <div className="flex bg-[rgba(255,255,255,0.1)] rounded-lg p-1">
              <button
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  transferType === 'token'
                    ? 'bg-[rgba(255,255,255,0.1)]'
                    : 'hover:bg-[rgba(255,255,255,0.05)]'
                }`}
                onClick={() => setTransferType('token')}
                type="button"
              >
                Token
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  transferType === 'nft'
                    ? 'bg-[rgba(255,255,255,0.1)]'
                    : 'hover:bg-[rgba(255,255,255,0.05)]'
                }`}
                onClick={() => setTransferType('nft')}
                type="button"
              >
                NFT
              </button>
            </div>
          </div>

          {/* Transferir Token */}
          {transferType === 'token' && (
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">To (User ID o Wallet)</label>
                <UserSearchInput
                  value={transferTo}
                  options={userOptions}
                  label="Buscar usuario"
                  name="transferTo"
                  required={true}
                  errors={{ transferTo: transferToError }}
                  setFieldValue={setTransferTo}
                  handleBlur={() => {}}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Amount ({pair.split("/")[0]})</label>
                <input
                  type="number"
                  step="0.01"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full bg-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                  placeholder="0.00"
                />
              </div>
              <button
                type="button"
                className="mt-2 py-3 px-4 rounded-lg font-medium bg-fuchsia-500 hover:bg-fuchsia-600 text-white transition-colors"
              >
                Transfer Token
              </button>
            </form>
          )}

          {/* Transferir NFT - Carrusel interactivo */}
          {transferType === 'nft' && (
            <form className="flex flex-col gap-4">
              {cars.length > 0 ? (
                <>
                  {/* Carrusel de autos */}
                  <div className="flex flex-col items-center mb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => setSelectedCar(selectedCar === 0 ? cars.length - 1 : selectedCar - 1)}
                        className="p-2 rounded-full bg-[#1B254B] hover:bg-[#4318FF] transition-colors"
                        aria-label="Anterior"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <div className="h-[200px] w-[320px] bg-[#1B254B] rounded-xl overflow-hidden flex items-center justify-center">
                        <Suspense fallback={<div className="flex items-center justify-center h-full text-purple-500">Cargando...</div>}>
                          <Canvas
                            camera={{ position: cars[selectedCar]?.cameraPosition || [2.5, 1.5, 2.5], fov: cars[selectedCar]?.fov || 50 }}
                            gl={{ preserveDrawingBuffer: true, antialias: true }}
                            dpr={[1, 2]}
                          >
                            <color attach="background" args={['#1B254B']} />
                            <ambientLight intensity={1.2} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
                            <pointLight position={[-10, -10, -10]} intensity={0.8} />
                            <CarModel car={cars[selectedCar]} />
                          </Canvas>
                        </Suspense>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedCar(selectedCar === cars.length - 1 ? 0 : selectedCar + 1)}
                        className="p-2 rounded-full bg-[#1B254B] hover:bg-[#4318FF] transition-colors"
                        aria-label="Siguiente"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    {/* Dots de navegación */}
                    <div className="flex justify-center gap-2 mt-2">
                      {cars.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedCar(idx)}
                          className={`w-2 h-2 rounded-full transition-colors ${idx === selectedCar ? 'bg-[#4318FF]' : 'bg-[#1B254B]'}`}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Info del auto seleccionado */}
                  <div className="text-center mb-2">
                    <h4 className="text-white text-lg font-semibold">{cars[selectedCar]?.name}</h4>
                    <p className="text-gray-400 text-sm">{cars[selectedCar]?.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">To (User ID o Wallet)</label>
                    <UserSearchInput
                      value={transferTo}
                      options={userOptions}
                      label="Buscar usuario"
                      name="transferTo"
                      required={true}
                      errors={{ transferTo: transferToError }}
                      setFieldValue={setTransferTo}
                      handleBlur={() => {}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">NFT ID</label>
                    <input
                      type="text"
                      value={cars[selectedCar]?.id || ''}
                      readOnly
                      className="w-full bg-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-gray-400 cursor-not-allowed"
                      placeholder="ID del NFT"
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-2 py-3 px-4 rounded-lg font-medium bg-fuchsia-500 hover:bg-fuchsia-600 text-white transition-colors"
                  >
                    Transfer NFT
                  </button>
                </>
              ) : (
                <div className="text-center py-8 text-gray-400">No tienes autos/NFTs para transferir</div>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
