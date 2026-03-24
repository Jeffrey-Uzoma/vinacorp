import React from 'react'
import { FaFacebookF } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";

const Foot: React.FC = () => {
  return (
    <div className='bg-green-500 px-[2em] lg:px-[4em] py-[1em] lg:py-[2em] text-white flex justify-between items-center'>
      {/* COPYRIGHT */}
      <div className='text-center text-amber-200 text-[0.9em]'>
        © {new Date().getFullYear()} Vinacorp Ltd. All rights reserved.
      </div>
      <div className='flex gap-4'>
        <FaFacebookF className='text-amber-200 text-[15px]'/>
        <RiInstagramFill className='text-amber-200 text-[17px]'/>
        <RiTwitterXLine className='text-amber-200 text-[17px]'/>
        <FaLinkedin className='text-amber-200 text-[17px]'/>
      </div>
    </div>
  )
}

export default Foot