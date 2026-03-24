import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaShieldAlt, FaFileContract, FaClipboardList, FaCloudSun, FaWater, FaDatabase, FaSeedling, FaChalkboardTeacher, FaRecycle, FaFlask, FaCogs } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Foot from '../../components/Foot';

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const services = [
    {
      id: 1,
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Disaster Response & Recovery",
      description: "Rapid, expert response for environmental emergencies with comprehensive recovery solutions.",
      category: "emergency",
      color: "bg-red-50 border-red-100 text-red-600",
      link: "/services/disaster-response-recovery"
    },
    {
      id: 2,
      icon: <FaFileContract className="text-4xl" />,
      title: "Permitting & Regulatory Services",
      description: "Expert guidance through complex environmental compliance and permitting processes.",
      category: "compliance",
      color: "bg-blue-50 border-blue-100 text-blue-600",
      link: "/services/permitting-regulatory-services"
    },
    {
      id: 3,
      icon: <FaClipboardList className="text-4xl" />,
      title: "Environmental Management Planning",
      description: "Strategic planning for sustainable development and environmental compliance.",
      category: "planning",
      color: "bg-green-50 border-green-100 text-green-600",
      link: "/services/environmental-planning"
    },
    {
      id: 4,
      icon: <FaCloudSun className="text-4xl" />,
      title: "Climate Change Consulting",
      description: "Navigate climate risks and build resilience with expert adaptation strategies.",
      category: "consulting",
      color: "bg-purple-50 border-purple-100 text-purple-600",
      link: "/services/climate-change"
    },
    {
      id: 5,
      icon: <FaWater className="text-4xl" />,
      title: "Water Resource Management",
      description: "Sustainable solutions for integrated water management and conservation.",
      category: "management",
      color: "bg-cyan-50 border-cyan-100 text-cyan-600",
      link: "/services/water-resource-management"
    },
    {
      id: 6,
      icon: <FaDatabase className="text-4xl" />,
      title: "Environmental Information Management",
      description: "Data-driven decision making with advanced environmental data analysis.",
      category: "technology",
      color: "bg-indigo-50 border-indigo-100 text-indigo-600",
      link: "/services/environmental-info"
    },
    {
      id: 7,
      icon: <FaSeedling className="text-4xl" />,
      title: "Soil/Groundwater Remediation",
      description: "Expert remediation of contaminated sites using proven scientific techniques.",
      category: "remediation",
      color: "bg-amber-50 border-amber-100 text-amber-600",
      link: "/services/soil-remediation"
    },
    {
      id: 8,
      icon: <FaChalkboardTeacher className="text-4xl" />,
      title: "Environmental Training & Capacity Building",
      description: "Empowering teams with environmental knowledge and safety training.",
      category: "training",
      color: "bg-emerald-50 border-emerald-100 text-emerald-600",
      link: "/services/training-capacity"
    },
    {
      id: 9,
      icon: <FaRecycle className="text-4xl" />,
      title: "Sustainability & CSR Consulting",
      description: "Integrating sustainability into core business strategies for long-term value.",
      category: "consulting",
      color: "bg-teal-50 border-teal-100 text-teal-600",
      link: "/services/sustainability"
    },
    {
      id: 10,
      icon: <FaFlask className="text-4xl" />,
      title: "Chemical Laboratory Services",
      description: "Precise, reliable laboratory analysis for environmental monitoring and compliance.",
      category: "laboratory",
      color: "bg-violet-50 border-violet-100 text-violet-600",
      link: "/services/lab-services"
    },
    {
      id: 11,
      icon: <FaCogs className="text-4xl" />,
      title: "Civil & Environmental Engineering",
      description: "Engineering resilient infrastructure that harmonizes with the environment.",
      category: "engineering",
      color: "bg-gray-50 border-gray-100 text-gray-600",
      link: "/services/engineering"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'emergency', name: 'Emergency Response' },
    { id: 'compliance', name: 'Compliance' },
    { id: 'planning', name: 'Planning' },
    { id: 'consulting', name: 'Consulting' },
    { id: 'management', name: 'Management' }
  ];

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(service => service.category === activeTab);

  return (
    <div>
      <Topbar/>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-[5em]">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Our Services
              </h1>
              <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto mb-8">
                Comprehensive solutions for every environmental challenge
              </p>
              <p className="text-lg md:text-xl max-w-4xl mx-auto opacity-90">
                VINACORP offers a holistic suite of services designed to manage risk, 
                ensure compliance, and engineer a more sustainable environment. Our 
                expertise spans from rapid emergency response to long-term strategic 
                planning and infrastructure development.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                    activeTab === category.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className={`${service.color} border-2 rounded-2xl p-6 md:p-8 h-full transition-all duration-300 group-hover:shadow-2xl`}>
                    <div className="mb-6">
                      <div className="inline-flex p-3 rounded-xl bg-white/50 mb-4">
                        {service.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {service.description}
                      </p>
                    </div>
                    
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all"
                    >
                      Learn More
                      <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose VINACORP?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                With decades of combined experience and a track record of successful projects, 
                we deliver unparalleled environmental solutions.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { number: '500+', label: 'Projects Completed' },
                { number: '50+', label: 'Expert Consultants' },
                { number: '15+', label: 'Years Experience' },
                { number: '100%', label: 'Client Satisfaction' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center bg-white p-6 rounded-2xl shadow-lg"
                >
                  <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-700 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Transform Your Environmental Strategy?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Contact our team of experts to discuss how our comprehensive services 
                can help you achieve your environmental and sustainability goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"
                >
                  Get in Touch
                </Link>
                <a
                  href="tel:+2347031372870"
                  className="bg-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-800 transition-all"
                >
                  Call Now: (+234) 703 137 2870
                </a>
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

export default Services;