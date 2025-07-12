import React, { useEffect, useState } from 'react';
import { FaClipboardList, FaClock, FaFlag } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ModeratorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState({});

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/api/moderator-dashboard/${user.email}`).then(res => {
        setData(res.data);
      });
    }
  }, [user?.email, axiosSecure]);

  return (
    <div className="bg-linear-to-r from-blue-600 to-sky-400 min-h-screen  p-4">
      <h2 className="text-3xl font-bold text-center mb-6">🛡️ Moderator Dashboard</h2>

      <div className="bg-white shadow rounded-lg p-6">
       
        <p className="text-gray-600 text-2xl font-bold">{data.email}</p>
        <p className="text-sm mt-1">Role: <span className="text-purple-600 font-semibold">{data.role}</span></p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-100 p-4 rounded-lg text-center shadow">
          <FaClipboardList className="text-3xl text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600">Total Products</p>
          <p className="text-2xl font-bold">{data.totalProducts}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg text-center shadow">
          <FaClock className="text-3xl text-yellow-600 mx-auto mb-2" />
          <p className="text-gray-600">Pending Products</p>
          <p className="text-2xl font-bold">{data.pendingProducts}</p>
        </div>

        <div className="bg-red-100 p-4 rounded-lg text-center shadow">
          <FaFlag className="text-3xl text-red-600 mx-auto mb-2" />
          <p className="text-gray-600">Reported Items</p>
          <p className="text-2xl font-bold">{data.reportedCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
