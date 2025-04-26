import React, { useState } from "react";
import TradingChart from "./components/TradingChart";
import OrderBook from "./components/OrderBook";
import PlaceOrder from "./components/PlaceOrder";
import MarketStats from "./components/MarketStats";

// TODO: Estilizar con un diseño similar a Binance
// - Usar un tema oscuro con acentos en verde/rojo
// - Implementar gráficos de precios
// - Añadir animaciones suaves en las transacciones
// - Usar una paleta de colores profesional

export const Exchange: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState<string>("RACE/ETH");

  return (
    <div className="min-h-screen bg-[#0b1437] text-white p-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Exchange
            </h1>
            <p className="text-gray-400 mt-2">Trade your RACE tokens</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedPair}
              onChange={(e) => setSelectedPair(e.target.value)}
              className="bg-[rgba(0,0,0,0.3)] border border-[#ffffff1a] rounded-xl px-4 py-2 text-white"
            >
              <option value="RACE/ETH">RACE/ETH</option>
              <option value="RACE/USDT">RACE/USDT</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Trading Chart Panel */}
          <div className="col-span-12 lg:col-span-8">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg h-[500px]">
              <TradingChart pair={selectedPair} />
            </div>
          </div>

          {/* Order Book Panel */}
          <div className="col-span-12 lg:col-span-4">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg h-[500px]">
              <OrderBook pair={selectedPair} />
            </div>
          </div>

          {/* Place Order Panel */}
          <div className="col-span-12 lg:col-span-8">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg">
              <PlaceOrder pair={selectedPair} />
            </div>
          </div>

          {/* Market Stats Panel */}
          <div className="col-span-12 lg:col-span-4">
            <MarketStats pair={selectedPair} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
