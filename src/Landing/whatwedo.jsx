import React from "react";
import rightbgcloud from "../assets/rightbgcloud.png";
import bgcloud from "../assets/bg_cloud.png";
import what_we_do from "../assets/whatwedo_.png";

const WhatWeDo = () => {
  return (
    <div className="relative bg-bluebg w-full py-40 h-screen font-Space Grotesk flex items-center justify-center">
        <img
            src={bgcloud}
            alt="Background Cloud"
            className="absolute bottom-0 opacity-75 left-0 w-[453px] h-[435.92px] object-cover  z-0"
          />
          <img
          src={rightbgcloud}
          alt="Bg cloud"
          className="absolute bottom-0 right-0 opacity-75 h-[500px]"
          />
      <div className="flex flex-row justify-center items-center gap-16">
        <div className="relative">
          
          <img
            src={what_we_do}
            alt="What We Do"
            className="relative w-[453px] h-[435.92px] z-10"
          />
        </div>
        <div className="flex flex-col text-white max-w-lg">
          <h1 className="font-bold text-5xl mb-4">
            What We Do
          </h1>
          <span className="mb-4 mt-12">
            Sit at nisl tincidunt tortor. Varius bibendum gravida cras egestas.
            Placerat neque risus id elementum et laoreet non dignissim. Ipsum
            tincidunt vitae nunc blandit elementum varius. Nulla velit blandit
            gravida gravida sodales nunc habitant semper fringilla. Sapien vitae
            id bibendum tincidunt. Egestas neque fringilla vulputate tristique
            ullamcorper volutpat egestas pellentesque parturient.
          </span>
          <span>
            Sit at nisl tincidunt tortor. Varius bibendum gravida cras egestas.
            Placerat neque risus id elementum et laoreet non dignissim. Ipsum
            tincidunt vitae nunc blandit elementum varius. Nulla velit blandit
            gravida gravida sodales nunc habitant semper fringilla.
          </span>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
