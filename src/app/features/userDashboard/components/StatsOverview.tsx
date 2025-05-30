import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { dashboardService } from '../../../services/dashboardService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatItem = ({ icon, label, value }: StatItemProps) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-lg bg-indigo-600/20 flex items-center justify-center text-indigo-400">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  </div>
);

const StatsOverview = () => {
  const { data: monthlyData, isLoading: isLoadingMonthly } = useQuery({
    queryKey: ['monthlyData'],
    queryFn: dashboardService.getMonthlyData
  });

  const { data: weeklyStats, isLoading: isLoadingWeekly } = useQuery({
    queryKey: ['weeklyStats'],
    queryFn: dashboardService.getWeeklyStats
  });

  const { data: statsData, isLoading: isLoadingStats } = useQuery({
    queryKey: ['statsData'],
    queryFn: dashboardService.getStatsData
  });

  if (isLoadingMonthly || isLoadingWeekly || isLoadingStats) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111C44] rounded-2xl p-6 animate-pulse">
          <div className="h-[300px] bg-gray-700/50 rounded-lg"></div>
        </div>
        <div className="bg-[#111C44] rounded-2xl p-6 animate-pulse">
          <div className="h-[300px] bg-gray-700/50 rounded-lg"></div>
        </div>
      </div>
    );
  }

  const lineChartData = {
    labels: monthlyData?.labels,
    datasets: [
      {
        label: 'Earnings',
        data: monthlyData?.earnings,
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'Races',
        data: monthlyData?.races,
        fill: true,
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: 'rgba(139, 92, 246, 1)',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      }
    ]
  };

  const barChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9'],
    datasets: [{
      label: 'Días Jugados',
      data: weeklyStats,
      backgroundColor: 'rgba(139, 92, 246, 0.6)',
      borderColor: 'rgba(139, 92, 246, 1)',
      borderWidth: 1,
      borderRadius: 4,
      maxBarThickness: 20,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: 'rgb(156, 163, 175)',
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 12
          },
          usePointStyle: true,
          pointStyle: 'circle'
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14,
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 13,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            family: "'Inter', sans-serif",
          },
          padding: 10,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            family: "'Inter', sans-serif",
          },
          padding: 5,
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Race Earnings Overview */}
      <div className="bg-[#111C44] rounded-2xl p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-white">Race Earnings Overview</h3>
          <p className="text-green-500">(+5%) more than last season</p>
        </div>
        <div className="h-[300px] relative">
          <Line data={lineChartData} options={chartOptions} />
        </div>
      </div>

      {/* Active Racers Stats */}
      <div className="bg-[#111C44] rounded-2xl p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-white">Días Jugados</h3>
          <p className="text-green-500">(+23%) than last week</p>
        </div>
        <div className="h-[300px] relative">
          <Bar data={barChartData} options={chartOptions} />
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6">
          <StatItem
            icon={<span className="text-xl">🏎️</span>}
            label="Racers"
            value={statsData?.racers || "0"}
          />
          <StatItem
            icon={<span className="text-xl">🏁</span>}
            label="Races"
            value={statsData?.races || "0"}
          />
          <StatItem
            icon={<span className="text-xl">💰</span>}
            label="Earnings"
            value={statsData?.earnings || "0"}
          />
          <StatItem
            icon={<span className="text-xl">🏆</span>}
            label="Trophies"
            value={statsData?.trophies || "0"}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsOverview; 