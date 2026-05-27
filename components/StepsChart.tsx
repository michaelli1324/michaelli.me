import { useMemo, useState, useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { Bar } from "react-chartjs-2";
import stepsData from "../data/steps.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, annotationPlugin);

const GOAL_SWITCH_DATE = "2024-01-16";

function getGoalForDate(date: string): number {
  return date < GOAL_SWITCH_DATE ? 10000 : 20000;
}

type WindowSize = "1W" | "2W" | "1M" | "All";
const WINDOW_DAYS: Record<WindowSize, number | null> = {
  "1W": 7,
  "2W": 14,
  "1M": 31,
  All: null,
};

const StepsChart = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>("All");
  const [offset, setOffset] = useState(0);

  const totalDays = stepsData.length;
  const windowDays = WINDOW_DAYS[windowSize];
  const visibleCount = windowDays ?? totalDays;
  const maxOffset = windowDays ? Math.max(0, totalDays - windowDays) : 0;

  const clampedOffset = Math.min(offset, maxOffset);

  const handleWindowChange = useCallback((w: WindowSize) => {
    setWindowSize(w);
    setOffset(0);
  }, []);

  const handlePrev = useCallback(() => {
    setOffset((o) => Math.max(0, o - (WINDOW_DAYS[windowSize] ?? 0)));
  }, [windowSize]);

  const handleNext = useCallback(() => {
    setOffset((o) => Math.min(maxOffset, o + (WINDOW_DAYS[windowSize] ?? 0)));
  }, [windowSize, maxOffset]);

  const slicedData = useMemo(() => {
    const slice = stepsData.slice(clampedOffset, clampedOffset + visibleCount);
    const labels = slice.map((d) => {
      const date = new Date(d.date + "T00:00:00");
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    });
    const steps = slice.map((d) => d.steps);
    const dates = slice.map((d) => d.date);
    const colors = steps.map((s, i) => (s >= getGoalForDate(dates[i]) ? "#2dd4bf" : "#f87171"));
    return { labels, steps, dates, colors };
  }, [clampedOffset, visibleCount]);

  const { labels, steps, dates, colors } = slicedData;
  const avg = Math.round(steps.reduce((a, b) => a + b, 0) / steps.length);
  const daysAboveGoal = steps.filter((s, i) => s >= getGoalForDate(dates[i])).length;

  const canGoPrev = windowDays !== null && clampedOffset > 0;
  const canGoNext = windowDays !== null && clampedOffset < maxOffset;

  const dateRange = useMemo(() => {
    const start = stepsData[clampedOffset]?.date;
    const end = stepsData[Math.min(clampedOffset + visibleCount - 1, totalDays - 1)]?.date;
    if (!start || !end) return "";
    const fmt = (d: string) =>
      new Date(d + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    return `${fmt(start)} - ${fmt(end)}`;
  }, [clampedOffset, visibleCount, totalDays]);

  // Determine which goal lines to show based on visible date range
  const has10kGoal = dates.some((d) => d < GOAL_SWITCH_DATE);
  const has20kGoal = dates.some((d) => d >= GOAL_SWITCH_DATE);

  // Find the boundary index within the visible slice where the goal switches
  const switchIndex = dates.findIndex((d) => d >= GOAL_SWITCH_DATE);

  const annotations: Record<string, any> = {};

  if (has10kGoal && has20kGoal && switchIndex > 0) {
    // Both goals visible — draw two separate line segments
    annotations.goal10k = {
      type: "line",
      yMin: 10000,
      yMax: 10000,
      xMin: 0,
      xMax: switchIndex - 0.5,
      borderColor: "#9ca3af",
      borderWidth: 1.5,
      borderDash: [6, 4],
      label: {
        display: true,
        content: "10k goal",
        position: "start",
        backgroundColor: "transparent",
        color: "#6b7280",
        font: { size: 11 },
      },
    };
    annotations.goal20k = {
      type: "line",
      yMin: 20000,
      yMax: 20000,
      xMin: switchIndex - 0.5,
      xMax: dates.length - 1,
      borderColor: "#9ca3af",
      borderWidth: 1.5,
      borderDash: [6, 4],
      label: {
        display: true,
        content: "20k goal",
        position: "start",
        backgroundColor: "transparent",
        color: "#6b7280",
        font: { size: 11 },
      },
    };
  } else if (has10kGoal) {
    annotations.goal10k = {
      type: "line",
      yMin: 10000,
      yMax: 10000,
      borderColor: "#9ca3af",
      borderWidth: 1.5,
      borderDash: [6, 4],
      label: {
        display: true,
        content: "10k goal",
        position: "start",
        backgroundColor: "transparent",
        color: "#6b7280",
        font: { size: 11 },
      },
    };
  } else {
    annotations.goal20k = {
      type: "line",
      yMin: 20000,
      yMax: 20000,
      borderColor: "#9ca3af",
      borderWidth: 1.5,
      borderDash: [6, 4],
      label: {
        display: true,
        content: "20k goal",
        position: "start",
        backgroundColor: "transparent",
        color: "#6b7280",
        font: { size: 11 },
      },
    };
  }

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 200 },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (items) => items[0].label,
          label: (item) => `${Number(item.raw).toLocaleString()} steps`,
        },
        backgroundColor: "#1f2937",
        titleColor: "#f9fafb",
        bodyColor: "#e5e7eb",
        borderColor: "#374151",
        borderWidth: 1,
      },
      annotation: { annotations },
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280",
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: windowDays && windowDays <= 14 ? windowDays : 8,
        },
        grid: { display: false },
      },
      y: {
        ticks: {
          color: "#6b7280",
          callback: (value) => `${Number(value) / 1000}k`,
        },
        grid: { color: "#e5e7eb" },
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        data: steps,
        backgroundColor: colors,
        borderRadius: 2,
      },
    ],
  };

  const btnBase = "px-2.5 py-1 rounded text-xs font-medium transition-colors";
  const btnActive = "bg-gray-200 text-gray-800";
  const btnInactive = "text-gray-500 hover:text-gray-800 hover:bg-gray-100";
  const navBtn =
    "px-2 py-1 rounded text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors";

  return (
    <div className="my-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
          <span>
            Avg:{" "}
            <span className="text-gray-800 font-medium">
              {avg.toLocaleString()} steps/day
            </span>
          </span>
          <span>
            Days at goal:{" "}
            <span className="text-gray-800 font-medium">
              {daysAboveGoal}/{steps.length}
            </span>
          </span>
        </div>
        <div className="flex gap-1">
          {(Object.keys(WINDOW_DAYS) as WindowSize[]).map((w) => (
            <button
              key={w}
              onClick={() => handleWindowChange(w)}
              className={`${btnBase} ${windowSize === w ? btnActive : btnInactive}`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {windowDays && (
        <div className="flex items-center justify-between mb-2">
          <button onClick={handlePrev} disabled={!canGoPrev} className={navBtn}>
            &larr; Prev
          </button>
          <span className="text-xs text-gray-600">{dateRange}</span>
          <button onClick={handleNext} disabled={!canGoNext} className={navBtn}>
            Next &rarr;
          </button>
        </div>
      )}

      <div style={{ height: 300 }}>
        <Bar options={options} data={chartData} />
      </div>
      <div className="flex justify-center gap-4 text-xs text-gray-600 mt-3">
        <span className="flex items-center gap-1">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ backgroundColor: "#2dd4bf" }}
          />
          At or above goal
        </span>
        <span className="flex items-center gap-1">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ backgroundColor: "#f87171" }}
          />
          Below goal
        </span>
      </div>
    </div>
  );
};

export default StepsChart;
