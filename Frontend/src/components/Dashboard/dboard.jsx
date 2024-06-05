import React, { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import wave from '/src/assets/Dashboard/wave.png';
import CourseCard from "@/components/CourseCard";
import Footer from '@/components/Footer';

const Dashboard = ({ user }) => {
  const [visibleCards, setVisibleCards] = useState(10);
  const navigate = useNavigate();

  const handleStartNewLesson = () => {
    navigate('/dashboard/Lesson');
  };

  return (
    <div className="flex flex-col min-h-screen h-full w-full text-black bg-slate-100 font-Space Grotesk">
      <Navbar user={user} />
      <div className="flex-grow md:text-3xl lg:text-3xl text-xl sm:text-xl flex flex-col text-left px-6 md:px-12 mt-16 md:mt-48">
        <div className="flex md:flex-row lg:flex-row sm:flex-col justify-center mb-4 md:w-140">  {/* Added justify-center */}
          <h1 className="bg-gradient-to-r from-indigo-800 to-green-600 to-yellow-500 inline-block text-transparent bg-clip-text font-bold">Welcome Back, {user && user.displayName ? user.displayName : 'Guest'}!</h1>
          <img src={wave} className="md:h-8 md:w-8 sm:h-4 sm:w-4 h-4 w-4 ml-2 md:ml-8 " alt="hand wave" />
        </div>

        <h1 className="py-8">My Courses</h1>
        <div className="flex flex-row flex-wrap justify-center"> 
          {[...Array(visibleCards)].map((_, index) => (
            <div key={index} className="mr-4 mb-8">
              <CourseCard onStartNewLesson={handleStartNewLesson}/>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <Outlet />
    </div>
  );
};

export default Dashboard;
