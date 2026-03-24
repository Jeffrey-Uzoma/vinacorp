import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaHandshake, 
  FaBullseye, 
  FaChartLine, 
  FaShieldAlt,
  FaLeaf,
  FaGlobeAmericas,
  FaAward
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Foot from '../../components/Foot';

const WhoWeAre: React.FC = () => {
  const teamMembers = [
    {
      name: 'Eng. Liberty Iheanachor',
      role: 'Founder & CEO',
      expertise: 'Environmental Science & Management',
      experience: '15+ years',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'
    },
    {
      name: 'Sarah Johnson',
      role: 'Lead Environmental Engineer',
      expertise: 'Civil & Environmental Engineering',
      experience: '12+ years',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w-400'
    },
    {
      name: 'David Chen',
      role: 'Senior Geographer',
      expertise: 'GIS & Environmental Mapping',
      experience: '10+ years',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w-400'
    },
    {
      name: 'Dr. Amina Okoro',
      role: 'Chief Toxicologist',
      expertise: 'Environmental Toxicology',
      experience: '8+ years',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w-400'
    }
  ];

  const values = [
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: 'Integrity',
      description: 'We maintain the highest ethical standards in all our operations and interactions.'
    },
    {
      icon: <FaLeaf className="text-3xl" />,
      title: 'Sustainability',
      description: 'We prioritize long-term environmental health and sustainable development.'
    },
    {
      icon: <FaGlobeAmericas className="text-3xl" />,
      title: 'Innovation',
      description: 'We embrace new technologies and methodologies to solve complex environmental challenges.'
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: 'Partnership',
      description: 'We believe in collaborative approaches and building lasting relationships.'
    }
  ];

  const expertiseAreas = [
    'Environmental Impact Assessment',
    'Climate Change Consulting',
    'Water Resource Management',
    'Soil & Groundwater Remediation',
    'Environmental Compliance',
    'Sustainable Infrastructure',
    'Waste Management',
    'Biodiversity Conservation'
  ];

  return (
    <div>
      <Topbar/>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-[5em]">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-600 to-emerald-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-green-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <FaUsers className="text-4xl" />
                <span className="text-xl font-semibold">About Us</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Who We Are
              </h1>
              
              <div className="max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl font-light mb-8 leading-relaxed">
                  Welcome to <span className="font-bold">VINACORP LIMITED</span>. We are a dynamic, multidisciplinary 
                  team of geographers, toxicologists, engineers, and environmental managers 
                  established to provide holistic Environmental Management Services.
                </p>
                
                <p className="text-lg md:text-xl opacity-90">
                  We partner with public and private sector clients, funding institutions, 
                  and development agencies to navigate complex environmental challenges 
                  with expert, reliable solutions.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-10"
              >
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <FaBullseye className="text-green-600 text-2xl" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Our Mission
                  </h2>
                </div>
                
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                  To deliver innovative, sustainable environmental solutions that protect 
                  our planet while enabling economic growth and social development.
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">Protect environmental health through science-based solutions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">Promote sustainable development practices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">Build resilient communities and ecosystems</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-10"
              >
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <FaChartLine className="text-blue-600 text-2xl" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Our Vision
                  </h2>
                </div>
                
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                  To be Africa's leading environmental management consultancy, recognized 
                  for excellence in creating sustainable solutions that harmonize economic 
                  development with environmental conservation.
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">Pioneer innovative environmental technologies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">Expand our impact across the African continent</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <span className="text-gray-700">Set new standards in environmental stewardship</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                The principles that guide our work and define our company culture
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="inline-flex p-4 bg-green-50 rounded-xl mb-6">
                    <div className="text-green-600">
                      {value.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Expertise */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Expertise Areas
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive environmental solutions across multiple disciplines
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {expertiseAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 text-center"
                >
                  <div className="w-3 h-3 bg-green-600 rounded-full mx-auto mb-4"></div>
                  <h3 className="font-semibold text-gray-900">
                    {area}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Leadership Team
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our multidisciplinary team brings together diverse expertise to deliver 
                comprehensive environmental solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    
                    <div className="text-green-600 font-semibold mb-2">
                      {member.role}
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-3">
                      Expertise: {member.expertise}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaAward className="text-yellow-500" />
                      <span>{member.experience} experience</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[
                  { number: '15+', label: 'Years Experience' },
                  { number: '500+', label: 'Projects Completed' },
                  { number: '50+', label: 'Expert Team Members' },
                  { number: '100+', label: 'Happy Clients' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white/90">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Partner with VINACORP for Sustainable Solutions
              </h2>
              
              <p className="text-lg mb-8 opacity-90">
                Join us in creating a more sustainable future. Whether you're facing 
                regulatory challenges, planning new projects, or seeking to improve 
                your environmental performance, our team is ready to help.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all"
                >
                  Contact Our Team
                </Link>
                
                <Link
                  to="/services"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  Explore Our Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer/>
      <Foot/>
    </div>
  );
};

export default WhoWeAre;