import React, { useState } from 'react';
import TechLogo from '../pages/shared/TechLogo/TechLogo';
import { NavLink, Outlet } from 'react-router';
import useUserRole from '../hooks/useUserRole';
import { HiMenu, HiX } from 'react-icons/hi';

const DashBoardLayout = () => {
     const { role, loading } = useUserRole();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="myProfile" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>My Profile Page</NavLink></li>
      <li><NavLink to="addProduct" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>AddProduct</NavLink></li>
      <li><NavLink to="myProduct" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>My Product</NavLink></li>

      {!loading && role === 'moderator' && (
        <>
          <li><NavLink to="productReview" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>Product Review</NavLink></li>
          <li><NavLink to="reported" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>Reported Contents</NavLink></li>
        </>
      )}

      {!loading && role === 'admin' && (
        <>
          <li><NavLink to="manageUsers" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>Manage Users</NavLink></li>
          <li><NavLink to="statistic" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>Statistics Page</NavLink></li>
        </>
      )}
    </>
  );
    return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
     
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        {/* Mobile/Tablet Navbar */}
      <div className="lg:hidden flex justify-between items-center bg-base-100 shadow-md px-4 h-16">
        <div className="flex items-center gap-2 text-xl font-bold text-indigo-700">
          <TechLogo />
          
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <ul className="menu menu-vertical p-4 gap-2">{menuItems}</ul>
        </div>
      )}
        <Outlet></Outlet>

      
       
      </div>

      {/* Sidebar */}
      <div className="drawer-side hidden lg:block">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
         
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
