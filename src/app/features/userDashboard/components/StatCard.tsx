interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, icon }: StatCardProps) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-[#111C44] rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-500">
          {icon}
        </div>
        <span className={`text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
      </div>
      <div className="text-gray-400 text-sm">{title}</div>
      <div className="text-2xl font-bold text-white mt-1">{value}</div>
    </div>
  );
};

export default StatCard; 