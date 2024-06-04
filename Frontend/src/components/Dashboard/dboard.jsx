import React, { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import CourseBtn from "../CourseBtn";
import wave from '/src/assets/Dashboard/wave.png';
import CourseCard from "@/components/CourseCard";
import Footer from '@/components/Footer';

const Dashboard = ({ user }) => {
  const [visibleCards, setVisibleCards] = useState(5); 
  const navigate = useNavigate();

  const handleStartNewLesson = () => {
    navigate('/dashboard/Lesson');
  };

  return (
    <div className="flex flex-col min-h-screen w-full text-black bg-slate-100 font-Space Grotesk">
      <Navbar user={user} />
      <div className="flex-grow md:text-3xl text-2xl flex flex-col text-left px-32 justify-start items-start mt-56">
        <div className="flex flex-row justify-start w-120">
          <h1 className="mb-4">Welcome Back, {user && user.displayName ? user.displayName : 'Guest'}!</h1>
          <img src={wave} className="h-[50px] w-[50px] p-2 " alt="hand wave" />
        </div>
        <div className="bg-slate-200 p-16 rounded-xl w-full sm:w-3/4 md:px-36 px-20">
          <CourseBtn onStartNewLesson={handleStartNewLesson} />
        </div>
        <h1 className="py-8">My Courses</h1>
        <div className="flex flex-row flex-wrap px-12">
          {[...Array(visibleCards)].map((_, index) => (
            <div key={index} className="mr-4 mb-8">
              <CourseCard />
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <Outlet />
    </div>
  );
}

export default Dashboard;
