import React from 'react';

import AdminDashboard from './AdminDashboard';
import useUserRole from '../../hooks/useUserRole';
import Unauthorized from '../Unauthorized/Unauthorized';
import Lottie from 'lottie-react';
import loadingLottie from '../../assets/loading.json';
import UserDashboard from './UserDashboard';
import ModeratorDashboard from './ModeratorDashboard';

const DashboardHome = () => {
   const { role, loading } = useUserRole();

    if (loading) {
        return  <Lottie className='my-10' animationData={loadingLottie} loop={true} />
    }

    if(role === 'user'){
        return <UserDashboard></UserDashboard>
    }
    else if(role === 'moderator'){
        return <ModeratorDashboard></ModeratorDashboard>
    }
    else if(role ==='admin'){
        return <AdminDashboard></AdminDashboard>
    }
    else {
        return <Unauthorized></Unauthorized>
    }

};

export default DashboardHome;