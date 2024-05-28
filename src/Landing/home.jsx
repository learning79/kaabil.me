import React from "react";
import Navbar from "./Navbar";
import hero from "../assets/hero.png";
import banner from "../assets/banner.png";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import WhatWeDo from "./whatwedo";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col w-full h-[790px] mt-40"> 
        <div className="flex flex-col sm:flex-row items-center"> 
          <div className="flex-grow px-24 mr-8 sm:mr-0 mb-8 sm:mb-0"> 
            <h1 className="text-6xl font-bold mb-4 mt-8">
              AI-Powered Exam <br /> 
              <span className="whitespace-no-wrap">Preparation Platform</span>
            </h1>
            <p className="text-lg mb-4">
              Learning with Kabil is fun, and research shows that it works! With quick
              bite-sized lessons, you’ll earn points and unlock new levels while
              gaining real-world communication skills.
            </p>
            <div className="flex items-center">
              <Button className="py-8 px-12 rounded-full flex items-center">
                Get Started
              </Button>
            </div>
          </div>
          <div className="flex-grow mt-24 flex justify-center sm:justify-end">
            <img src={hero} className="w-[1728px] h-auto" alt="hero" />
          </div>
        </div>
        <div className="relative w-full h-[429px]">
          <img src={banner} alt="banner"></img>
        </div>
        <WhatWeDo />
      </div>
      
    </div>
    
  );
};

export default Home;
