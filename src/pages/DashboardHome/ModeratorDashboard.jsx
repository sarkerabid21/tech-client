import React, { useEffect, useState } from "react";
import { FaClipboardList, FaClock, FaFlag } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// Register Chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend);

const ModeratorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState({});

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/api/moderator-dashboard/${user.email}`).then((res) => {
        setData(res.data);
      });
    }
  }, [user?.email, axiosSecure]);

  const getChartData = (value, color) => ({
    labels: ["Completed", "Remaining"],
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
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    cutout: "70%"
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-sky-400 min-h-screen p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-lg">
        🛡️ Moderator Dashboard
      </h2>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow rounded-lg p-6 mb-6"
      >
        <p className="font-bold dark:text-black text-2xl">Name: {user.displayName}</p>
        <p className="text-gray-600">{data.email}</p>
        <p className="text-sm mt-1 dark:text-black">
          Role: <span className="text-purple-600 font-semibold">{data.role}</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-100 p-4 rounded-lg text-center shadow"
        >
          <Doughnut
            data={getChartData(data.totalProducts || 0, "#3b82f6")}
            options={chartOptions}
          />
          <FaClipboardList className="text-3xl text-blue-600 mx-auto mt-2 mb-2" />
          <p className="text-gray-600 font-medium">Total Products</p>
          <p className="text-2xl font-bold">
            <CountUp end={data.totalProducts || 0} duration={1.5} />
          </p>
        </motion.div>

        {/* Pending Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-yellow-100 p-4 rounded-lg text-center shadow"
        >
          <Doughnut
            data={getChartData(data.pendingProducts || 0, "#facc15")}
            options={chartOptions}
          />
          <FaClock className="text-3xl text-yellow-600 mx-auto mt-2 mb-2" />
          <p className="text-gray-600 font-medium">Pending Products</p>
          <p className="text-2xl font-bold">
            <CountUp end={data.pendingProducts || 0} duration={1.5} />
          </p>
        </motion.div>

        {/* Reported Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-red-100 p-4 rounded-lg text-center shadow"
        >
          <Doughnut
            data={getChartData(data.reportedCount || 0, "#f87171")}
            options={chartOptions}
          />
          <FaFlag className="text-3xl text-red-600 mx-auto mt-2 mb-2" />
          <p className="text-gray-600 font-medium">Reported Items</p>
          <p className="text-2xl font-bold">
            <CountUp end={data.reportedCount || 0} duration={1.5} />
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
