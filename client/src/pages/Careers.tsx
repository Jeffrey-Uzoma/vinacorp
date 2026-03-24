import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaClock, 
  FaBuilding,
  FaArrowRight,
  FaTimes,
  FaFileUpload,
  FaCheckCircle,
  FaSearch
} from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import Foot from '../components/Foot';

const API_URL = 'http://localhost:5000/api';

interface Career {
  id: number;
  title: string;
  slug: string;
  department: string;
  location: string;
  job_type: string;
  description: string;
  requirements: string;
  benefits: string;
  salary_range: string;
  application_deadline: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Application {
  full_name: string;
  email: string;
  phone: string;
  cover_letter: string;
  resume: File | null;
}

const CareersPage: React.FC = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Career | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterJobType, setFilterJobType] = useState('all');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const [applicationData, setApplicationData] = useState<Application>({
    full_name: '',
    email: '',
    phone: '',
    cover_letter: '',
    resume: null
  });

  useEffect(() => {
    fetchCareers();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [careers, searchQuery, filterDepartment, filterLocation, filterJobType]);

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/careers`);
      setCareers(response.data);
    } catch (error) {
      console.error('Error fetching careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = [...careers];

    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterDepartment !== 'all') {
      filtered = filtered.filter(job => job.department === filterDepartment);
    }

    if (filterLocation !== 'all') {
      filtered = filtered.filter(job => job.location === filterLocation);
    }

    if (filterJobType !== 'all') {
      filtered = filtered.filter(job => job.job_type === filterJobType);
    }

    setFilteredCareers(filtered);
  };

  const handleApply = (job: Career) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setApplicationData({ ...applicationData, resume: e.target.files[0] });
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setSubmitStatus('submitting');

    try {
      const formData = new FormData();
      formData.append('career_id', selectedJob.id.toString());
      formData.append('full_name', applicationData.full_name);
      formData.append('email', applicationData.email);
      formData.append('phone', applicationData.phone);
      formData.append('cover_letter', applicationData.cover_letter);
      
      if (applicationData.resume) {
        formData.append('resume', applicationData.resume);
      }

      await axios.post(`${API_URL}/careers/${selectedJob.id}/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSubmitStatus('success');
      setTimeout(() => {
        setShowApplicationModal(false);
        setSubmitStatus('idle');
        setApplicationData({
          full_name: '',
          email: '',
          phone: '',
          cover_letter: '',
          resume: null
        });
      }, 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const getDepartments = () => {
    const departments = new Set(careers.map(job => job.department));
    return Array.from(departments);
  };

  const getLocations = () => {
    const locations = new Set(careers.map(job => job.location));
    return Array.from(locations);
  };

  const getJobTypes = () => {
    const jobTypes = new Set(careers.map(job => job.job_type));
    return Array.from(jobTypes);
  };

  return (
    <div>
      <Topbar/>
      <Navbar/>
      <div className="min-h-screen bg-white mt-[5em]">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
                Build Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                  Career With Us
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Join a team of innovators, thinkers, and creators shaping the future of our industry.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400">{careers.length}+</div>
                <div className="text-slate-400 mt-2">Open Positions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400">{getDepartments().length}+</div>
                <div className="text-slate-400 mt-2">Departments</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400">{getLocations().length}+</div>
                <div className="text-slate-400 mt-2">Locations</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by job title or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filters */}
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                {getDepartments().map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>

              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Locations</option>
                {getLocations().map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              <select
                value={filterJobType}
                onChange={(e) => setFilterJobType(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                {getJobTypes().map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Jobs Listing */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
            </div>
          ) : filteredCareers.length === 0 ? (
            <div className="text-center py-16">
              <FaBriefcase className="mx-auto text-6xl text-slate-300 mb-4" />
              <h3 className="text-2xl font-bold text-slate-700 mb-2">No positions found</h3>
              <p className="text-slate-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCareers.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-xl hover:border-green-500 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors">
                        {job.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-4 mb-4">
                        <span className="flex items-center gap-2 text-slate-600">
                          <FaBuilding className="text-green-600" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-2 text-slate-600">
                          <FaMapMarkerAlt className="text-green-600" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-2 text-slate-600">
                          <FaClock className="text-green-600" />
                          {job.job_type}
                        </span>
                      </div>

                      <p className="text-slate-600 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>

                      {job.salary_range && (
                        <div className="mt-3">
                          <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                            {job.salary_range}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all font-medium"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleApply(job)}
                        className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-medium flex items-center gap-2 justify-center group"
                      >
                        Apply Now
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Job Details Modal */}
        <AnimatePresence>
          {selectedJob && !showApplicationModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
              onClick={() => setSelectedJob(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-t-2xl">
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="float-right p-2 hover:bg-white/20 rounded-lg transition-all"
                  >
                    <FaTimes size={20} />
                  </button>
                  <h2 className="text-3xl font-bold mb-4">{selectedJob.title}</h2>
                  <div className="flex flex-wrap gap-4">
                    <span className="flex items-center gap-2">
                      <FaBuilding />
                      {selectedJob.department}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaMapMarkerAlt />
                      {selectedJob.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaClock />
                      {selectedJob.job_type}
                    </span>
                  </div>
                </div>

                <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">About the Role</h3>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                      {selectedJob.description}
                    </p>
                  </div>

                  {selectedJob.requirements && (
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Requirements</h3>
                      <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                        {selectedJob.requirements}
                      </p>
                    </div>
                  )}

                  {selectedJob.benefits && (
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Benefits</h3>
                      <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                        {selectedJob.benefits}
                      </p>
                    </div>
                  )}

                  {selectedJob.salary_range && (
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Salary Range</h3>
                      <p className="text-2xl font-bold text-green-600">{selectedJob.salary_range}</p>
                    </div>
                  )}

                  {selectedJob.application_deadline && (
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Application Deadline</h3>
                      <p className="text-slate-600">
                        {new Date(selectedJob.application_deadline).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-200 p-6 flex gap-4">
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowApplicationModal(true);
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-medium flex items-center gap-2 justify-center"
                  >
                    Apply for this Position
                    <FaArrowRight />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Application Modal */}
        <AnimatePresence>
          {showApplicationModal && selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
              onClick={() => !submitStatus.includes('submit') && setShowApplicationModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8"
                onClick={(e) => e.stopPropagation()}
              >
                {submitStatus === 'success' ? (
                  <div className="p-12 text-center">
                    <FaCheckCircle className="mx-auto text-6xl text-green-600 mb-4" />
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
                    <p className="text-slate-600">We'll review your application and get back to you soon.</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-t-2xl flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold">Apply for {selectedJob.title}</h2>
                        <p className="text-slate-300 mt-1">{selectedJob.department} • {selectedJob.location}</p>
                      </div>
                      <button
                        onClick={() => setShowApplicationModal(false)}
                        disabled={submitStatus === 'submitting'}
                        className="p-2 hover:bg-white/20 rounded-lg transition-all disabled:opacity-50"
                      >
                        <FaTimes size={20} />
                      </button>
                    </div>

                    <form onSubmit={handleSubmitApplication} className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={applicationData.full_name}
                            onChange={(e) => setApplicationData({ ...applicationData, full_name: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="John Doe"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={applicationData.email}
                            onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={applicationData.phone}
                          onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Cover Letter *
                        </label>
                        <textarea
                          value={applicationData.cover_letter}
                          onChange={(e) => setApplicationData({ ...applicationData, cover_letter: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                          rows={6}
                          placeholder="Tell us why you're a great fit for this role..."
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Resume/CV *
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                            id="resume-upload"
                            required
                          />
                          <label
                            htmlFor="resume-upload"
                            className="flex items-center justify-center gap-3 w-full px-4 py-8 border-2 border-dashed border-slate-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer"
                          >
                            <FaFileUpload className="text-3xl text-slate-400" />
                            <div className="text-center">
                              <p className="text-slate-700 font-medium">
                                {applicationData.resume ? applicationData.resume.name : 'Click to upload your resume'}
                              </p>
                              <p className="text-sm text-slate-500 mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      {submitStatus === 'error' && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                          Failed to submit application. Please try again.
                        </div>
                      )}

                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowApplicationModal(false)}
                          disabled={submitStatus === 'submitting'}
                          className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium disabled:opacity-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={submitStatus === 'submitting'}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {submitStatus === 'submitting' ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                              Submitting...
                            </>
                          ) : (
                            <>Submit Application</>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer/>
      <Foot/>
    </div>
  );
};

export default CareersPage;