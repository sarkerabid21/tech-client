import React from 'react';
import { Link } from 'react-router';
import TechLogo from '../TechLogo/TechLogo';
import useAuth from '../../../hooks/useAuth';
import CustomNavLink from './CustomNavLink';
import toast from 'react-hot-toast';
import { HiMenu, HiX } from 'react-icons/hi';
import { useState } from 'react';
// import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Logout successful"))
      .catch((error) => {
        console.error(error);
        toast.error("Logout failed");
      });
    setMobileMenuOpen(false);
  };

  const navItems = (
    <>
      <li className='dark:text-pink-50'><CustomNavLink to="/">Home</CustomNavLink></li>
      <li className='dark:text-pink-50'><CustomNavLink to="/productPage">Products</CustomNavLink></li>
      <li className='dark:text-pink-50'><CustomNavLink to="/comingsoon">Coming Soon</CustomNavLink></li>
      <li className='dark:text-pink-50'><CustomNavLink to="/faq">FAQ</CustomNavLink></li>
      {user && <li><CustomNavLink to="/dashboard">Dashboard</CustomNavLink></li>}
    </>
  );

  return (
    <div className="bg-base-100 dark:bg-black  shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-10 h-16">
        {/* Left - Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-700 hover:text-indigo-900">
          <TechLogo />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex menu menu-horizontal px-1 font-medium text-gray-600 dark:text-pink-50 gap-2">
          {navItems}
        </ul>

        {/* Desktop Profile */}
        <div className="hidden lg:flex items-center space-x-2">
          {!user ? (
            <Link
              to="/login"
              className="btn btn-sm font-bold  bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-3xl lg:px-4 hover:from-blue-600 hover:to-indigo-700"
            >
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
                <li><span className="font-bold text-sm pointer-events-none">👤 {user.displayName}</span></li>
                <li><Link to="/dashboard">📊 Dashboard</Link></li>
                <li><button onClick={handleLogOut}>🚪 Logout</button></li>
              </ul>
            </div>
          )}
          {/* <div className="p-1 hidden lg:block md:block bg-yellow-300 dark:bg-purple-700 rounded-full">
          <ThemeToggle className="text-green-950 dark:text-green-200 cursor-pointer" />
        </div> */}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-blue-950 shadow-md">
          <ul className="menu menu-vertical dark:text-pink-50 p-4 gap-2">
            
            {navItems}
            {!user ? (
              <li>
                <Link to="/login" className="btn  w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-3xl">
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button onClick={handleLogOut} className="btn w-full bg-red-500 text-white rounded-3xl">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
