import { useState } from "react";

interface PlaceOrderProps {
  pair: string;
}

const PlaceOrder = ({ pair }: PlaceOrderProps) => {
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement order submission logic here
    console.log("Order submitted:", { orderType, side, price, amount });
  };

  const calculateTotal = () => {
    if (!price || !amount) return "0.00";
    return (parseFloat(price) * parseFloat(amount)).toFixed(2);
  };

  return (
    <div className="h-full flex flex-col">
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
          >
            Market
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
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
          type="submit"
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
  );
};

export default PlaceOrder;
