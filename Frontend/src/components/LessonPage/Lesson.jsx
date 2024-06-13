import Navbar from "../Dashboard/Navbar";
import { Outlet, useNavigate,useLocation } from "react-router-dom";
import LessonCard from "./LessonCard";
import ToggleSwitch from "./LevelsButton";

const Lesson = ({ user }) => {
  const location = useLocation();
  const courseId = location.state?.courseId;
  const navigate = useNavigate();

  const handleStartChapter = () => {
    navigate("/dashboard/Lesson/chapter");
  };

  const getContent = () => {
    switch (courseId) {
      case 1:
        return {
          title: "Trigonometry",
          description: `Embark on a captivating journey through the world of Trigonometry, where angles and their intricate relationships form the foundation of a vast array of mathematical principles. This course will guide you through the fundamental concepts of sine, cosine, and tangent functions, exploring their applications in real-world scenarios such as engineering, physics, and architecture.
As you progress, you will uncover the mysteries of trigonometric identities and how they simplify complex equations, making problem-solving more efficient and intuitive. Discover the beauty of circular functions and learn how trigonometry is pivotal in calculating angles and distances in navigation and astronomy.`,
          duration: "45 minutes",
          language: "English",
          xp: "100 XP",
          level: "Intermediate"
        };
      case 2:
        return {
          title: "Integration",
          description: `Dive into the essential techniques of Integration, a cornerstone of calculus that powers many applications from physics to engineering to economics. This course begins by introducing the concept of integration as the inverse process of differentiation, explaining how it helps in finding areas under curves, volumes of solids of revolution, and solving complex real-world problems.

You will explore various methods of integration, starting with basic techniques such as substitution and integration by parts, which are pivotal for solving integrals involving algebraic and exponential functions. As the course progresses, you will master more advanced strategies including trigonometric integrals, partial fractions, and numerical integration methods, each accompanied by step-by-step examples and problem-solving sessions.`,
          duration: "90 minutes",
          language: "English",
          xp: "150 XP",
          level: "Advanced"
        };
      default:
        return {
          title: "Welcome",
          description: "Select a course to start learning.",
          duration: "N/A",
          language: "N/A",
          xp: "0 XP",
          level: "Beginner"
        };
    }
  };

  const course = getContent();

  return (
    <>
      <div className="flex flex-col mt-20 min-h-screen bg-slate-100 font-Space Grotesk">
        <Navbar user={user} />
        <div className="flex justify-center items-center px-6 md:px-12 mt-8 lg:mt-16 md:mt-16">
          <LessonCard {...course} onClickStartChapter={handleStartChapter} />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Lesson;
