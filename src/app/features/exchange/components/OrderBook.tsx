import { useState } from "react";

interface Order {
  price: number;
  amount: number;
  total: number;
}

interface OrderBookProps {
  pair: string;
}

const OrderBook = ({ pair }: OrderBookProps) => {
  const [activeTab, setActiveTab] = useState<"all" | "buy" | "sell">("all");

  // Ejemplo de datos
  const buyOrders: Order[] = [
    { price: 0.00234, amount: 1250.45, total: 2.92553 },
    { price: 0.00233, amount: 850.12, total: 1.98078 },
    { price: 0.00232, amount: 1100.78, total: 2.55381 },
  ];

  const sellOrders: Order[] = [
    { price: 0.00235, amount: 980.34, total: 2.3038 },
    { price: 0.00236, amount: 1500.67, total: 3.54158 },
    { price: 0.00237, amount: 750.23, total: 1.77805 },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Order Book</h3>
        <div className="flex bg-[rgba(255,255,255,0.1)] rounded-lg p-1">
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeTab === "all"
                ? "bg-[rgba(255,255,255,0.1)]"
                : "hover:bg-[rgba(255,255,255,0.05)]"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeTab === "buy"
                ? "bg-[rgba(255,255,255,0.1)]"
                : "hover:bg-[rgba(255,255,255,0.05)]"
            }`}
            onClick={() => setActiveTab("buy")}
          >
            Buy
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeTab === "sell"
                ? "bg-[rgba(255,255,255,0.1)]"
                : "hover:bg-[rgba(255,255,255,0.05)]"
            }`}
            onClick={() => setActiveTab("sell")}
          >
            Sell
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-3 gap-4 px-4 py-2 text-sm text-gray-400">
          <div>Price ({pair.split("/")[1]})</div>
          <div>Amount ({pair.split("/")[0]})</div>
          <div>Total</div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-40px)]">
          {(activeTab === "all" || activeTab === "sell") && (
            <div className="space-y-1">
              {sellOrders.map((order, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 px-4 py-2 text-sm hover:bg-[rgba(255,255,255,0.05)]"
                >
                  <div className="text-red-500">{order.price.toFixed(5)}</div>
                  <div>{order.amount.toFixed(2)}</div>
                  <div>{order.total.toFixed(5)}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "all" && (
            <div className="border-y border-[rgba(255,255,255,0.1)] my-2 py-2 px-4">
              <div className="text-lg font-semibold">0.00234 USDT</div>
            </div>
          )}

          {(activeTab === "all" || activeTab === "buy") && (
            <div className="space-y-1">
              {buyOrders.map((order, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 px-4 py-2 text-sm hover:bg-[rgba(255,255,255,0.05)]"
                >
                  <div className="text-green-500">{order.price.toFixed(5)}</div>
                  <div>{order.amount.toFixed(2)}</div>
                  <div>{order.total.toFixed(5)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
