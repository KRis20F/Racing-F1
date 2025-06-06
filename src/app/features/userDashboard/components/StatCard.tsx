import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
}

export const StatCard = ({ title, value, change, icon }: StatCardProps) => {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-[#111C44] rounded-[20px] p-4 relative overflow-hidden">
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
        <div className="w-12 h-12 rounded-xl bg-[#4318FF]/10 flex items-center justify-center backdrop-blur-sm">
          <div className="text-[#4318FF]">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};