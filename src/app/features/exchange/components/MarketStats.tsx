import React from "react";

interface MarketStatsProps {
  pair: string;
}

const MarketStats: React.FC<MarketStatsProps> = ({ pair }) => {
  return (
    <div className="w-full p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Market Stats</h2>
        <p className="text-sm text-green-500 font-semibold">
          Last updated: Just now
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-1">24h High</p>
          <p className="text-green-400 text-xl font-semibold">0.00245 ETH</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-1">24h Low</p>
          <p className="text-red-400 text-xl font-semibold">0.00225 ETH</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-1">24h Volume</p>
          <p className="text-white text-xl font-semibold">1,234.56 ETH</p>
          <p className="text-gray-400 text-sm">≈ $2,469,120</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-1">Market Cap</p>
          <p className="text-white text-xl font-semibold">25M RACE</p>
          <p className="text-gray-400 text-sm">≈ $50,000,000</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-400 text-sm">Price Change (24h)</p>
            <p className="text-green-500 text-sm font-semibold">+5.67%</p>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: "65%" }}
            ></div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-2">Recent Trades</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-green-500">Buy</span>
              <span className="text-white">0.00234 ETH</span>
              <span className="text-gray-400 text-sm">1 min ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-red-500">Sell</span>
              <span className="text-white">0.00236 ETH</span>
              <span className="text-gray-400 text-sm">3 min ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-500">Buy</span>
              <span className="text-white">0.00233 ETH</span>
              <span className="text-gray-400 text-sm">5 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketStats;
