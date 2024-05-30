import { useState } from 'react'; // Import useState hook
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import CourseBtn from "../components/CourseBtn";
import wave from '../assets/Dashboard/wave.png';
import CourseCard from "@/components/CourseCard";

const Dashboard = () => {
  // Use state to track the number of visible CourseCards
  const [visibleCards, setVisibleCards] = useState(5); // Initial visible cards

  return (
    <div className="absolute text-black bg-slate-100 flex font-Space Grotesk min-h-screen w-full">
      <Navbar />
      <div className="text-3xl flex flex-col text-left px-32 justify-start items-start w-full mt-56">
        <div className="flex flex-row justify-start w-120">
          <h1 className="mb-4">Welcome Back, User!</h1>
          <img src={wave} className="h-[50px] w-[50px] p-2 " alt="hand wave" />
        </div>
        <div className="bg-slate-200 p-16 rounded-xl w-full">
          <CourseBtn />
        </div>
        <h1 className="py-8">My Courses</h1>
        <div className="flex flex-row py-8 flex-wrap">
          {[...Array(visibleCards)].map((_, index) => (
            <CourseCard key={index} className="mr-4 mb-4" />
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
