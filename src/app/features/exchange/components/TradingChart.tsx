import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TradingChartProps {
  pair: string;
}

const TradingChart: React.FC<TradingChartProps> = ({ pair }) => {
  const data = {
    labels: ["2024", "2", "03 ene '24", "00:00:00"],
    datasets: [
      {
        label: "Buy Orders",
        data: [10.0, 11.5, 13.0, 12.0],
        fill: true,
        backgroundColor: "rgba(45, 212, 191, 0.2)", // teal-400 with opacity
        borderColor: "rgb(45, 212, 191)", // teal-400
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: "Sell Orders",
        data: [9.0, 10.5, 11.0, 12.8],
        fill: true,
        backgroundColor: "rgba(147, 51, 234, 0.2)", // purple-600 with opacity
        borderColor: "rgb(147, 51, 234)", // purple-600
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          color: "rgb(156, 163, 175)", // gray-400
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.8)", // gray-900 with opacity
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
        displayColors: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: "rgba(156, 163, 175, 0.1)", // gray-400 with opacity
          drawBorder: false,
        },
        ticks: {
          color: "rgb(156, 163, 175)", // gray-400
          font: {
            family: "'Inter', sans-serif",
          },
          callback: (value: number) => value.toFixed(2),
        },
        min: 8,
        max: 14,
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgb(156, 163, 175)", // gray-400
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{pair} Chart</h3>
          <p className="text-sm text-green-500 font-semibold">
            24h Change: +5.67%
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded bg-white/5 text-gray-400 text-sm hover:bg-white/10 transition-colors">
            1H
          </button>
          <button className="px-3 py-1 rounded bg-white/5 text-gray-400 text-sm hover:bg-white/10 transition-colors">
            1D
          </button>
          <button className="px-3 py-1 rounded bg-white/5 text-gray-400 text-sm hover:bg-white/10 transition-colors">
            1W
          </button>
        </div>
      </div>
      <div className="flex-1">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default TradingChart;
