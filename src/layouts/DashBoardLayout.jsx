import React from 'react';
import TechLogo from '../pages/shared/TechLogo/TechLogo';
import { NavLink, Outlet } from 'react-router';
import useUserRole from '../hooks/useUserRole';
// import { Outlet } from 'react-router';

const DashBoardLayout = () => {
     const { role, loading } = useUserRole();
    //  console.log(role)
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar lg:hidden bg-base-300 w-full px-4">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 text-xl font-bold">Dashboard</div>
          
        </div>
        <Outlet></Outlet>

        {/* Page body content here */}
       
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
           <TechLogo></TechLogo>
           <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="myProfile" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>My Profile Page</NavLink></li>
          <li><NavLink to="addProduct" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>AddProduct</NavLink></li>
          <li><NavLink to="myProduct" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>My Product</NavLink></li>

         { !loading && role === 'moderator' &&
            <>
             <li><NavLink to="productReview" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>Product Review</NavLink></li>
          <li><NavLink to="reported" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>Reported Contents</NavLink></li>
            </>
         }


         { !loading && role === 'admin' &&
            <>
             <li><NavLink to="manageUsers" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>Manage Users</NavLink></li>
          <li><NavLink to="statistic" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>Statistics Page
</NavLink></li>
          <li><NavLink to="coupon" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}> Coupon Page
</NavLink></li>
            </>
         }
          
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
