
import React from "react";
import { NavLink } from "react-router";


const CustomNavLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative px-3 py-2 font-medium transition-colors duration-300
        ${isActive ? "text-indigo-600" : "text-gray-700 hover:text-indigo-600"}`
      }
    >
      <span className="relative group">
        {children}
        <span
          className="absolute -bottom-1 left-0 w-full h-[2px] bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        ></span>
      </span>
    </NavLink>
  );
};

export default CustomNavLink;
