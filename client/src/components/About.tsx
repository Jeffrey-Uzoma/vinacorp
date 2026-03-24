import React from 'react'
import Woman_dirt from '../assets/woman dirt.jpg'
import { FaChevronRight } from "react-icons/fa";
import { HeroImages } from '../utils/hero';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div
      className="w-full h-[70em] bg-cover bg-center bg-no-repeat flex items-center justify-center mt-[8em]"
      style={{ backgroundImage: `url(${Woman_dirt})` }}
    >
      {/* Optional overlay for readability */}
      <div className="bg-black/70 w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-white text-5xl font-semibold">About Us</h1>
        <h1 className='flex text-white w-[15em] md:w-[30em] lg:w-[45em] text-center text-[1.2em] leading-9 mt-[1.5em]'>Vinacorp LTD is a leading Nigerian integrated Environmental/Chemical Consulting Company established by a group of dynamic and enthusiastic Nigerians with a multidisciplinary professional background in Geography, Toxicolgy, Forestry, Chemical Engineering, Civil Engineering, and Environmental Management for the purpose of providing a holistic Environmental Management Services to public and private sector clients, including funding institutions and development agencies.</h1>
        <Link to='/who-we-are' className='flex gap-4 bg-green-500 mx-[2em] lg:mx-[4em] items-center px-[2em] lg:px-[4em] py-[1em] lg:py-[1em] border-2 border-amber-200 mt-[3em] hover:border-green-500 cursor-pointer'>
          <h1 className='text-amber-200 font-semibold'>LEARN MORE</h1>
          <div>
            <FaChevronRight className='text-amber-200'/>
          </div>
        </Link>
        <div className='mt-[5em]'>
          <img src={HeroImages.About_waste} alt="" className='w-[47em]'/>
        </div>
      </div>
    </div>
  )
}

export default About
