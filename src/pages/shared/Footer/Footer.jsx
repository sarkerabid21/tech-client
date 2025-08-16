import React from 'react';
import TechLogo from '../TechLogo/TechLogo';
import { Link } from 'react-router';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
           
 <footer className="bg-[#ffffff] dark:bg-black dark:text-pink-50 text-gray-600">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold dark:text-pink-100 text-pink-600 pacifico-regular" >
              NextGenTech
            </div>
            <p className="text-gray-600 max-w-md">
              Discover and share the best tech products. From AI tools to mobile apps, find everything you need to stay ahead in technology.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/productPage" className="text-gray-600 dark:text-pink-50 hover:text-pink-700 transition-colors cursor-pointer">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link to="/dashboard/addProduct" className="text-gray-600 dark:text-pink-50 hover:text-pink-700 transition-colors cursor-pointer">
                  Submit Product
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-600 dark:text-pink-50 hover:text-pink-700 transition-colors cursor-pointer">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          
        </div>

        <div className="border-t border-pink-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-pink-600 dark:text-pink-50 text-sm">
            © 2025 TechHunt. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://www.facebook.com/" className="text-gray-600 dark:text-pink-50 hover:text-pink-700 transition-colors cursor-pointer">
              <div className="w-5 h-5 flex items-center justify-center">
                <FaFacebook />
              </div>
            </a>
            <a href="https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-sarkerabid21" className="text-gray-600 dark:text-pink-50 hover:text-pink-700 transition-colors cursor-pointer">
              <div className="w-5 h-5 flex items-center justify-center">
               <FaGithub />

              </div>
            </a>
            <a href="https://www.linkedin.com/" className="text-gray-600 dark:text-pink-50 hover:text-pink-700 transition-colors cursor-pointer">
              <div className="w-5 h-5 flex items-center justify-center">
                <FaLinkedin />

              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
        </div>
    );
};

export default Footer;