import React from 'react';
import { Link } from 'react-router';
import TechLogo from '../TechLogo/TechLogo';
import useAuth from '../../../hooks/useAuth';
import CustomNavLink from './CustomNavLink';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
     logOut()
      .then(() => {
        toast.success("Logout successful");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Logout failed");
      });
  };

  const navItems = (
    <>
      <li><CustomNavLink to="/">Home</CustomNavLink></li>
      <li><CustomNavLink to="/productPage">Products</CustomNavLink></li>
      {user && (
        <li><CustomNavLink to="/dashboard">Dashboard</CustomNavLink></li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 lg:px-10 sticky top-0 z-50">
      {/* Left - Logo */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-700 hover:text-indigo-900">
          <TechLogo />
          <span className="hidden sm:inline">AppOrbit</span>
        </Link>
      </div>

      {/* Center - Nav Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium text-gray-600">{navItems}</ul>
      </div>

      {/* Right - Profile or Login */}
      <div className="navbar-end space-x-2">
        {!user ? (
          <Link to="/login" className="btn btn-sm font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-3xl lg:px-4 hover:from-blue-600 hover:to-indigo-700 text-indigo-700 hover:bg-indigo-200 font-semibold">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom" data-tip={user.displayName}>
              <div className="w-10 rounded-full ring ring-indigo-300">
                <img src={user.photoURL || "/default-avatar.png"} alt="user avatar" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52 text-gray-800">
              <li>
                <span className="font-bold text-sm pointer-events-none">
                  👤 {user.displayName}
                </span>
              </li>
              <li><Link to="/dashboard">📊 Dashboard</Link></li>
              <li><button onClick={handleLogOut}>🚪 Logout</button></li>
            </ul>
          </div>
        )}
         
      </div>
    </div>
  );
};

export default Navbar;
