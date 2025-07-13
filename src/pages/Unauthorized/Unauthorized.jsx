import React from 'react';
//
import Lottie from 'lottie-react';
import lockAnimation from '../../assets/Secure.json'; 
import { Link } from 'react-router';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-tr from-red-50 to-red-100 text-red-700">
      <div className="max-w-md w-full text-center">
        <div className="w-60 mx-auto mb-6">
          <Lottie animationData={lockAnimation} loop={true} />
        </div>
        <h1 className="text-4xl font-bold mb-2">⛔ Access Denied</h1>
        <p className="mb-6 text-lg">You don’t have permission to view this page.</p>
        <Link
          to="/"
          className="btn btn-outline btn-error font-semibold px-6 py-2 rounded-lg transition duration-300 hover:bg-red-600 hover:text-white"
        >
          🔙 Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
