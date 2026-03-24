import React from 'react'
import { HeroImages } from '../utils/hero'
import { Link } from 'react-router-dom'
import { FaChevronRight } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { RiInstagramFill, RiTwitterXLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className='flex flex-col bg-green-500 px-[2em] sm:px-[3em] lg:px-[4em] pt-[2em] lg:pt-[4em]'>
      {/* TOP SECTION */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[2em] lg:gap-[4em] justify-between'>

        {/* LOGO + CONTACT + SOCIALS */}
        <div className='flex flex-col items-start'>
          <div className='w-[7em]'>
            <img src={HeroImages.Vinacorp_logo} alt="Vinacorp logo" className='w-full' />
          </div>

          <div className='flex items-center text-white text-[1.3em] sm:text-[1.5em] mt-[12px]'>
            <Link to='/contact-us'><h1>Contact Us</h1></Link>
            <FaChevronRight className='text-[0.7em] mt-2 ml-1' />
          </div>

          <div className='flex gap-3 mt-3'>
            <FaFacebookF className='text-amber-200 text-[16px] sm:text-[18px] hover:text-yellow-300 cursor-pointer transition-colors' />
            <RiInstagramFill className='text-amber-200 text-[18px] hover:text-yellow-300 cursor-pointer transition-colors' />
            <RiTwitterXLine className='text-amber-200 text-[18px] hover:text-yellow-300 cursor-pointer transition-colors' />
            <FaLinkedin className='text-amber-200 text-[18px] hover:text-yellow-300 cursor-pointer transition-colors' />
          </div>
        </div>

        {/* WHO WE ARE */}
        <div className='flex flex-col text-white gap-3'>
          <h1 className='text-[1.3em] sm:text-[1.5em] font-bold text-yellow-300'>Who We Are</h1>
          <p>History</p>
          <p>Our People</p>
          <p>Indigenous Engagement</p>
          <p>Community Involvement</p>
        </div>

        {/* SERVICES (spans two columns on desktop) */}
        <div className='flex flex-col sm:flex-row gap-4 lg:col-span-2'>
          <div className='flex flex-col text-white gap-3 w-full sm:w-[14em]'>
            <h1 className='text-[1.3em] sm:text-[1.5em] font-bold text-yellow-300'>Services</h1>
            <p>Disaster Response & Recovery</p>
            <p>Permitting & Regulatory Services</p>
            <p>Environmental Management Planning</p>
            <p>Climate Change Consulting</p>
            <p>Water Resource Management</p>
            <p>Environmental Information Management</p>
          </div>

          <div className='flex flex-col text-white gap-3 w-full sm:w-[14em] sm:mt-[3.5em]'>
            <p>Soil/Groundwater Remediation</p>
            <p>Environmental Training and Capacity Building</p>
            <p>Sustainability & Corporate Social Responsibility (CSR)</p>
            <p>Chemical Laboratory Services</p>
            <p>Civil & Environmental Engineering Services</p>
          </div>
        </div>

        {/* NEWS */}
        <div className='flex flex-col text-white gap-3'>
          <h1 className='text-[1.3em] sm:text-[1.5em] font-bold text-yellow-300'>News</h1>
          <p>Blog</p>
          <p>Case Studies</p>
          <p>Media & Award</p>
        </div>

        {/* CAREERS */}
        <div className='flex flex-col text-white gap-3'>
          <h1 className='text-[1.3em] sm:text-[1.5em] font-bold text-yellow-300'>Careers</h1>
          <Link to='/careers/openings'><p>Open positions</p></Link>
        </div>
      </div>

      {/* DIVIDER */}
      <hr className='bg-amber-300 h-[0.2em] w-full mt-[3em]' />
    </footer>
  )
}

export default Footer
