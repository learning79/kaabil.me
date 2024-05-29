// Navbar.js
import React from 'react';
import logo from '../assets/logo.png';
import navItems from './navItems'; // Import navItems constant

const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full bg-white backdrop-blur-sm border-b border-gray-300 z-10 px-6 py-6 flex justify-between items-center">
      <div className="flex items-center">
        <img className="h-10 mx-4" src={logo} alt="logo" />
      </div>
      <div className="flex space-x-8 text-gray-700">
        {navItems.map((item, index) => (
          <p key={index} className="hover:text-green-500 cursor-pointer" onClick={() => scrollToSection(item.id)}>
            {item.text}
          </p>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
