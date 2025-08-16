import React from "react";
import { FaBoxOpen, FaThumbsUp, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useDashboardData from "../../hooks/useDashboardData";
import loadingLottie from "../../assets/loading.json";
import Lottie from "lottie-react";
import useAuth from "../../hooks/useAuth";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { motion } from "framer-motion";
import ActivityTrendsChart from "./ActivityTrendsChart";
import User from "./User";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Theme colors
const themeColors = {
  blue: { bg: "bg-blue-100", text: "text-blue-600", chart: "#2196F3" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-600", chart: "#FFC107" },
  green: { bg: "bg-green-100", text: "text-green-600", chart: "#4CAF50" },
  red: { bg: "bg-red-100", text: "text-red-600", chart: "#F44336" }
};

const UserDashboard = () => {
  const { data, loading } = useDashboardData();
  const { user } = useAuth();

  if (loading)
    return <Lottie className="w-40 mx-auto" animationData={loadingLottie} loop />;

  const { email, role, stats, activityData } = data || {};

  // Doughnut chart data
  const doughnutData = {
    labels: ["Accepted", "Rejected"],
    datasets: [
      {
        data: [stats.accepted, stats.rejected],
        backgroundColor: [themeColors.green.chart, themeColors.red.chart],
        borderWidth: 1
      }
    ]
  };

  // Line chart data
  const lineData = {
    labels: activityData?.map(item => item.date) || [],
    datasets: [
      {
        label: "Activity Trends",
        data: activityData?.map(item => item.value) || [],
        borderColor: themeColors.blue.chart,
        backgroundColor: "#BBDEFB",
        fill: true,
        tension: 0.3
      }
    ]
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-sky-400 min-h-screen p-4">
      <motion.h2
        className="text-3xl font-bold mb-6 text-center text-amber-100"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        👤 User Dashboard
      </motion.h2>

      {/* Profile Card */}
      <motion.div
        className="bg-white shadow rounded-lg p-6 mb-6 flex flex-col sm:flex-row items-center gap-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex-1">
          <p className="font-bold dark:text-black text-2xl">Name: {user.displayName}</p>
          <p className="text-gray-600">{email}</p>
          <p className="text-sm mt-1 dark:text-black">
            Role: <span className="font-medium text-blue-600">{role}</span>
          </p>
        </div>
      </motion.div>

      {/* Stats + Doughnut */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          {[
            { icon: <FaBoxOpen />, label: "Total Products", value: stats.totalProducts, color: "blue" },
            { icon: <FaThumbsUp />, label: "Total Upvotes", value: stats.totalUpvotes, color: "yellow" },
            { icon: <FaCheckCircle />, label: "Accepted", value: stats.accepted, color: "green" },
            { icon: <FaTimesCircle />, label: "Rejected", value: stats.rejected, color: "red" }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <StatCard {...item} />
            </motion.div>
          ))}
        </div>

        {/* Doughnut Chart */}
        <motion.div
          className="bg-white rounded-lg shadow p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4">Accepted vs Rejected</h3>
          <Doughnut data={doughnutData} />
        </motion.div>
      </div>

      {/* Reusable Line Chart */}
     <User></User>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => {
  const theme = themeColors[color] || themeColors.blue;
  return (
    <div className={`${theme.bg} p-4 rounded-lg text-center shadow flex flex-col items-center`}>
      <div className={`${theme.text} text-3xl mb-2`}>{icon}</div>
      <p className="text-gray-600">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default UserDashboard;
