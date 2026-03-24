import React from 'react';
import { HeroImages } from '../utils/hero';
import { FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full rounded-tl-4xl rounded-tr-4xl overflow-hidden mt-[8.5em]">
      {/* Hero Image */}
      <img
        src={HeroImages.Earth}
        alt="Earth"
        className="w-full h-[30em] object-cover"
      />

      {/* Overlay Container */}
      <div className="flex flex-col absolute top-1/2 left-0 transform -translate-y-1/2 gap-[2em] items-start">
        {/* Yellow blurry background — fixed size */}
        <div className="bg-gradient-to-r from-yellow-200/80 via-yellow-200/40 to-transparent backdrop-blur-md rounded-r-[6em] h-[12em] w-[40em] flex items-center pl-[4em] shadow-lg">
          {/* Text inside — independent width & font size */}
          <div className="w-[20em] lg:w-[48em]  lg:max-w-[50em]">
            <span className="block text-[2.5em] italic font-semibold">Building a</span>
            <h1 className="text-black text-[2.5em] leading-tight font-bold">
              Sustainable Environment
            </h1>
          </div>
        </div>
        <Link to='/contact'>
        <div className='flex gap-4 bg-green-500 mx-[2em] lg:mx-[4em] items-center px-[2em] lg:px-[4em] py-[1em] lg:py-[1em] border-2 border-amber-200 cursor-pointer'>
          <h1 className='text-amber-200 font-semibold'>GET IN TOUCH</h1>
          <div>
            <FaChevronRight className='text-amber-200'/>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
