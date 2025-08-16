import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#f44336"];

const Statistic = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://tech-server-blush.vercel.app/api/stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold text-indigo-600">
        Loading statistics...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold text-red-500">
        Failed to load statistics.
      </div>
    );
  }

  const pieData = [
    { label: "Accepted Products", value: stats.acceptedCount },
    { label: "Pending Products", value: stats.pendingCount },
    { label: "Total Reviews", value: stats.totalReviews },
    { label: "Total Users", value: stats.totalUsers },
  ];

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-indigo-700">
        📊 Platform Statistics
      </h2>

      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid #ddd",
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistic;
