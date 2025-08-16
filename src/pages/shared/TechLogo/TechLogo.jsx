import React from 'react';
import { NavLink } from 'react-router';

const TechLogo = () => {
    return (
        <NavLink to="/"><div className='flex items-end mb-2'>
            
             <div className="text-2xl font-bold dark:text-pink-100 text-indigo-600 pacifico-regular" >
              NextGenTech
            </div>
            {/* <p className='text-3xl font-bold -ms-2'>ProFAST</p> */}
        </div></NavLink>
    );
};

export default TechLogo;