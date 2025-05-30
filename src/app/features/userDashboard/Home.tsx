import React from 'react';
import StatsOverview from './components/StatsOverview';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

// StatCard Component
const StatCard = ({ title, value, change, icon }: StatCardProps) => {
  // Determine text color based on change value
  const changeColor = change.startsWith('+') ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-[#111C44] rounded-xl p-6 flex justify-between items-center">
      <div>
        <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <p className="text-white text-xl font-semibold">{value}</p>
          <span className={`${changeColor} text-sm`}>{change}</span>
        </div>
      </div>
      <div className="bg-indigo-600 p-3 rounded-lg">
        {icon}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Today's Money"
          value="$53,000"
          change="+55%"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        <StatCard
          title="Today's Users"
          value="2,300"
          change="+5%"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          }
        />
        <StatCard
          title="New Clients"
          value="+3,020"
          change="-14%"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard
          title="Total Sales"
          value="$173,000"
          change="+8%"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
      </div>

      {/* Welcome Card */}
      <div className="rounded-2xl bg-[#111C44] p-8 flex items-center justify-between relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0075FF] to-[#00A3FF] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        <div>
          <div className="text-lg font-semibold text-gray-300">Welcome back,</div>
          <div className="text-3xl font-bold text-white">Mark Johnson</div>
          <div className="text-gray-400 mt-2">Glad to see you again! Ask me anything.</div>
          <div className="mt-4 text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors">Tab to record →</div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" 
          alt="Dashboard visual" 
          className="rounded-2xl w-64 h-32 object-cover"
        />
      </div>

      {/* Charts Grid */}
      <StatsOverview />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Win Rate */}
        <div className="rounded-2xl bg-[#111C44] p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Win Rate</h3>
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#2D3748"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4C1D95"
                  strokeWidth="3"
                  strokeDasharray="85, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">85%</div>
                  <div className="text-sm text-gray-400">Based on races</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Racing Stats */}
        <div className="rounded-2xl bg-[#111C44] p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Racing Stats</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Best Lap</span>
                <span className="text-white">1:45.832</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full">
                <div className="h-full w-[85%] bg-indigo-600 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">RCF Earned</span>
                <span className="text-white">1,465</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full">
                <div className="h-full w-[65%] bg-purple-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 