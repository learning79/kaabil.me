import React from 'react';
import Navbar from "../Dashboard/Navbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import LessonCard from "./LessonCard";

const Lesson = ({ user }) => {
  const location = useLocation();
  const courseId = location.state?.courseId;
  const navigate = useNavigate();

  const handleStartChapter = () => {
    const subject = courseId === 1 ? "Trigonometry" : "Integration";
    navigate("/dashboard/Lesson/chapter", { state: { subject ,courseId} });
  };

  const getContent = () => {
    switch (courseId) {
      case 1:
        return {
          title: "Trigonometry",
          description: "Embark on a captivating journey through the world of Trigonometry...",
          duration: "45 minutes",
          language: "English",
          xp: "100 XP",
          level: "Intermediate"
        };
      case 2:
        return {
          title: "Integration",
          description: "Dive into the essential techniques of Integration...",
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
        <div className="flex justify-center items-center px-6 md:px-12 py-4 mt-8 lg:mt-16 md:mt-16">
          <LessonCard {...course} onClickStartChapter={handleStartChapter} />
        </div>
        <Outlet />
      </div>
      <Navbar user={user} />
    </>
  );
};

export default Lesson;
