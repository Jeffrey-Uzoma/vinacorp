import React, { useState, useEffect } from 'react';
import Home_logo from '../assets/Vinacorp logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { LiaSearchSolid } from "react-icons/lia";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface User {
  email: string;
  name: string;
  role: string;
}

const Navbar: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem('adminToken');
        setUser(null);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
    setShowUserMenu(false);
    navigate('/');
  };

  const getInitial = () => {
    if (!user) return '';
    if (user.role === 'admin') return 'Admin';
    return user.email.charAt(0).toUpperCase();
  };

  const navItems = [
    { title: "Home", link: "/" },
    {
      title: "Who We Are",
      link: "/who-we-are",
      dropdown: [
        { 
          title: "History", 
          link: "/who-we-are/history",
          subDropdown: [
            { title: "Timeline", link: "/who-we-are/history/timeline" },
            { title: "Milestones", link: "/who-we-are/history/milestones" }
          ]
        },
        { title: "Our People", link: "/who-we-are/our-people" },
        { title: "Indigenous Engagement", link: "/who-we-are/indigenous-engagement" },
        { title: "Community Involvement", link: "/who-we-are/community-involvement" },
      ]
    },
    {
      title: "Services",
      link: "/services",
      dropdown: [
        { 
          title: "Disaster Response & Recovery", 
          link: "/services/disaster-response-recovery",
          subDropdown: [
            {title: "Immediate Spill Response", link: "/services/disaster-response-recovery/immediate-spill"},
            {title: "Disaster Recovery", link: "/services/disaster-response-recovery/disaster-recovery"},
            {title: "Risk Assessment", link: "/services/disaster-response-recovery/risk-assessment"},
            {title: "Resource Mobilization", link: "/services/disaster-response-recovery/resource-mobilization"},
            {title: "Post-Disaster Environmental Assessment", link: "/services/disaster-response-recovery/post-disaster"},
          ]
        },
        { 
          title: "Permitting & Regulatory Services", 
          link: "/services/permitting-regulatory-services",
          subDropdown: [
            {title: "Permit Acquisition", link: "/services/permitting-regulatory-services/permit-acq"},
            {title: "Compliance Audits", link: "/services/permitting-regulatory-services/compliance-audits"},
            {title: "Reporting and Documentation", link: "/services/permitting-regulatory-services/reporting- document"},
            {title: "Environmental Due Diligence", link: "/services/permitting-regulatory-services/environmental-due"},
          ]
        },
        { 
          title: "Environmental Management Planning",
          link: "/services/environmental-planning",
          subDropdown: [
            {title: "Baseline Environmental studies", link: "/services/environmental-training/baseline-environ"},
            {title: "Environmental Risk Analysis", link: "/services/environmental-training/baseline-environ"},
            {title: "Mitigation and Management Plans", link: "/services/environmental-training/baseline-environ"},
            {title: "Socio-economic impact assessments", link: "/services/environmental-training/baseline-environ"},
            {title: "Public Consultation and Engagement", link: "/services/environmental-training/baseline-environ"},
            {title: "Compliance audits with Environmental Regulations", link: "/services/environmental-training/baseline-environ"},
            {title: "Energy and Water Usage Audits", link: "/services/environmental-training/baseline-environ"},
            {title: "Waste Management Audits", link: "/services/environmental-training/baseline-environ"},
            {title: "Carbon Footprint Assessment", link: "/services/environmental-training/baseline-environ"},
            {title: "Biodiversity Audits", link: "/services/environmental-training/baseline-environ"},
            {title: "Environmental Management System (EMS) Design and Implemetation", link: "/services/environmental-training/baseline-environ"},
            {title: "Sustainability strategies and policies", link: "/services/environmental-training/baseline-environ"},
            {title: "Corporate Environmental Responsibility consulting", link: "/services/environmental-training/baseline-environ"},
            {title: "Climate Changes Adaptation and Resilience Planning", link: "/services/environmental-training/baseline-environ"},
          ]
        },
        { 
          title: "Climate Change Consulting", 
          link: "/services/climate-change",
          subDropdown: [
            {title: "Climate Risk Assessment", link: "/sevices/climate-change/climate-risk-assess"},
            {title: "Adaption Strategies", link: "/sevices/climate-change/climate-risk-assess"},
            {title: "Mitigation Planning", link: "/sevices/climate-change/climate-risk-assess"},
            {title: "Carbon Offset Projects", link: "/sevices/climate-change/climate-risk-assess"},
            {title: "Greenhouse Gas(GHG) Emissions Inventory", link: "/sevices/climate-change/climate-risk-assess"},
            {title: "Carbon Offset Strategy Development", link: "/sevices/climate-change/climate-risk-assess"},
            {title: "Renewable Energy Feasibility Studies", link: "/sevices/climate-change/climate-risk-assess"},
            {title: "Carbon Management and Reduction Strategies", link: "/sevices/climate-change/climate-risk-assess"},
          ]
        },
        { 
          title: "Water Resource Management",
          link: "/services/water-resource-management",
          subDropdown: [
            {title: "Integrated Water Resource Management(IWRM)", link: "/services/water-resource-management/integrated-water"},
            {title: "Flood Risk Assessment and Management", link: "/services/water-resource-management/integrated-water"},
            {title: "Water Conservation Programs", link: "/services/water-resource-management/integrated-water"},
            {title: "Desalination and Water Reuse Solutions", link: "/services/water-resource-management/integrated-water"},
          ] },
        { 
          title: "Environmental Information Management", 
          link: "/services/environmental-info",
          subDropdown: [
            {title: "Data Collection and Analysis", link: "/services/environmental-info/data-collection"},
            {title: "Geographic Information System(GIS) Mapping", link: "/services/environmental-info/data-collection"},
            {title: "Environmental Reporting", link: "/services/environmental-info/data-collection"},
            {title: "Database Management", link: "/services/environmental-info/data-collection"},
          ] },
        { 
          title: "Soil/Groundwater Remediation",
          link: "/services/soil-remediation",
          subDropdown: [
            {title: "Excavation and Removal", link: "/services/soil-remediation/excavation-removal"},
            {title: "In-Situ Treatment", link: "/services/soil-remediation/in-situ-treatment"},
            {title: "Phytoremediation", link: "/services/soil-remediation/phytoremediation"},
            {title: "Pump and Treat", link: "/services/soil-remediation/pump-treat"},
            {title: "In-Situ Bioremediation", link: "/services/soil-remediation/in-situ-bioremediation"},
            {title: "Permeable Reactive Barriers(PRBs)", link: "/services/soil-remediation/in-situ-bioremediation"},
            {title: "Monitored Natural Attenuation", link: "/services/soil-remediation/in-situ-bioremediation"},
            {title: "Site Assessment and Investigation", link: "/services/soil-remediation/in-situ-bioremediation"},
            {title: "Remedial Action Planning", link: "/services/soil-remediation/in-situ-bioremediation"},
            {title: "Implementation of Cleanup Activities", link: "/services/soil-remediation/in-situ-bioremediation"},
            {title: "Post-Cleanup Monitoring", link: "/services/soil-remediation/in-situ-bioremediation"},
          ]  
        },
        { 
          title: "Environmental Training and Capacity Building",
          link: "/services/training-capacity",
          subDropdown: [
            {title: "Training Programs on Environmental Legislation and Regulations", link: "/services/training-capacity/training-program-environ"},
            {title: "Hazardous Materials Handling and Safety Training", link: "/services/training-capacity/training-program-environ"},
            {title: "Environmental Managemennt and Sustainability Workshops", link: "/services/training-capacity/training-program-environ"},
            {title: "Public Awareness Programs on Environmental Conservation", link: "/services/training-capacity/training-program-environ"},
          ]
        },
        { 
          title: "Sustainability & Corporate Social Responsibility (CSR) Consulting", 
          link: "/services/sustainability",
          subDropdown: [
            {title: "Development of Sustainability Goods and Frameworks", link: "/services/sustainability/develop-sustain"},
            {title: "CSR Policy Development and Reporting", link: "/services/sustainability/develop-sustain"},
            {title: "Stakeholder Engagement in Sustainability Initiatives", link: "/services/sustainability/develop-sustain"},
            {title: "Sustainable Supply Chain Management", link: "/services/sustainability/develop-sustain"},
            {title: "Circular Economy Implementation Strategies", link: "/services/sustainability/develop-sustain"},
          ] 
        },
        { 
          title: "Chemical Laboratory Services", 
          link: "/services/lab-services",
          subDropdown: [
            {title: "Analytical Testing Services", link: "/services/lab-services"},
            {title: "Environmental Monitoring and Assessment", link: "/services/lab-services"},
            {title: "Research & Development(R&D) Services", link: "/services/lab-services"},
            {title: "Regulatory Compliance and Certification Support", link: "/services/lab-services"},
          ]  
        },
        { 
          title: "Civil & Environmental Engineering Services", 
          link: "/services/engineering",
          subDropdown: [
            {title: "Water and Wastewater Engineering", link: "/services/engineering"},
            {title: "Flood and Erosion Control Works", link: "/services/engineering"},
            {title: "Desilling and Waterway Maintenance", link: "/services/engineering"},
            {title: "Environmental Infrastructure Development", link: "/services/engineering"},
            {title: "Civil Works and Site Development", link: "/services/engineering"},
            {title: "Hydrological and Geotechnical Services", link: "/services/engineering"},
          ]
        },
      ]
    },
    { title: "Sector", link: "/sector" },
    {
      title: "News",
      link: "/news",
      dropdown: [
        { title: "Blog", link: "/news/blog" },
        { title: "Case Studies", link: "/news/case-studies" },
        { title: "Media & Award", link: "/news/media-award" },
      ]
    },
    {
      title: "Careers",
      link: "/careers/openings",
      dropdown: [
        { title: "Open Positions", link: "/careers/openings" },
      ]
    },
    {
      title: "Contact",
      link: "/contact",
      dropdown: [
        { title: "Reach Us", link: "/contact/reach-us" },
        { title: "Privacy Policy", link: "/contact/privacy-policy" },
      ]
    },
  ];

  return (
    <nav className='flex lg:flex justify-between px-[2em] lg:px-[4em] items-center bg-white fixed top-9 w-full z-50 py-0'>
      {/* Logo */}
      <div>
        <img src={Home_logo} alt="company logo" className='w-[12em]' />
      </div>

      {/* Nav Links OR Search Bar */}
      <div className='items-center gap-4 hidden md:hidden lg:flex'>
        <AnimatePresence mode="wait">
          {!showSearch ? (
            <motion.div
              key="navlinks"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className='flex text-slate-600 font-semibold gap-6 items-center'
            >
              {navItems.map((item) => (
                <div
                  key={item.title}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => {
                    setActiveDropdown(null);
                    setActiveSubDropdown(null);
                  }}
                >
                  {/* Main Nav Item */}
                  <div className='flex items-center gap-1 cursor-pointer hover:text-green-700'>
                    <Link to={item.link || "#"}>{item.title}</Link>
                    {item.dropdown && <FaChevronDown className='text-[0.7em] mt-[0.4em]' />}
                  </div>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.title && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-[4.5em] bg-white shadow-lg rounded-md w-[15em] z-50"
                      >
                        <div className="max-h-[300px] overflow-y-auto overflow-x-visible">
                          {item.dropdown.map((drop) => (
                            <div
                              key={drop.title}
                              className="relative"
                              onMouseEnter={() => setActiveSubDropdown(drop.title)}
                              onMouseLeave={() => setActiveSubDropdown(null)}
                            >
                              <div className="flex items-center justify-between px-4 py-2 hover:bg-green-50 hover:text-green-700 cursor-pointer">
                                <Link to={drop.link || "#"}>{drop.title}</Link>
                                {drop.subDropdown && <FaChevronRight className='text-[0.7em]' />}
                              </div>
                            </div>
                          ))}
                        </div>

                        {item.dropdown.map((drop, dropIndex) => (
                          <AnimatePresence key={drop.title}>
                            {drop.subDropdown && activeSubDropdown === drop.title && (
                              <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                style={{ top: `${dropIndex * 40}px` }}
                                className="absolute left-[14.5em] bg-white shadow-lg rounded-md w-[16em] py-2 z-[60]"
                                onMouseEnter={() => setActiveSubDropdown(drop.title)}
                                onMouseLeave={() => setActiveSubDropdown(null)}
                              >
                                {drop.subDropdown.map((sub) => (
                                  <Link
                                    key={sub.title}
                                    to={sub.link}
                                    className="block px-4 py-2 hover:bg-green-50 hover:text-green-700"
                                  >
                                    {sub.title}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Search Icon */}
              <LiaSearchSolid
                onClick={() => setShowSearch(true)}
                className='font-semibold hover:text-green-700 hover:cursor-pointer text-[24px]'
              />

              {/* User Avatar or Login Button */}
              {user ? (
                <div className="relative">
                  <div
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold cursor-pointer hover:bg-green-700 transition-all"
                  >
                    {user.role === 'admin' ? 'A' : getInitial()}
                  </div>
                  
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-12 bg-white shadow-lg rounded-lg w-48 py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b border-gray-200">
                          <p className="font-semibold text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        {user.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="block px-4 py-2 hover:bg-green-50 hover:text-green-700"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-700"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login" className='px-[1em] py-[0.5em] rounded-xl bg-green-600 text-white hover:bg-green-700 transition-all'>
                  LogIn
                </Link>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="searchbar"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className='flex items-center gap-2'
            >
              <input
                type="text"
                placeholder="Search..."
                className='border border-gray-300 rounded-full px-4 py-2 w-[18em] focus:outline-none focus:ring-2 focus:ring-green-500 transition-all'
                autoFocus
              />
              <IoClose
                onClick={() => setShowSearch(false)}
                className='text-[26px] text-slate-600 hover:text-green-700 cursor-pointer'
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu Icon */}
      <div className='flex lg:hidden'>
        {menuOpen ? (
          <IoClose
            className='text-[2em] text-slate-700 cursor-pointer'
            onClick={() => setMenuOpen(false)}
          />
        ) : (
          <IoMdMenu
            className='text-[2em] text-slate-700 cursor-pointer'
            onClick={() => setMenuOpen(true)}
          />
        )}
      </div>

      {/* MOBILE NAVBAR */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='lg:hidden bg-amber-200 fixed top-[8.4rem] left-0 w-full shadow-lg z-40 px-[2em] py-4'
          >
            <ul className='flex flex-col gap-4 font-semibold text-slate-700'>
              {navItems.map((item) => (
                <li key={item.title}>
                  <Link
                    to={item.link}
                    onClick={() => setMenuOpen(false)}
                    className='block py-2 hover:text-green-700 transition'
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className='block py-2 text-red-600 hover:text-red-700 transition'
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className='block py-2 text-green-700 font-bold'
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;