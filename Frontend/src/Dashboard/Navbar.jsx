import React, { useState } from 'react';
import logo from '../assets/logo/logo.png';
import menu from '../assets/menu.png';
import close from '../assets/close.png';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setOpen(false); 
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-bluebg shadow-md border-b border-gray-300 z-10 px-4 md:px-6 md:flex justify-between items-center">
      <div className="flex justify-between items-center w-full md:w-auto">
        <img className="h-10 w-30 md:h-40 md:w-50" src={logo} alt="logo" />
        <div className="text-3xl cursor-pointer md:hidden" onClick={() => setOpen(!open)}>
          {open ? (
            <img src={close} className="h-[20px] w-[40px]" alt="close" />
          ) : (
            <img src={menu} className="h-[20px] w-40" alt="menu" />
          )}
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        {/* Profile picture option (to be rendered from backend) */}
        <div className="ml-4">
          {/* Render profile picture from backend */}
          {/* Example: <img src={profilePictureUrl} className="h-10 w-10 rounded-full" alt="Profile" /> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
