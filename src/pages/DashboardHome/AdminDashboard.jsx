import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { MdReport, MdReviews, MdOutlineProductionQuantityLimits } from "react-icons/md";

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
  }, [user, axiosSecure]);

  if (!dashboardData) {
    return <span className="loading loading-spinner text-primary"></span>
  }

  const {  role, stats, recentUsers } = dashboardData;

  return (
    <div className="bg-linear-to-r from-blue-600 to-sky-400 min-h-screen  p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">🛠️ Admin Dashboard</h2>

      <div className="bg-white p-4 shadow rounded-md mb-6">
        <p className="font-bold text-2xl">Name: {user.displayName}</p>
        <p className="text-gray-600 ">{user.email}</p>
        <p className="text-sm text-blue-600">Role: {role}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <p className="text-gray-600">Total Users</p>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
          <FaUserShield className="mx-auto text-3xl text-blue-600" />
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <p className="text-gray-600">Total Products</p>
          <p className="text-2xl font-bold">{stats.totalProducts}</p>
          <MdOutlineProductionQuantityLimits className="mx-auto text-3xl text-yellow-600" />
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <p className="text-gray-600">Total Reviews</p>
          <p className="text-2xl font-bold">{stats.totalReviews}</p>
          <MdReviews className="mx-auto text-3xl text-green-600" />
        </div>
        <div className="bg-red-100 p-4 rounded shadow text-center">
          <p className="text-gray-600">Reports</p>
          <p className="text-2xl font-bold">{stats.reportedCount}</p>
          <MdReport className="mx-auto text-3xl text-red-600" />
        </div>
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
