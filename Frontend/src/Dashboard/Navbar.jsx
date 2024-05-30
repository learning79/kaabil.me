import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <nav className="fixed top-0 left-0 w-full bg-bluebg shadow-md border-b border-gray-300 px-4 md:px-  6 md:flex justify-between items-center">
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link to="/">
        <img className="h-20 w-30 md:h-40 md:w-50" src={logo} alt="logo" />
        </Link>
        <div className="text-3xl cursor-pointer md:hidden" onClick={() => setOpen(!open)}>
          {open ? (
            <img src={close} className="h-[20px] w-[20px]" alt="close" />
          ) : (
            <img src={menu} className="h-[20px] w-[20px]" alt="menu" />
          )}
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-full border border-slate-900 border-b border-black focus:outline-none focus:border-blue-500"
        />
        <div className="p-4">
          <button className="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
              <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
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
