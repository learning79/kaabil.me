import React from 'react';
import logo from '../assets/logo.png';
import navItems from './navItems'; // Import navItems constant

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-1/2 font-Space Grotesk transform -translate-x-1/2 w-full flex justify-between items-center px-6 py-6 bg-white border-b border-gray-300">
      <div className="flex items-center">
        <img className="h-10 mx-20" src={logo} alt="logo" />
      </div>
      <div className="flex space-x-8 text-gray-700">
        {navItems.map((item, index) => (
          <p key={index} className="hover:text-blue-500 cursor-pointer">
            {item.text}
          </p>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
