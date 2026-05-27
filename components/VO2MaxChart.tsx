import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import vo2maxData from "../data/vo2max.json";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const VO2MaxChart = () => {
  const { labels, values } = useMemo(() => {
    const labels = vo2maxData.map((d) => {
      const date = new Date(d.date + "T00:00:00");
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    });
    const values = vo2maxData.map((d) => d.value);
    return { labels, values };
  }, []);

  const first = values[0];
  const last = values[values.length - 1];

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 200 },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (item) => `${Number(item.raw).toFixed(1)} mL/min/kg`,
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
        ticks: { color: "#6b7280" },
        grid: { color: "#e5e7eb" },
        suggestedMin: Math.floor(Math.min(...values) - 1),
        suggestedMax: Math.ceil(Math.max(...values) + 1),
      },
    },
    elements: {
      point: { radius: 2, hoverRadius: 5 },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: "#8b5cf6",
        borderWidth: 2,
        fill: false,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="my-8">
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500 mb-4">
        <span>
          Start:{" "}
          <span className="text-gray-800 font-medium">{first.toFixed(1)} mL/min/kg</span>
        </span>
        <span>
          End:{" "}
          <span className="text-gray-800 font-medium">{last.toFixed(1)} mL/min/kg</span>
        </span>
      </div>
      <div style={{ height: 300 }}>
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default VO2MaxChart;
