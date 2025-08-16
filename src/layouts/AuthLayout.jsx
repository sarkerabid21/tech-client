import React from 'react';
import { Outlet } from 'react-router';
import TechLogo from '../pages/shared/TechLogo/TechLogo';
import signInLottie from '../assets/Animation - 1748917608263.json';
import Lottie from 'lottie-react';


const AuthLayout = () => {
  return (
    <div className=" min-h-screen  flex items-center justify-center lg:px-6 px-4 dark:bg-cyan-950 bg-blue-900">
    
      
      <div className="p-12 bg-white rounded-xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
       
       
        <div className="w-full lg:w-1/2 ">
         <div className='mb-8'>
        <TechLogo></TechLogo>
      </div>
      <div className='lg:p-20 '>
 <Outlet />
      </div>
         
        </div>
         <div className="hidden lg:block lg:w-1/2 p-10 items-center">
          
          
          <Lottie className='my-10' animationData={signInLottie} loop={true} />
        
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
