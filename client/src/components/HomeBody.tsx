import React, {useState} from 'react'
import About from './About'
import { FaChevronRight } from "react-icons/fa";
import Young_waste from '../assets/young waste.jpg'
import { HeroImages } from '../utils/hero';
import { Link } from 'react-router-dom';
// import { MiniInfo } from '../utils/miniInfo';
import HomeBlogSection from './HomeBlogSection';
import axios from 'axios';

const HomeBody: React.FC = () => {
  // const blogState = MiniInfo
  const [email, setEmail] = useState('');
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/newsletter/subscribe`, {
        email
      });
      
      if (response.data.isNew) {
        alert('Successfully subscribed to newsletter!');
      } else {
        alert('Subscription updated!');
      }
      setEmail('');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error subscribing');
    }
  };

  return (
    
      <div className='py-[5em] bg-amber-100 flex flex-col'>
        {/* WHAT WE DO / APPROACH / MISSION */}
        <div className='flex flex-col lg:flex-row gap-[4em] items-center justify-center px-[2em] lg:px-[4em]'>
          {[
            {
              id: 1,
              title: 'What We Do',
              text: `It's widely acknowledged that improving the quality of life through economic development is both a universal human goal and a clear aspiration of every government. However, it is equally evident that ecomonic growth, population expansion, and urbanization inevitaly exert increasing pressure on the environment.`,
            },
            {
              id: 2,
              title: 'Our Approach',
              text: `The cornerstone of our practice hinges on our belief that a combination of process and system approaches is key in achieving sustainable environmental management. Vinacorp limited is positioned to assist its clients achieve and maintain operational excellence and reputation through the integration of the principle of sustainable development in all its services.`,
            },
            {
              id: 3,
              title: 'Our Mission',
              text: `Our mission is to ensure and promote environmental sanity through sound ethical advice and application of sustainable based technology in assisting our clients meet their environmental responsibility in compliance with current environmental laws and regulations.`,
            },
          ].map((item) => (
            <div key={item.id} className='w-full sm:w-[20em] shadow-2xl shadow-gray-600'>
              <div className='flex items-center gap-4 bg-green-500 text-amber-200 px-[1em] py-[0.3em] text-[1.5em]'>
                <h1>{item.id}</h1>
                <hr className="h-[1.1em] bg-amber-200 border-none w-[0.1em] rounded-md my-[0.1em]" />
                <h1 className='font-semibold'>{item.title}</h1>
              </div>
              <h1 className='bg-white py-[1.5em] px-[1.5em] text-[1em] leading-7 min-h-[20em]'>
                {item.text}
              </h1>
              <hr className="h-[1em] bg-green-500 border-none w-full" />
            </div>
          ))}
        </div>

        <About />

        {/* SECTORS & SERVICES */}
        <div className='flex flex-col lg:flex-row items-center justify-center w-full'>
          {/* SECTORS */}
          <div className='bg-amber-200 flex flex-col w-full lg:w-1/2 h-auto lg:h-[40em] items-center justify-center py-[3em]'>
            <h1 className='text-4xl sm:text-5xl font-semibold text-center'>Sectors</h1>
            <p className='w-[90%] sm:w-[25em] text-center text-[1em] sm:text-[1.1em] leading-8 mt-[1.5em]'>
              We work with client organizations of all sizes, in all industries, in both the private and public sectors. Working closely with our clients, we are able to develop sustainable, compliant solutions that integrate seamlessly with existing operations.
            </p>
            <Link to='/sector' className='flex gap-4 bg-green-500 items-center px-[2em] py-[1em] border-2 border-amber-200 mt-[3em] shadow-xl hover:border-green-500 cursor-pointer'>
              <h1 className='text-amber-200 font-semibold'>LEARN MORE</h1>
              <FaChevronRight className='text-amber-200'/>
            </Link>
          </div>

          {/* SERVICES */}
          <div
            className="w-full lg:w-1/2 h-[40em] sm:h-[30em] lg:h-[40em] bg-cover bg-center bg-no-repeat flex items-center justify-center"
            style={{ backgroundImage: `url(${Young_waste})` }}
          >
            <div className="bg-black/70 w-full h-full flex flex-col items-center justify-center px-[1.5em]">
              <h1 className="text-white text-4xl sm:text-5xl font-semibold text-center">Services</h1>
              <p className='text-white w-[90%] sm:w-[25em] text-center text-[1em] sm:text-[1.1em] leading-8 mt-[1.5em]'>
                Vinacorp LTD provides series of services, ranging from Disaster Response Recovery, Permitting and Regulatory services, Environmental Management Planning, Climate Change Consulting, Water Resources Management, Environmental Information Management, Soil/Groundwater Remediation, Environmental Training and Capacity Building, Sustainability and corporate Social Responsibility (CSR) consulting
              </p>
              <Link to='/services' className='flex gap-4 bg-green-500 items-center px-[2em] py-[1em] border-2 border-amber-200 mt-[3em] hover:border-green-500 cursor-pointer'>
                <h1 className='text-amber-200 font-semibold'>LEARN MORE</h1>
                <FaChevronRight className='text-amber-200'/>
              </Link>
            </div>
          </div>
        </div>

        {/* NEWS SECTION */}
        <div
          className="w-full h-[18em] bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: `url(${HeroImages.Earth_banner})` }}
        >
          <div className='bg-black/60 text-white w-full h-full flex flex-col items-center justify-center text-center px-[1em]'>
            <h1 className='text-[2.5em] sm:text-[4em]'>News</h1>
            <p className='text-[1em] sm:text-[1.1em]'>
              Stay informed by reading our blog stories and articles on industry update.
            </p>
            <div className='flex flex-wrap justify-center mt-[1em] gap-4 sm:gap-8 font-semibold items-center text-[0.95em] sm:text-[1em]'>
              <Link to='/news/blog'><h1>BLOG</h1></Link>
              <p className='text-[1.5em] hidden sm:block'>•</p>
              <Link to='/news/case-studies'><h1>CASE STUDIES</h1></Link>
              <p className='text-[1.5em] hidden sm:block'>•</p>
              <Link to='/news/media-award'><h1>MEDIA & AWARDS</h1></Link>
            </div>
          </div>
        </div>

        {/* BLOG GRID */}
        <HomeBlogSection/>

        {/* CONNECT SECTION */}
        <div className='flex flex-col items-center justify-center pt-[5em] text-center px-[1em]'>
          <h1 className='font-semibold text-[1.7em] sm:text-[2em] font-serif'>
            Stay Connected - Follow us on <span className='text-green-500'>LinkedIn</span>
          </h1>
        </div>

        {/* NEWSLETTER SECTION */}
        <div className='flex flex-col sm:flex-row bg-green-600 py-[2em] px-[2em] sm:px-[4em] justify-between items-center gap-6 mt-[4em]'>
          <h1 className='text-[2em] sm:text-[2.5em] text-green-200 font-bold font-mono text-center sm:text-left'>
            Join Our Newsletter
          </h1>
          <form onSubmit={handleNewsletterSubmit} className='flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto items-center'>
            <input 
              type="email" 
              placeholder='Your Email' 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='outline-none px-[1em] py-[0.8em] border-none bg-green-200 w-full sm:w-[20em]'
            />
            <button 
              type="submit"
              className='text-black bg-yellow-200 font-semibold text-[1em] px-[2em] py-[1em] hover:bg-yellow-400 cursor-pointer w-full sm:w-auto'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    
  )
}

export default HomeBody
