import React from 'react'
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";

const Topbar: React.FC = () => {
  return (
    <div className='flex flex-col fixed top-0 left-0 w-full z-50'>
      <div className='flex justify-between px-[2em] lg:px-[4em] bg-green-500 py-[0.5em] text-[13px] items-center '>
        <div className='flex gap-5'>
          <div className='flex gap-2 text-amber-200 items-center'>
            <div><FaPhone /></div>
            <h1 className='font-semibold'>+2347031372870</h1>
          </div>
          <div className='flex gap-2 text-amber-200 items-center'>
            <div><IoIosMail className='text-[1.5em]'/></div>
            <h1 className='font-semibold'>info@vinacorpltd.com</h1>
          </div>
        </div>
        <div className='hidden md:flex lg:flex gap-4'>
          <FaFacebookF className='text-amber-200 text-[15px]'/>
          <RiInstagramFill className='text-amber-200 text-[17px]'/>
          <RiTwitterXLine className='text-amber-200 text-[17px]'/>
          <FaLinkedin className='text-amber-200 text-[17px]'/>
        </div>
      </div>
      <hr className='bg-amber-200 h-[2em] w-full'/>
    </div>
  )
}

export default Topbar