import { Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Area, AreaChart } from 'recharts';
import Sidebar from '../../UI/Sidebar';
import type { StatCardProps, ProfileData, StatsData, WalletData } from '../../types/api/dashboard.types';

const StatCard = ({ title, value, change, icon }: StatCardProps) => {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-[#111C44] rounded-[20px] p-6 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
          <div className="flex items-center gap-2">
            <p className="text-gray-400 text-sm">{title}</p>
            <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </span>
          </div>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-[#4318FF]/10 flex items-center justify-center backdrop-blur-sm">
          <div className="text-[#4318FF]">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

// Datos actualizados para el gráfico de área
const monthlyData = [
  { name: 'Jan', metric1: 500, metric2: 200 },
  { name: 'Feb', metric1: 260, metric2: 240 },
  { name: 'Mar', metric1: 280, metric2: 300 },
  { name: 'Apr', metric1: 220, metric2: 380 },
  { name: 'May', metric1: 480, metric2: 400 },
  { name: 'Jun', metric1: 280, metric2: 420 },
  { name: 'Jul', metric1: 540, metric2: 280 },
  { name: 'Aug', metric1: 350, metric2: 220 },
  { name: 'Sep', metric1: 400, metric2: 280 },
  { name: 'Oct', metric1: 480, metric2: 300 },
  { name: 'Nov', metric1: 320, metric2: 240 },
  { name: 'Dec', metric1: 540, metric2: 380 }
];

const weeklyData = [
  { name: 'Mon', racers: 320 },
  { name: 'Tue', racers: 280 },
  { name: 'Wed', racers: 420 },
  { name: 'Thu', racers: 380 },
  { name: 'Fri', racers: 520 },
  { name: 'Sat', racers: 650 },
  { name: 'Sun', racers: 480 }
];

// Configuración de los gráficos
const chartConfig = {
  lineChart: {
    height: 300,
    margin: { top: 20, right: 30, left: 20, bottom: 20 }
  },
  barChart: {
    height: 300,
    margin: { top: 20, right: 30, left: 20, bottom: 20 }
  }
};

export const Dashboard = () => {
  // Mock data para desarrollo
  const mockData = {
    profileData: {
      data: {
        level: 10,
        experience: 1500,
        rank: "Gold"
      } as ProfileData
    },
    statsData: {
      data: {
        totalRaces: 150,
        wins: 87,
        losses: 63,
        winRate: 58,
        bestLapTime: 82500,
        totalDistance: 1500,
        favoriteTrack: "Monaco GP",
        carCollection: ["F1-001", "F1-002", "F1-003"],
        experience: 1500,
        rank: "Gold"
      } as StatsData
    },
    walletData: {
      data: {
        usd: 25000,
        tokens: 1500.123,
        wallet: {
          address: "0x1234...5678",
          balance: "1500.123"
        },
        transaction_limits: {
          daily_limit: 5000,
          monthly_limit: 50000,
          max_transaction: 10000
        },
        billing_preferences: {
          auto_pay: true,
          invoice_email: "user@example.com",
          default_currency: "USD"
        }
      } as WalletData
    }
  };

  const profile = mockData.profileData.data;
  const stats = mockData.statsData.data;
  const wallet = mockData.walletData.data;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-[#0B1437] bg-opacity-90 p-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Top Navigation Bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2 text-white/80">
              <span>Pages</span>
              <span>/</span>
              <span>Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type here..."
                  className="bg-[#111C44] border border-gray-700 rounded-full py-2 px-4 text-white w-64 pl-10"
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Races"
              value={stats.totalRaces.toString()}
              change="+12%"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                  <path fillRule="evenodd" d="M3 3.75A1.5 1.5 0 014.5 2.25h15A1.5 1.5 0 0121 3.75v15a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 18.75v-15zM4.5 3.75a.75.75 0 00-.75.75V7.5h4.5v-3.75h-3.75zm0 4.5v3.75h3.75v-3.75h-3.75zm5.25 0v3.75h3.75v-3.75h-3.75zm5.25 0v3.75h3.75v-3.75h-3.75zm3.75 5.25h-3.75v3.75h3.75v-3.75zm-5.25 0h-3.75v3.75h3.75v-3.75zm-5.25 0h-3.75v3.75h3.75v-3.75z" clipRule="evenodd" />
                </svg>
              }
            />
            <StatCard
              title="Win Rate"
              value={`${stats.winRate}%`}
              change="+5%"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                  <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
                </svg>
              }
            />
            <StatCard
              title="RCT Balance"
              value={`${wallet.tokens.toFixed(2)} RCT`}
              change="+8%"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                  <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                  <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" />
                </svg>
              }
            />
            <StatCard
              title="Level"
              value={`${profile.level}`}
              change="+2"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              }
            />
          </div>

          {/* Welcome Card with Racing Stats */}
          <div className="rounded-[20px] bg-[#111C44] p-8 mb-8 relative overflow-hidden">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=2070&auto=format&fit=crop')`
              }}
            >
              {/* Overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#111C44] via-[#111C44]/80 to-transparent"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 mb-1">Welcome back,</p>
                  <h1 className="text-4xl font-bold text-white mb-2">Racer</h1>
                  <p className="text-gray-400">Rank: {profile.rank}</p>
                  <p className="text-gray-400">XP: {profile.experience}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">Best Lap Time</p>
                  <p className="text-2xl font-bold text-white">{(stats.bestLapTime / 1000).toFixed(3)}s</p>
                  <p className="text-gray-400 mt-2">Total Distance</p>
                  <p className="text-xl font-bold text-white">{stats.totalDistance}km</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Racing Overview Chart */}
            <div className="bg-[#111C44] rounded-[20px] p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white">Racing Overview</h2>
                <p className="text-green-500">(+5%) more in 2023</p>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorMetric1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4318FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4318FF" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorMetric2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#39C7FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#39C7FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#1B254B" 
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="name" 
                      stroke="#fff"
                      tick={{ fill: '#fff', fontSize: 12 }}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#fff"
                      tick={{ fill: '#fff', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111C44',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="metric1"
                      stroke="#4318FF"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorMetric1)"
                    />
                    <Area
                      type="monotone"
                      dataKey="metric2"
                      stroke="#39C7FF"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorMetric2)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Active Users Chart */}
            <div className="bg-[#111C44] rounded-[20px] p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white">Active Racers</h2>
                <p className="text-green-500">(+23%) than last week</p>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyData}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1B254B" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#fff"
                      tick={{ fill: '#fff' }}
                    />
                    <YAxis 
                      stroke="#fff"
                      tick={{ fill: '#fff' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111C44',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      cursor={{ fill: '#1B254B' }}
                    />
                    <Bar
                      dataKey="racers"
                      fill="#4318FF"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Win Rate Chart */}
            <div className="bg-[#111C44] rounded-[20px] p-6">
              <h2 className="text-xl font-bold text-white mb-4">Racing Performance</h2>
              <p className="text-gray-400 text-sm mb-6">Win rate and statistics</p>
              <div className="flex justify-center">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#1B254B"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#4318FF"
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * stats.winRate) / 100}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-white">{stats.winRate}%</span>
                      <p className="text-sm text-gray-400">Win Rate</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-[#1B254B] rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Wins</p>
                  <p className="text-2xl font-bold text-green-500">{stats.wins}</p>
                </div>
                <div className="bg-[#1B254B] rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Losses</p>
                  <p className="text-2xl font-bold text-red-500">{stats.losses}</p>
                </div>
              </div>
            </div>

            {/* Car Collection */}
            <div className="bg-[#111C44] rounded-[20px] p-6">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-xl font-bold text-white">Car Collection</h2>
                  <p className="text-gray-400 text-sm">Your racing vehicles</p>
                </div>
                <button className="bg-[#4318FF] text-white px-4 py-2 rounded-lg hover:bg-[#3311CC] transition-colors">
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {stats.carCollection.map((car, index) => (
                  <div key={index} className="bg-[#1B254B] rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">{car}</p>
                      <p className="text-gray-400 text-sm">Racing Car</p>
                    </div>
                    <div className="text-[#4318FF]">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Token Overview (Nuevo) */}
          <div className="mt-6 bg-[#111C44] rounded-[20px] p-6">
            <h2 className="text-xl font-bold text-white mb-6">Token Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1B254B] rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-white">Token Price</p>
                    <p className="text-gray-400 text-sm">+2.4%</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#1B254B] rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-white">24h Volume</p>
                    <p className="text-gray-400 text-sm">+1.2M RCT</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#1B254B] rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <div>
                    <p className="text-white">Market Cap</p>
                    <p className="text-gray-400 text-sm">25M RCT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Section */}
          <div className="mt-6 bg-[#111C44] rounded-[20px] p-6">
            <h2 className="text-xl font-bold text-white mb-6">Wallet Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1B254B] rounded-xl p-4">
                <p className="text-gray-400 text-sm">USD Balance</p>
                <p className="text-2xl font-bold text-white">${wallet.usd.toLocaleString()}</p>
              </div>
              <div className="bg-[#1B254B] rounded-xl p-4">
                <p className="text-gray-400 text-sm">RCT Balance</p>
                <p className="text-2xl font-bold text-[#4318FF]">{wallet.tokens.toFixed(3)} RCT</p>
              </div>
              <div className="bg-[#1B254B] rounded-xl p-4">
                <p className="text-gray-400 text-sm">Wallet Address</p>
                <p className="text-sm text-white font-mono truncate">{wallet.wallet.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;