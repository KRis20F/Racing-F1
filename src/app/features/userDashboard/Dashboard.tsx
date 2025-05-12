import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { FaCoins, FaTrophy, FaUsers, FaCarSide } from 'react-icons/fa';

const cards = [
  { title: "Total Tokens", value: "53,000 RCF", change: "+55%", icon: FaCoins, color: "from-[#0075FF] to-[#00A3FF]" },
  { title: "Active Racers", value: "2,300", change: "+5%", icon: FaUsers, color: "from-[#FF0080] to-[#7928CA]" },
  { title: "Total Races", value: "3,020", change: "-14%", icon: FaCarSide, color: "from-[#FF8D3A] to-[#FF559A]" },
  { title: "Trophies", value: "173", change: "+8%", icon: FaTrophy, color: "from-[#01B574] to-[#00F7BF]" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#0B1437] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl mb-6">Dashboard</h1>
        {/* Top Cards */}
        <div className="grid grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className={`bg-[#111C44] rounded-2xl p-6 flex items-center gap-4 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}>
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${card.color}`} style={{ mixBlendMode: 'overlay' }} />
              <div className="text-3xl relative z-10"><card.icon /></div>
              <div>
                <div className="text-lg font-medium">{card.title}</div>
                <div className="text-2xl font-bold">{card.value}</div>
                <div className={`text-sm ${card.change.startsWith("-") ? "text-red-400" : "text-green-400"}`}>{card.change}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Welcome Banner */}
        <div className="rounded-2xl bg-[#111C44] p-8 flex items-center justify-between relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0075FF] to-[#00A3FF] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <div>
            <div className="text-lg font-semibold">Welcome back,</div>
            <div className="text-3xl font-bold">Mark Johnson</div>
            <div className="text-white/70 mt-2">Glad to see you again! Ask me anything.</div>
            <div className="mt-4 text-indigo-300 cursor-pointer">Tab to record →</div>
          </div>
          <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" alt="jellyfish" className="rounded-2xl w-64 h-32 object-cover" />
        </div>
        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Satisfaction Rate */}
          <div className="bg-[#111C44] rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF0080] to-[#7928CA] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="text-lg font-medium mb-2">Win Rate</div>
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#FF0080] to-[#7928CA] flex items-center justify-center mb-4 relative">
              <div className="absolute inset-2 rounded-full bg-[#111C44]" />
              <div className="text-4xl font-bold relative z-10">95%</div>
            </div>
            <div className="text-white/60">Based on races</div>
          </div>
          {/* Racing Stats */}
          <div className="bg-[#111C44] rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF8D3A] to-[#FF559A] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div>
              <div className="text-lg font-medium mb-2">Racing Stats</div>
              <div className="flex justify-between mb-4">
                <div>
                  <div className="text-white/60 text-sm">Best Lap</div>
                  <div className="text-xl font-bold">1:45.832</div>
                </div>
                <div>
                  <div className="text-white/60 text-sm">RCF Earned</div>
                  <div className="text-xl font-bold">1,465</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-white/60 text-sm mb-1">Driver Rating</div>
              <div className="text-4xl font-bold text-[#FF8D3A]">9.3</div>
              <div className="text-white/60">Overall Score</div>
            </div>
          </div>
        </div>
        {/* Sales Overview & Active Users */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#111C44] rounded-2xl p-8 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0075FF] to-[#00A3FF] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="text-lg font-medium mb-2">Race Performance</div>
            <div className="text-[#0075FF] text-sm mb-4">(+5%) better than last month</div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { name: 'Jan', value: 50 },
                  { name: 'Feb', value: 30 },
                  { name: 'Mar', value: 70 },
                  { name: 'Apr', value: 40 },
                  { name: 'May', value: 90 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1B254B" />
                  <XAxis dataKey="name" stroke="#fff" opacity={0.5} />
                  <YAxis stroke="#fff" opacity={0.5} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#0075FF" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-[#111C44] rounded-2xl p-8 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-[#01B574] to-[#00F7BF] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="text-lg font-medium mb-2">Active Racers</div>
            <div className="text-[#01B574] text-sm mb-4">(+23%) than last week</div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { name: 'Mon', value: 2100 },
                  { name: 'Tue', value: 3200 },
                  { name: 'Wed', value: 2800 },
                  { name: 'Thu', value: 4300 },
                  { name: 'Fri', value: 3800 },
                  { name: 'Sat', value: 4100 },
                  { name: 'Sun', value: 4800 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1B254B" />
                  <XAxis dataKey="name" stroke="#fff" opacity={0.5} />
                  <YAxis stroke="#fff" opacity={0.5} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#01B574" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <div className="text-white/60 text-xs">Users</div>
                <div className="font-bold text-lg">32,984</div>
              </div>
              <div>
                <div className="text-white/60 text-xs">Clicks</div>
                <div className="font-bold text-lg">2.42m</div>
              </div>
              <div>
                <div className="text-white/60 text-xs">Sales</div>
                <div className="font-bold text-lg">2,400$</div>
              </div>
              <div>
                <div className="text-white/60 text-xs">Items</div>
                <div className="font-bold text-lg">320</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 