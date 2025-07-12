import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';
import loadingLottie from '../assets/loading.json';
import Lottie from 'lottie-react';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();

    if(loading){
        return <Lottie className='my-10' animationData={loadingLottie} loop={true} />

    }
    if(!user){
        <Navigate to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;