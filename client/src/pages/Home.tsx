import React from 'react'
import Navbar from '../components/Navbar'
import Topbar from '../components/Topbar'
import HeroSection from '../components/HeroSection'
import HomeBody from '../components/HomeBody'
import Footer from '../components/Footer'
import Foot from '../components/Foot'

const Home: React.FC = () => {
  return (
    <div>
      <Topbar/>
      <Navbar/>
      <HeroSection/>
      <h1 className='text-green-700 text-[1em] lg:text-[2em] justify-center text-center px-[2em] bg-amber-100 pt-[2em]'>VINACORP LIMITED: Nigeria's leading integrated Environment and chemical consultancy firm.</h1>
      <HomeBody/>
      <Footer/>
      <Foot/>
    </div>
  )
}

export default Home