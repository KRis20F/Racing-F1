// Removed React import as it's injected by vite.config.ts

interface Trade {
  price: number;
  amount: number;
  total: number;
  type: "buy" | "sell";
  time: string;
}

interface TradeHistoryProps {
  pair: string;
}

const TradeHistory: React.FC<TradeHistoryProps> = ({ pair }) => {
  // Datos de ejemplo - En una implementación real, estos vendrían de una API
  const recentTrades: Trade[] = [
    {
      price: 0.00235,
      amount: 980.34,
      total: 2.3038,
      type: "sell",
      time: "14:25:30",
    },
    {
      price: 0.00236,
      amount: 1500.67,
      total: 3.54158,
      type: "sell",
      time: "14:25:28",
    },
    {
      price: 0.00234,
      amount: 1250.45,
      total: 2.92553,
      type: "buy",
      time: "14:25:25",
    },
    {
      price: 0.00233,
      amount: 850.12,
      total: 1.98078,
      type: "buy",
      time: "14:25:20",
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Trades</h2>
        <div className="text-sm">
          <span className="text-gray-400">24h Volume: </span>
          <span className="text-white">1,234.56 ETH</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 text-sm text-gray-400 mb-2">
        <div>Price ({pair.split("/")[1]})</div>
        <div>Amount ({pair.split("/")[0]})</div>
        <div>Total</div>
        <div>Time</div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {recentTrades.map((trade, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-4 text-sm py-1 border-b border-white/5"
          >
            <div
              className={
                trade.type === "buy" ? "text-green-500" : "text-red-500"
              }
            >
              {trade.price.toFixed(5)}
            </div>
            <div className="text-white">{trade.amount.toFixed(2)}</div>
            <div className="text-white">{trade.total.toFixed(5)}</div>
            <div className="text-gray-400">{trade.time}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-white/5 p-3 rounded-lg">
          <div className="text-gray-400 mb-1">24h High</div>
          <div className="text-green-500">0.00245</div>
        </div>
        <div className="bg-white/5 p-3 rounded-lg">
          <div className="text-gray-400 mb-1">24h Low</div>
          <div className="text-red-500">0.00225</div>
        </div>
      </div>
    </div>
  );
};

export default TradeHistory;
