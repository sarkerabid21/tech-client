import Lottie from 'lottie-react';
import React from 'react';
import errorLottie from '../../../assets/Error 404.json';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className="relative  w-full max-w-xl mx-auto">
  <Lottie className='w-full' animationData={errorLottie} loop={true} />
  <div className="absolute left-50 flex justify-center items-center">
    <Link to='/' className='btn bg-pink-600 text-white font-bold rounded-2xl'>
      Back to your Home
    </Link>
  </div>
</div>

    );
};

export default Error;