import Navbar from "../Dashboard/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import LessonCard from "./LessonCard";
import ToggleSwitch from "./LevelsButton"; // Assuming ToggleSwitch is a Tailwind component

const Lesson = ({ user }) => {
  const handleToggle = (isChecked) => {
    console.log("Toggle state changed:", isChecked);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 font-Space Grotesk">
      <Navbar user={user} />
      <div className="flex justify-center items-center px-6 md:px-12 mt-20 md:mt-40">  {/* Added px-6 for default padding */}
        <LessonCard />
      </div>
      <div className="flex justify-center mt-16">  {/* Center ToggleSwitch horizontally */}
        <ToggleSwitch label="Levels" onChange={handleToggle} checked={false} />
      </div>
      <Outlet />
    </div>
  );
};

export default Lesson;
