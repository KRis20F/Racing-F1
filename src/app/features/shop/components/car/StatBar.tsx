import { StatBarProps } from '../types';

export const StatBar: React.FC<StatBarProps> = ({ label, value, maxValue, color }) => {
  const segments = 20;
  const filledSegments = Math.floor((value / maxValue) * segments);

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{Math.round((value / maxValue) * 100)}%</span>
      </div>
      <div className="flex gap-0.5">
        {[...Array(segments)].map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-sm transition-all duration-300 ${
              i < filledSegments
                ? `bg-${color}-500 hover:bg-${color}-400`
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}; 