import React from 'react';
import loadingLottie from '../../../assets/Live chatbot.json';
import Lottie from 'lottie-react';
import { Link } from 'react-router';
const ComingFeature = () => {
    return (
        <div  className="text-center">
            <h1 className='bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-400 via-blue-600 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)] lg:mt-40 mt-20 font-bold lg:text-4xl text-xl'>This feature will be coming soon</h1>
            <Lottie className=' mx-auto max-w-xs' animationData={loadingLottie} loop={true} />
            <Link to="/">
                <button className="mb-10 px-6 bg-blue-600 rounded-full py-2 btn-custom text-white rounded-lg cursor-pointer hover:bg-pink-700 transition">
                    Go to Home
                </button>
            </Link>
        </div>
    );
};

export default ComingFeature;