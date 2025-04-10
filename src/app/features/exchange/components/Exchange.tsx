import { createChart } from "lightweight-charts";
import React, { useState, useEffect, useRef } from "react";
// import { createToken, getTokenBalance } from "../../utils/solana"; // Comentado por ahora
import StripePayment from "../../payment/components/StripePayment";
// import { Keypair } from "@solana/web3.js"; // Comentado por ahora

// TODO: Estilizar con un diseño similar a Binance
// - Usar un tema oscuro con acentos en verde/rojo
// - Implementar gráficos de precios
// - Añadir animaciones suaves en las transacciones
// - Usar una paleta de colores profesional

interface OrderBook {
  bids: Array<{ price: number; amount: number }>;
  asks: Array<{ price: number; amount: number }>;
}

interface ExchangeProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const Exchange: React.FC<ExchangeProps> = ({ onSuccess, onError }) => {
  // const { publicKey } = useWallet(); // Comentado por ahora
  // const { connection } = useConnection(); // Comentado por ahora
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [orderBook] = useState<OrderBook>({
    bids: [
      { price: 1.205, amount: 100 },
      { price: 1.204, amount: 250 },
      { price: 1.203, amount: 500 },
    ],
    asks: [
      { price: 1.206, amount: 150 },
      { price: 1.207, amount: 300 },
      { price: 1.208, amount: 450 },
    ],
  });
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { color: "#1a1b1e" },
          textColor: "#d1d4dc",
        },
        grid: {
          vertLines: { color: "#2b2b43" },
          horzLines: { color: "#2b2b43" },
        },
        width: chartContainerRef.current.clientWidth,
        height: 400,
      });

      const lineSeries = chart.addLineSeries({ // Cambiado a LineSeries para ejemplo simple
        color: "#2ebd85",
        lineWidth: 2,
      });

      // Datos de ejemplo para LineSeries
      const data = [
        { time: '2024-01-01', value: 1.22 },
        { time: '2024-01-02', value: 1.23 },
        { time: '2024-01-03', value: 1.25 },
        { time: '2024-01-04', value: 1.24 },
        { time: '2024-01-05', value: 1.26 },
        // ... más datos ...
      ];

      lineSeries.setData(data); // Usar setData para LineSeries

      const handleResize = () => {
        if (chartContainerRef.current) {
          chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        chart.remove();
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const handlePaymentSuccess = async () => {
    // Simular la lógica de éxito sin Solana
    console.log("Pago exitoso, procesando...");
    setLoading(true);
    try {
      // Aquí iría la lógica de creación de tokens o actualización de estado si no dependiera de Solana ahora
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simular trabajo
      console.log("Procesamiento completado (sin Solana).");
      onSuccess?.();
    } catch (error) {
      console.error("Error en el procesamiento post-pago:", error);
      onError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentError = (error: string) => {
    console.error("Error en el pago:", error);
    onError?.(new Error(error));
  };

  // Quitamos la comprobación de publicKey
  // if (!publicKey) { ... }

  return (
    <div className="p-6 bg-[#1a1b1e] min-h-screen text-white"> {/* Añadido text-white aquí */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Gráfico de precios */}
        <div className="lg:col-span-3 bg-[#2b2d31] rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Price Chart (Example)</h2>
          <div ref={chartContainerRef} className="w-full h-[400px]" /> {/* Asegurar altura */}
        </div>

        {/* Panel derecho - Libro de órdenes */}
        <div className="lg:col-span-1 bg-[#2b2d31] rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Order Book</h2>
          <div className="mb-6">
            <div className="grid grid-cols-3 text-xs text-gray-400 mb-2 px-1">
              <span>Price (USD)</span>
              <span className="text-right">Amount</span>
              <span className="text-right">Total</span>
            </div>
            {/* Asks */}
            <div className="space-y-1 mb-2">
              {orderBook.asks.slice(0, 5).reverse().map((ask, index) => ( // Mostrar solo 5 asks
                <div key={`ask-${index}`} className="flex justify-between text-sm bg-red-900 bg-opacity-30 px-1 py-0.5 rounded">
                  <span className="text-red-400">{ask.price.toFixed(3)}</span>
                  <span className="text-right">{ask.amount}</span>
                   <span className="text-right">{(ask.price * ask.amount).toFixed(2)}</span>
                </div>
              ))}
            </div>
             {/* Precio Actual (placeholder) */}
            <div className="text-lg font-bold my-3 text-center text-gray-200">
              1.2055 USD {/* Placeholder */}
            </div>
            {/* Bids */}
            <div className="space-y-1 mt-2">
              {orderBook.bids.slice(0, 5).map((bid, index) => ( // Mostrar solo 5 bids
                <div key={`bid-${index}`} className="flex justify-between text-sm bg-green-900 bg-opacity-30 px-1 py-0.5 rounded">
                  <span className="text-green-400">{bid.price.toFixed(3)}</span>
                   <span className="text-right">{bid.amount}</span>
                   <span className="text-right">{(bid.price * bid.amount).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel de trading */}
        <div className="lg:col-span-3 bg-[#2b2d31] rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Buy Tokens</h2>
          {/* Exchange Form */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-300">
              Amount (USD) to Spend
            </label>
            <input
              type="number"
              value={amount <= 0 ? "" : amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              className="bg-[#1a1b1e] text-white shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-[#2ebd85]"
              min="1"
              step="0.01"
              placeholder="e.g., 50.00"
            />
          </div>

          {amount > 0 && (
             <div className="mt-4">
               <p className="text-sm text-gray-400 mb-2">Proceed with payment:</p>
              <StripePayment
                amount={amount}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>
          )}
        </div>

        {/* Panel de historial (Placeholder) */}
        <div className="lg:col-span-1 bg-[#2b2d31] rounded-xl p-6 shadow-lg">
           <h2 className="text-xl font-semibold mb-4">Trade History</h2>
           <p className="text-gray-400 text-sm">Trade history will appear here.</p>
          {/* ... código del historial ... */}
        </div>
      </div>

      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2ebd85] border-t-transparent"></div>
          <p className="ml-4 text-white">Processing...</p>
        </div>
      )}
    </div>
  );
};

export default Exchange;