import { useQuery } from '@tanstack/react-query';
import { exchangeEndpoints } from '../../../api/endpoints/exchange.endpoints';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
interface MarketStatsProps {
  pair: string;
}

const SUPPLY = 25000000; // 25M RACE
const USD_PER_ETH = 2000; // Simulación

const MarketStats = ({ pair }: MarketStatsProps) => {
  // Price history
  const { data: priceHistory } = useQuery({
    queryKey: ['price-history'],
    queryFn: () => fetch(API_URL + '/api/dashboard/token/price-history').then(res => res.json() as Promise<{ price: number }[]>),
  });

  // Recent trades
  const { data: recentTrades } = useQuery({
    queryKey: ['recent-trades', pair],
    queryFn: () => exchangeEndpoints.getRecentTrades(pair, 5),
    refetchInterval: 3000,
  });

  // Procesar stats
  const prices = priceHistory?.map((p) => p.price) || [];
  const high = prices.length ? Math.max(...prices) : 0;
  const low = prices.length ? Math.min(...prices) : 0;
  const last = prices[prices.length - 1] || 0;
  const first = prices[0] || 0;
  const change = first ? ((last - first) / first) * 100 : 0;
  const volume = 1234.56; // Simulado
  const marketCap = last * SUPPLY;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Market Stats</h3>
        <span className="text-green-400 text-xs">Last updated: Just now</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center">
          <div className="text-xs text-gray-400">24h High</div>
          <div className="text-green-400 text-lg font-bold">{high.toFixed(5)} ETH</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center">
          <div className="text-xs text-gray-400">24h Low</div>
          <div className="text-red-400 text-lg font-bold">{low.toFixed(5)} ETH</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center">
          <div className="text-xs text-gray-400">24h Volume</div>
          <div className="text-white text-lg font-bold">{volume.toLocaleString()} ETH</div>
          <div className="text-xs text-gray-400">≈ ${(volume * USD_PER_ETH).toLocaleString()}</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center">
          <div className="text-xs text-gray-400">Market Cap</div>
          <div className="text-white text-lg font-bold">{SUPPLY.toLocaleString()} RACE</div>
          <div className="text-xs text-gray-400">≈ ${(marketCap * USD_PER_ETH).toLocaleString()}</div>
        </div>
      </div>
      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-1">Price Change (24h)</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-2 ${change >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ width: `${Math.min(Math.abs(change), 100)}%` }}
            ></div>
          </div>
          <span className={`text-sm font-bold ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>{change >= 0 ? '+' : ''}{change.toFixed(2)}%</span>
        </div>
      </div>
      <div className="bg-white/5 rounded-xl p-4 mt-2">
        <div className="text-xs text-gray-400 mb-2">Recent Trades</div>
        <div className="space-y-1">
          {recentTrades?.map(trade => (
            <div key={trade.id} className="flex items-center justify-between text-sm">
              <span className={trade.side === 'buy' ? 'text-green-500' : 'text-red-500'}>{trade.side.charAt(0).toUpperCase() + trade.side.slice(1)}</span>
              <span className="font-mono">{Number(trade.price).toFixed(5)} ETH</span>
              <span className="text-gray-400 text-xs">{timeAgo(trade.timestamp)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function timeAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} h ago`;
  return date.toLocaleDateString();
}

export default MarketStats;
