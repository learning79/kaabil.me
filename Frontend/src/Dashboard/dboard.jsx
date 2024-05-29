import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard=()=> {
  return (
    <div className="relative text-black bg-slate-200 flex font-Space Grotesk min-h-screen w-full">
        
      <Navbar />
      <div className="text-5xl">
        <h1>Welcome Back User!</h1>
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
