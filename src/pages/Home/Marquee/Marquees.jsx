import React from 'react';
import Marquee from 'react-fast-marquee';

const Marquees = () => {
    return (
         <div >
           <Marquee className='h-56' pauseOnHover={true} speed={80}>
            <img className='w-38 mx-16' src="https://i.ibb.co/mVJjk1st/download-1.png" alt="" />
            <img className='w-38 mx-16' src="https://i.ibb.co/kgy1hGwy/1c.png" alt="" />
            <img className='w-38 mx-16' src="https://i.ibb.co/jPvnM7bG/jaago-foundation.jpg" alt="" />
            <img className='w-38 mx-16' src="https://i.ibb.co/LdPTJysq/bd-clean.png" alt="" />
            <img className='w-38 mx-16' src="https://i.ibb.co/mFRGGVyD/images-3.jpg" alt="" />
            <img className='w-38' src="https://i.ibb.co/yTBMXtF/Voluntary-Service-Overseas-VSO-logo.png" alt="" />
           </Marquee>
           
        </div>
    );
};

export default Marquees;