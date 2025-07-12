import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#f44336"];

const Statistic = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/stats") // 🛠️ Replace with your actual endpoint
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  if (!stats) {
    return <div className="text-center py-10 font-bold">Loading statistics...</div>;
  }

  const pieData = [
  { label: "Accepted Products", value: stats.acceptedCount },
  { label: "Pending Products", value: stats.pendingCount },
  { label: "Total Reviews", value: stats.totalReviews },
  { label: "Total Users", value: stats.totalUsers },
];


  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">Platform Statistics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistic;
