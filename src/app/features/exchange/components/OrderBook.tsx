import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import type { Order } from '../../../api/endpoints/exchange.endpoints';
import { exchangeEndpoints } from '../../../api/endpoints/exchange.endpoints';

interface OrderBookProps {
  pair: string;
  isLoading?: boolean;
}

const OrderBook = ({ pair, isLoading: externalLoading }: OrderBookProps) => {
  const [activeTab, setActiveTab] = useState<"all" | "buy" | "sell">("all");

  const { data, isLoading: queryLoading, error } = useQuery({
    queryKey: ["orderbook", pair],
    queryFn: () => exchangeEndpoints.getOrderBook(pair),
    refetchInterval: 3000,
  });

  const isLoading = externalLoading || queryLoading;
  const buyOrders: Order[] = data?.buy || [];
  const sellOrders: Order[] = data?.sell || [];

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

        {isLoading && <div className="text-center text-gray-400 py-4">Loading...</div>}
        {error && <div className="text-center text-red-400 py-4">Error loading orderbook</div>}

        <div className="overflow-y-auto h-[calc(100%-40px)]">
          {(activeTab === "all" || activeTab === "sell") && (
            <div className="space-y-1">
              {sellOrders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-3 gap-4 px-4 py-2 text-sm hover:bg-[rgba(255,255,255,0.05)]"
                >
                  <div className="text-red-500">{Number(order.price).toFixed(5)}</div>
                  <div>{Number(order.amount).toFixed(2)}</div>
                  <div>{(Number(order.price) * Number(order.amount)).toFixed(5)}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "all" && (
            <div className="border-y border-[rgba(255,255,255,0.1)] my-2 py-2 px-4">
              <div className="text-lg font-semibold">-</div>
            </div>
          )}

          {(activeTab === "all" || activeTab === "buy") && (
            <div className="space-y-1">
              {buyOrders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-3 gap-4 px-4 py-2 text-sm hover:bg-[rgba(255,255,255,0.05)]"
                >
                  <div className="text-green-500">{Number(order.price).toFixed(5)}</div>
                  <div>{Number(order.amount).toFixed(2)}</div>
                  <div>{(Number(order.price) * Number(order.amount)).toFixed(5)}</div>
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
