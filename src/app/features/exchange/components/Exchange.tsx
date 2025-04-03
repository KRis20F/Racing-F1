import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { createChart } from "lightweight-charts";
import React, { useState, useEffect, useRef } from "react";
import { createToken, getTokenBalance } from "../../utils/solana";
import StripePayment from "../../payment/components/StripePayment";
import { Keypair } from "@solana/web3.js";

// TODO: Estilizar con un diseño simi  lar a Binance
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
  const { publicKey } = useWallet();
  const { connection } = useConnection();
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

      const candlestickSeries = chart.addLineSeries({
        color: "#2ebd85",
        lineWidth: 2,
      });

      // Datos de ejemplo
      const data = [
        { time: "2024-01-01", open: 1.2, high: 1.24, low: 1.18, close: 1.22 },
        { time: "2024-01-02", open: 1.22, high: 1.25, low: 1.21, close: 1.23 },
        // ... más datos ...
      ];

      candlestickSeries.setData(data);

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
    if (!publicKey) {
      onError?.(new Error("Wallet no conectada"));
      return;
    }

    try {
      setLoading(true);

      // Crear tokens en Solana
      const payer = Keypair.generate();
      const tokenMint = await createToken(connection, payer);

      // Obtener balance actualizado
      const balance = await getTokenBalance(
        connection,
        tokenMint,
        payer,
        publicKey
      );

      console.log("Tokens creados:", balance);
      onSuccess?.();
    } catch (error) {
      console.error("Error al crear tokens:", error);
      onError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentError = (error: string) => {
    console.error("Error en el pago:", error);
    onError?.(new Error(error));
  };

  if (!publicKey) {
    return (
      <div className="p-8 bg-[#1a1b1e] rounded-xl shadow-2xl max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Conecta tu Wallet
        </h2>
        <p className="text-gray-400 mb-6">
          Por favor, conecta tu wallet de Solana para continuar.
        </p>
        <WalletMultiButton />
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#1a1b1e] min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Gráfico de precios */}
        <div className="lg:col-span-3 bg-[#2b2d31] rounded-xl p-6">
          <div ref={chartContainerRef} className="w-full" />
        </div>

        {/* Panel derecho - Libro de órdenes */}
        <div className="lg:col-span-1 bg-[#2b2d31] rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Order Book</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Order Book</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-red-500">Asks</h4>
                {orderBook.asks.map((ask, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{ask.price}</span>
                    <span>{ask.amount}</span>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="text-green-500">Bids</h4>
                {orderBook.bids.map((bid, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{bid.price}</span>
                    <span>{bid.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Panel de trading */}
        <div className="lg:col-span-3 bg-[#2b2d31] rounded-xl p-6">
          {/* Exchange Form */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Cantidad (USD)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="bg-gray-700 text-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              min="1"
              step="0.01"
            />
          </div>

          {amount > 0 && (
            <StripePayment
              amount={amount}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          )}
        </div>

        {/* Panel de historial */}
        <div className="lg:col-span-1 bg-[#2b2d31] rounded-xl p-6">
          {/* ... código del historial ... */}
        </div>
      </div>

      {/* Loading spinner con animación suave */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm transition-all duration-300">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2ebd85] border-t-transparent">
            <div className="animate-ping absolute inset-0 bg-[#2ebd85] rounded-full opacity-20"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exchange;
