import Navbar from "../Dashboard/Navbar";
import LessonCard from "./LessonCard";
import ToggleSwitch from "./LevelsButton";

const Lesson = () => {
  const handleToggle = (isChecked) => {
    console.log("Toggle state changed:", isChecked);
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-slate-100 font-Space Grotesk">
      <Navbar />
      <div className="flex justify-center items-center w-full mt-40 px-32 text-2xl md:text-3xl"> 
        <LessonCard />
      </div>
      <div className="flex justify-center w-full mt-16">
        <ToggleSwitch label="Levels" onChange={handleToggle} checked={false} />
      </div>
    </div>
  );
}

export default Lesson;
