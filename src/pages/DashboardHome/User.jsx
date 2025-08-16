import React from "react";
import ActivityTrendsChart from "./ActivityTrendsChart";
import useDashboardData from "../../hooks/useDashboardData";

const themeColors = {
  blue: { chart: "#2196F3" }
};

const User = () => {
  const { activityData } = useDashboardData();

  // Fallback data (test/demo)
  const fallbackActivity = [
    { date: "Day 1", value: 3 },
    { date: "Day 2", value: 6 },
    { date: "Day 3", value: 4 },
    { date: "Day 4", value: 7 },
    { date: "Day 5", value: 5 }
  ];

  const activity = activityData && activityData.length > 0
    ? activityData
    : fallbackActivity;

  const lineData = {
    labels: activity.map(item => item.date),
    datasets: [
      {
        label: "Activity Trends",
        data: activity.map(item => item.value),
        borderColor: themeColors.blue.chart,
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        fill: true,
        tension: 0.3
      }
    ]
  };

  return (
    <div className="p-4">
      <ActivityTrendsChart data={lineData} />
    </div>
  );
};

export default User;
