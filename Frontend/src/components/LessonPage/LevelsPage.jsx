import { Button } from "../ui/button";
import React from "react";

const Level = ({ level, isActive, isComplete, onClick }) => {
  const baseStyle = "flex items-center mb-2 p-3 rounded-lg  shadow-lg transition duration-200 ease-in-out transform hover:scale-105 cursor-pointer";
  const activeStyle = "bg-gradient-to-r from-blue-500 to-blue-900 text-white";
  const pendingStyle = "bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800";
  const completedStyle = "bg-gradient-to-r from-green-500 to-green-400 text-white";

  let appliedStyle = baseStyle;
  if (isActive) {
      appliedStyle += ` ${activeStyle}`;
  } else if (isComplete) {
      appliedStyle += ` ${completedStyle}`;
  } else {
      appliedStyle += ` ${pendingStyle}`;
  }


  return (
      <button onClick={onClick} className={appliedStyle}>
          <div className="flex-grow">
              <h3 className="font-semibold">{level.title}</h3>
              <p className="text-sm bg-slate-100 bg-opacity-20  rounded-lg">{level.description}</p>
              <p className="text-xs text-slate-200 ">{isActive ? 'Current' : isComplete ? 'Completed' : 'Pending'}</p>
          </div>
      </button>
  );
};


export default Level;