import React from 'react';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import useDashboardData from '../../hooks/useDashboardData';
import loadingLottie from '../../assets/loading.json';
import Lottie from 'lottie-react';
import useAuth from '../../hooks/useAuth';

const UserDashboard = () => {
  const { data, loading } = useDashboardData();
const { user } = useAuth();
  if (loading) return <Lottie className='w-40 mx-auto' animationData={loadingLottie} loop />;

  const {  email, role, stats} = data || {};

  return (
    <div className="bg-linear-to-r from-blue-600 to-sky-400 min-h-screen  p-4 ">
      <h2 className="text-3xl font-bold mb-6 text-center text-amber-100">👤 User Dashboard</h2>

      {/* Profile Card */}
      <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
        
        <div>
           <p className="font-bold text-2xl">Name: {user.displayName}</p>
          <p className="text-gray-600 text-2xl font-bold">{email}</p>
          <p className="text-sm mt-1">
            Role: <span className="font-medium text-blue-600">{role}</span>
          </p>
         
          
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        <StatCard label="Total Products" value={stats.totalProducts} color="blue" />
        <StatCard label="Total Upvotes" value={stats.totalUpvotes} color="yellow" />
        <StatCard label="Accepted" value={stats.accepted} color="green" />
        <StatCard label="Rejected" value={stats.rejected} color="red" />
      </div>

    
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className={`bg-${color}-100 p-4 rounded-lg text-center shadow`}>
    <p className="text-gray-600">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default UserDashboard;
