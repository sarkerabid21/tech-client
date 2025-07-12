import React from 'react';
import Marquee from 'react-fast-marquee';

const Marquees = () => {
  return (
    <div className="bg-pink-100 py-10 px-4 lg:px-20">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-pink-700 mb-8">
        🌟 Trusted By Leading Organizations
      </h2>
        <div className='bg-pink-200 rounded-4xl lg:py-10 py-6 shadow-inner'>

      <Marquee pauseOnHover={true} speed={60} gradient={true} gradientColor={[255, 228, 235]}>
        {[
          "https://i.ibb.co/nszT1RvK/Screenshot-2025-07-12-225939-removebg-preview.png",
          "https://i.ibb.co/tSwPtDt/Screenshot-2025-07-12-225846-removebg-preview.png",
          "https://i.ibb.co/hFKf12hS/Screenshot-2025-07-12-225856-removebg-preview.png",
          "https://i.ibb.co/cSzFv04j/Screenshot-2025-07-12-225902-removebg-preview.png",
          "https://i.ibb.co/NnyTxdn7/Screenshot-2025-07-12-225953-removebg-preview.png",
          "https://i.ibb.co/ZzPFk8F6/Screenshot-2025-07-12-230004-removebg-preview.png"
          





        ].map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Logo ${idx + 1}`}
            className="h-16 lg:h-20  mx-10  hover:grayscale-0 transition duration-300 ease-in-out"
          />
        ))}
      </Marquee>
        </div>
      
    </div>
  );
};

export default Marquees;
