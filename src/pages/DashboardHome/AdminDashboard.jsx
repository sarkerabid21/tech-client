import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { MdReport, MdReviews, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";
import CountUp from "react-countup";

// Register Chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/api/admin-dashboard/${user.email}`)
        .then((res) => setDashboardData(res.data))
        .catch((err) => console.error("Admin dashboard error:", err));
    }
  }, [user?.email, axiosSecure]);

  if (!dashboardData) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  const { role, stats, recentUsers } = dashboardData;

  const getChartData = (value, color) => ({
    labels: ["Count", "Remaining"],
    datasets: [
      {
        data: [value || 0, 100 - (value || 0)],
        backgroundColor: [color, "#e5e7eb"],
        borderWidth: 0
      }
    ]
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw;
            return `${label}: ${value}%`;
          }
        }
      }
    },
    cutout: "70%"
  };

  const statItems = [
    { label: "Total Users", value: stats.totalUsers, color: "#3b82f6", icon: <FaUserShield className="mx-auto text-3xl text-blue-600" /> },
    { label: "Total Products", value: stats.totalProducts, color: "#facc15", icon: <MdOutlineProductionQuantityLimits className="mx-auto text-3xl text-yellow-600" /> },
    { label: "Total Reviews", value: stats.totalReviews, color: "#22c55e", icon: <MdReviews className="mx-auto text-3xl text-green-600" /> },
    { label: "Reports", value: stats.reportedCount, color: "#f87171", icon: <MdReport className="mx-auto text-3xl text-red-600" /> }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-sky-400 min-h-screen p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">🛠️ Admin Dashboard</h2>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow rounded-lg p-6 mb-6"
      >
        <p className="font-bold text-2xl dark:text-black">Name: {user.displayName}</p>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-blue-600">Role: {role}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {statItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 + idx * 0.1 }}
            className="bg-white p-4 rounded-lg text-center shadow"
          >
            <Doughnut
              data={getChartData(item.value, item.color)}
              options={chartOptions}
            />
            <div className="mt-2">{item.icon}</div>
            <p className="text-gray-600 font-medium">{item.label}</p>
            <p className="text-2xl font-bold">
              <CountUp end={item.value || 0} duration={1.5} />
            </p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white p-4 shadow rounded">
        <h4 className="text-lg font-semibold mb-3">🆕 Recent Users</h4>
        <ul className="divide-y">
          {recentUsers.map((u, idx) => (
            <li key={idx} className="py-2 text-gray-700">
              {u.name} - <span className="text-blue-500">{u.email}</span> ({u.role})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
