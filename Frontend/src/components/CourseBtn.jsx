import React from 'react';
import { Button } from "@/components/ui/button";
import chart from "../assets/Dashboard/chart.png";
import elearning from "../assets/Dashboard/elearning.png";
import startnew from "../assets/Dashboard/books.png";

const CourseBtn = () => {
  const commonButtonClasses = "flex flex-col text-white p-16 font-md rounded-xl h-[100px] w-[200px]";

  return (
    <div className="flex md:flex-row flex-col md:space-y-0 space-y-4 md:space-x-4 ">
      <Button className={`${commonButtonClasses}`}>
        <img src={startnew} alt="Start New Lesson" className="h-16 w-16 mr-2" />
        <span className="text-lg font-normal">Start New Lesson</span>
      </Button>
      <Button className={`${commonButtonClasses} bg-purple`}>
        <img src={elearning} alt="Resume Where Left" className="h-16 w-16 mr-2" />
        <span className="text-lg font-normal">Resume Where Left</span>
      </Button>
      <Button className={`${commonButtonClasses} bg-yellowbg`}>
        <img src={chart} alt="Progress Report" className="h-16 w-16 mr-2" />
        <span className="text-lg font-normal">Progress Report</span>
      </Button>
    </div>
  );
};

export default CourseBtn;
