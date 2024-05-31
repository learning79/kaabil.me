import React from "react";
import rightbgcloud from "../assets/rightbgcloud.png";
import bgcloud from "../assets/bg_cloud.png";
import what_we_do from "../assets/whatwedo_.png";

const WhatWeDo = () => {
  return (
    <section id="whatWeDo">
      <div className="relative bg-bluebg w-full py-40 min-h-screen font-Space Grotesk flex flex-col md:flex-row items-center justify-center">
        {/* Cloud images for larger screens */}
        <img
          src={bgcloud}
          alt="Background Cloud"
          className="hidden md:block absolute bottom-0 opacity-75 left-0 w-[453px] h-[435.92px] object-cover z-0"
        />
        <img
          src={rightbgcloud}
          alt="Bg cloud"
          className="hidden md:block absolute bottom-0 right-0 opacity-75 h-[500px]"
        />
        <div className="flex flex-col md:flex-row justify-center items-center gap-16">
          <div className="relative order-2 md:order-1 mt-8 md:mt-0">
            <img
              src={what_we_do}
              alt="What We Do"
              className="relative w-[453px] h-[435.92px] z-10"
            />
          </div>
          <div className="flex flex-col text-white max-w-lg order-1 md:order-2 text-center md:text-left">
            <h1 className="font-bold text-5xl mb-4">What We Do</h1>
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
    </section>
  );
};

export default WhatWeDo;
