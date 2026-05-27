import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import caloriesData from "../data/calories.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CaloriesChart = () => {
  const { labels, basal, active } = useMemo(() => {
    const labels = caloriesData.map((d) => {
      const date = new Date(d.date + "T00:00:00");
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    });
    const basal = caloriesData.map((d) => d.basal);
    const active = caloriesData.map((d) => d.active);
    return { labels, basal, active };
  }, []);

  const avgTotal = Math.round(
    caloriesData.reduce((a, d) => a + d.basal + d.active, 0) / caloriesData.length
  );
  const avgActive = Math.round(
    active.reduce((a, b) => a + b, 0) / active.length
  );

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 200 },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          padding: 16,
          color: "#6b7280",
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          afterBody: (items) => {
            const idx = items[0].dataIndex;
            const total = basal[idx] + active[idx];
            return `Total: ${total.toLocaleString()} Cal`;
          },
          label: (item) => `${item.dataset.label}: ${Number(item.raw).toLocaleString()} Cal`,
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
        stacked: true,
        ticks: {
          color: "#6b7280",
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
        },
        grid: { display: false },
      },
      y: {
        stacked: true,
        ticks: {
          color: "#6b7280",
          callback: (value) => `${Number(value).toLocaleString()}`,
        },
        grid: { color: "#e5e7eb" },
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Resting",
        data: basal,
        backgroundColor: "#94a3b8",
        borderRadius: 0,
      },
      {
        label: "Active",
        data: active,
        backgroundColor: "#f59e0b",
        borderRadius: 2,
      },
    ],
  };

  return (
    <div className="my-8">
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500 mb-4">
        <span>
          Avg total:{" "}
          <span className="text-gray-800 font-medium">
            {avgTotal.toLocaleString()} Cal/day
          </span>
        </span>
        <span>
          Avg active:{" "}
          <span className="text-gray-800 font-medium">
            {avgActive.toLocaleString()} Cal/day
          </span>
        </span>
      </div>
      <div style={{ height: 300 }}>
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
};

export default CaloriesChart;
