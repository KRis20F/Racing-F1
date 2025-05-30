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

const SalesOverview = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Mobile apps",
        data: [400, 250, 300, 220, 500, 250, 400, 230, 300, 350, 250, 400],
        fill: true,
        backgroundColor: "rgba(147, 51, 234, 0.2)", // purple-600 with opacity
        borderColor: "rgb(147, 51, 234)", // purple-600
        tension: 0.4,
      },
      {
        label: "Websites",
        data: [200, 300, 350, 250, 400, 350, 500, 350, 400, 450, 300, 500],
        fill: true,
        backgroundColor: "rgba(79, 70, 229, 0.2)", // indigo-600 with opacity
        borderColor: "rgb(79, 70, 229)", // indigo-600
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "rgb(156, 163, 175)", // gray-400
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
      title: {
        display: false,
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
        },
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
  };

  return (
    <div className="w-full p-6 bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-2xl border border-purple-100 dark:border-white/20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Sales Overview
        </h2>
        <p className="text-sm text-green-500 font-semibold">
          (+5%) more in 2021
        </p>
      </div>
      <div className="w-full h-[400px]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default SalesOverview;
