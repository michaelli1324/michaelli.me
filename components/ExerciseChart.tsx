import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import exerciseData from "../data/exercise.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const ExerciseChart = () => {
  const { labels, minutes } = useMemo(() => {
    const labels = exerciseData.map((d) => {
      const date = new Date(d.date + "T00:00:00");
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    });
    const minutes = exerciseData.map((d) => d.minutes);
    return { labels, minutes };
  }, []);

  const avg = Math.round(minutes.reduce((a, b) => a + b, 0) / minutes.length);
  const total = minutes.reduce((a, b) => a + b, 0);
  const totalHours = Math.round(total / 60);

  const colors = minutes.map((m) => (m >= 120 ? "#34d399" : m >= 60 ? "#fbbf24" : "#f87171"));

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 200 },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (item) => {
            const mins = Number(item.raw);
            const h = Math.floor(mins / 60);
            const m = mins % 60;
            return h > 0 ? `${h}h ${m}m` : `${m}m`;
          },
        },
        backgroundColor: "#1f2937",
        titleColor: "#f9fafb",
        bodyColor: "#e5e7eb",
        borderColor: "#374151",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280",
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
        },
        grid: { display: false },
      },
      y: {
        ticks: {
          color: "#6b7280",
          callback: (value) => {
            const mins = Number(value);
            return mins >= 60 ? `${mins / 60}h` : `${mins}m`;
          },
        },
        grid: { color: "#e5e7eb" },
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        data: minutes,
        backgroundColor: colors,
        borderRadius: 2,
      },
    ],
  };

  return (
    <div className="my-8">
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500 mb-4">
        <span>
          Daily avg:{" "}
          <span className="text-gray-800 font-medium">
            {Math.floor(avg / 60)}h {avg % 60}m
          </span>
        </span>
        <span>
          Total:{" "}
          <span className="text-gray-800 font-medium">~{totalHours} hours</span>
        </span>
      </div>
      <div style={{ height: 300 }}>
        <Bar options={options} data={chartData} />
      </div>
      <div className="flex gap-4 text-xs text-gray-600 mt-3">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: "#34d399" }} />
          2+ hours
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: "#fbbf24" }} />
          1-2 hours
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: "#f87171" }} />
          Under 1 hour
        </span>
      </div>
    </div>
  );
};

export default ExerciseChart;
