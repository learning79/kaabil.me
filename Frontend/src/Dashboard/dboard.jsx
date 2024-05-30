import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import CourseBtn from "../components/CourseBtn";
import wave from '../assets/Dashboard/wave.png';

const Dashboard = () => {
  return (
    <div className="absolute text-black bg-slate-100 flex font-Space Grotesk min-h-screen w-full">
      <Navbar />
      <div className="text-3xl flex flex-col text-left px-32 justify-start items-start w-full mt-56">
        <div className="flex flex-row justify-start w-120">
        <h1 className="mb-4">Welcome Back, User!</h1>
        <img src={wave} className="h-[50px] w-[50px] p-2 " alt="hand wave"></img>
        </div>
        <div className="bg-slate-200 p-16 rounded-xl w-full">
          <CourseBtn />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
