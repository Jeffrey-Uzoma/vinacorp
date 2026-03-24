import React from 'react'
import Topbar from '../components/Topbar'
import Navbar from '../components/Navbar'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import {HeroImages} from '../utils/hero'
import Footer from '../components/Footer';
import Foot from '../components/Foot';

const Contact: React.FC = () => {
  return (
    <div>
      <Topbar/>
      <Navbar/>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 px-6 mt-[4em]">
      {/* Hero Section with Background Image */}
      <div
        className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <img
          src={HeroImages.Earth}
          alt="Earth Background"
          className="absolute inset-0 w-full h-full object-cover blur-sm brightness-75"
        />

        {/* Overlay text */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">Contact Us</h1>
          <p className="max-w-xl mx-auto text-lg opacity-90">
            We’d love to hear from you — get in touch for support, collaborations, or inquiries.
          </p>
        </div>
      </div>


      {/* Contact Info + Form */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full bg-white p-8 rounded-2xl shadow-lg mt-[2em]">
        {/* Left Side - Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>

          <div className="flex items-start gap-3">
            <FaEnvelope className="text-green-600 text-xl mt-1" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-gray-600">info@vinacorpltd.com</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaPhone className="text-green-600 text-xl mt-1" />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-gray-600">+234 703 137 2870</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-green-600 text-xl mt-1" />
            <div>
              <p className="font-medium">Office Address</p>
              <p className="text-gray-600">
                IIHT Complex, Opposite Jephthah College, KM 5 East–West Road, Port Harcourt
              </p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="text-gray-600 hover:text-green-600 text-xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 text-xl">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <form className="space-y-5">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send a Message</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
            <textarea
              placeholder="Type your message here..."
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Map */}
      <div className="max-w-5xl w-full mt-12">
        <iframe
          title="VinaCorp LTD"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.0000000000005!2d7.000000000000000!3d4.800000000000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103abcd12345678%3A0xabcdef1234567890!2sIIHT%20Complex%2C%20Opposite%20Jephthah%20College%2C%20KM%205%20East–West%20Road%2C%20Port%20Harcourt!5e0!3m2!1sen!2sng!4v0000000000000!5m2!1sen!2sng"
          width="100%"
          height="400"
          allowFullScreen
          loading="lazy"
          className="rounded-2xl shadow-lg border-none"
        ></iframe>
      </div>
    </div>
    <Footer/>
    <Foot/>
    </div>
  )
}

export default Contact