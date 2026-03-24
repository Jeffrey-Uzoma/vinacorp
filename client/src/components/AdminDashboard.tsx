import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTachometerAlt,
  FaBlog,
  FaNewspaper,
  FaBriefcase,
  FaUsers,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaEnvelope,
  FaWhatsapp,
  FaCalendar,
  FaFileAlt,
  FaUserCheck,
  FaExternalLinkAlt,
  FaDownload,
  FaHome
} from 'react-icons/fa';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import axios from 'axios';
import VinacorpLogo from '../assets/Vinacorp logo.png';

const API_URL = 'http://localhost:5000/api';

interface DashboardStats {
  totalBlogPosts: number;
  publishedBlogPosts: number;
  activeSubscribers: number;
  activeCareers: number;
  totalApplications: number;
  newsletterCampaigns: number;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  featured_image: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface Subscriber {
  id: number;
  email: string;
  whatsapp: string;
  name: string;
  subscribed_at: string;
  is_active: boolean;
}

interface NewsletterCampaign {
  id: number;
  subject: string;
  content: string;
  sent_at: string;
  status: string;
  recipients_count: number;
  sent_to_emails: number;
  sent_to_whatsapp: number;
}

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
  id: number;
  career_id: number;
  full_name: string;
  email: string;
  phone: string;
  cover_letter: string;
  resume_url: string;
  status: string;
  applied_at: string;
  career_title: string;
}

// Main Dashboard Component
const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsAuthenticated(response.data.user.role === 'admin');
    } catch (error) {
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        className="bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl fixed h-screen overflow-y-auto"
      >
        <div className="p-4 flex flex-col h-full">
          {/* Logo and Toggle */}
          <div className="flex items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
              className={`flex items-center gap-3 ${sidebarCollapsed ? 'hidden' : 'block'}`}
            >
              <img src={VinacorpLogo} alt="Vinacorp" className="h-10" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: sidebarCollapsed ? 1 : 0 }}
              className={`${sidebarCollapsed ? 'block' : 'hidden'}`}
            >
              <img src={VinacorpLogo} alt="Vinacorp" className="h-10 mx-auto" />
            </motion.div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-all"
            >
              {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 flex-1">
            <DashboardNavItem
              icon={<FaHome />}
              label="Homepage"
              to="/"
              collapsed={sidebarCollapsed}
            />
            <DashboardNavItem
              icon={<FaTachometerAlt />}
              label="Dashboard"
              to="/admin"
              collapsed={sidebarCollapsed}
            />
            <DashboardNavItem
              icon={<FaBlog />}
              label="Blog Posts"
              to="/admin/blog"
              collapsed={sidebarCollapsed}
            />
            <DashboardNavItem
              icon={<FaNewspaper />}
              label="Newsletter"
              to="/admin/newsletter"
              collapsed={sidebarCollapsed}
            />
            <DashboardNavItem
              icon={<FaBriefcase />}
              label="Careers"
              to="/admin/careers"
              collapsed={sidebarCollapsed}
            />
            <DashboardNavItem
              icon={<FaUsers />}
              label="Subscribers"
              to="/admin/subscribers"
              collapsed={sidebarCollapsed}
            />
            <DashboardNavItem
              icon={<FaFileAlt />}
              label="Applications"
              to="/admin/applications"
              collapsed={sidebarCollapsed}
            />
          </nav>

          {/* Logout Button */}
          <div className="mt-4">
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 w-full p-3 rounded-lg bg-red-600 hover:bg-red-700 transition-all ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <FaSignOutAlt />
              {!sidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-[280px]'
        }`}
      >
        <div className="p-6">
          {/* Notification */}
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
              >
                <IoMdCheckmarkCircle className="text-xl" />
                {notification}
              </motion.div>
            )}
          </AnimatePresence>

          <Routes>
            <Route path="/" element={<DashboardHome showNotification={showNotification} />} />
            <Route path="/blog" element={<BlogManagement showNotification={showNotification} />} />
            <Route path="/newsletter" element={<NewsletterManagement showNotification={showNotification} />} />
            <Route path="/careers" element={<CareersManagement showNotification={showNotification} />} />
            <Route path="/subscribers" element={<SubscribersManagement showNotification={showNotification} />} />
            <Route path="/applications" element={<ApplicationsManagement showNotification={showNotification} />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

// Dashboard Home Component
const DashboardHome: React.FC<{ showNotification: (msg: string) => void }> = ({ showNotification }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const [statsRes, blogsRes, appsRes] = await Promise.all([
        axios.get(`${API_URL}/admin/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/admin/posts?limit=5`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/admin/applications?limit=5`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setStats(statsRes.data.stats);
      setRecentBlogs(blogsRes.data);
      setRecentApplications(appsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Blog Posts"
          value={stats?.totalBlogPosts || 0}
          icon={<FaBlog className="text-2xl" />}
          color="bg-blue-500"
          link="/admin/blog"
        />
        <StatCard
          title="Active Subscribers"
          value={stats?.activeSubscribers || 0}
          icon={<FaUsers className="text-2xl" />}
          color="bg-green-500"
          link="/admin/subscribers"
        />
        <StatCard
          title="Job Applications"
          value={stats?.totalApplications || 0}
          icon={<FaFileAlt className="text-2xl" />}
          color="bg-purple-500"
          link="/admin/applications"
        />
        <StatCard
          title="Active Careers"
          value={stats?.activeCareers || 0}
          icon={<FaBriefcase className="text-2xl" />}
          color="bg-yellow-500"
          link="/admin/careers"
        />
        <StatCard
          title="Newsletter Campaigns"
          value={stats?.newsletterCampaigns || 0}
          icon={<FaNewspaper className="text-2xl" />}
          color="bg-red-500"
          link="/admin/newsletter"
        />
        <StatCard
          title="Published Posts"
          value={stats?.publishedBlogPosts || 0}
          icon={<FaUserCheck className="text-2xl" />}
          color="bg-indigo-500"
          link="/admin/blog"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Blog Posts */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Blog Posts</h2>
            <Link to="/admin/blog" className="text-green-600 hover:text-green-700 flex items-center gap-2">
              View All <FaExternalLinkAlt />
            </Link>
          </div>
          <div className="space-y-4">
            {recentBlogs.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-800">{post.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Applications</h2>
            <Link to="/admin/applications" className="text-green-600 hover:text-green-700 flex items-center gap-2">
              View All <FaExternalLinkAlt />
            </Link>
          </div>
          <div className="space-y-4">
            {recentApplications.map((app) => (
              <div key={app.id} className="p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{app.full_name}</h3>
                    <p className="text-sm text-gray-600">{app.career_title}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    app.status === 'hired' ? 'bg-green-100 text-green-800' :
                    app.status === 'shortlisted' ? 'bg-blue-100 text-blue-800' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Applied {new Date(app.applied_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Blog Management Component (Admin Only)
import { FaTimes, FaSearch, FaUser, FaImage, FaUpload } from 'react-icons/fa';

const BlogManagement: React.FC<{ showNotification: (msg: string) => void }> = ({ showNotification }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [viewingBlog, setViewingBlog] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Admin',
    published: true
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/admin/posts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB.');
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadingImage(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      const url = editingBlog 
        ? `${API_URL}/admin/posts/${editingBlog.id}`
        : `${API_URL}/admin/posts`;
      
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('excerpt', formData.excerpt);
      submitData.append('content', formData.content);
      submitData.append('author', formData.author);
      submitData.append('published', String(formData.published));
      
      if (imageFile) {
        submitData.append('featured_image', imageFile);
      }

      const response = await axios({
        method: editingBlog ? 'PUT' : 'POST',
        url,
        data: submitData,
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      showNotification(response.data.message);
      setShowModal(false);
      setEditingBlog(null);
      resetForm();
      fetchBlogs();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to save blog');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.delete(`${API_URL}/admin/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      showNotification(response.data.message);
      fetchBlogs();
    } catch (error) {
      alert('Failed to delete blog');
    }
  };

  const openEditModal = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt || '',
      content: blog.content,
      author: blog.author,
      published: blog.published
    });
    if (blog.featured_image) {
      setImagePreview(`http://localhost:5000${blog.featured_image}`);
    }
    setShowModal(true);
  };

  const openNewBlogModal = () => {
    setEditingBlog(null);
    resetForm();
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: 'Admin',
      published: true
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Management</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white rounded-xl p-6 shadow-lg">
          <div className="relative w-full sm:w-96">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none"
            />
          </div>
          <button
            onClick={openNewBlogModal}
            className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <FaPlus /> Create New Post
          </button>
        </div>
      </div>

      {/* Blog Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">No blog posts found.</p>
          <button
            onClick={openNewBlogModal}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all"
          >
            Create Your First Post
          </button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={blog.featured_image ? `http://localhost:5000${blog.featured_image}` : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800'}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {!blog.published && (
                  <span className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Draft
                  </span>
                )}
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {blog.title}
                </h2>
                
                {blog.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <FaUser className="text-green-600" />
                    {blog.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendar className="text-green-600" />
                    {new Date(blog.created_at).toLocaleDateString('en-GB')}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setViewingBlog(blog)}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => openEditModal(blog)}
                    className="bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-100 transition-all"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8"
            >
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-t-2xl flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingBlog(null);
                    resetForm();
                  }}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none"
                      placeholder="Enter blog title"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none resize-none"
                      rows={2}
                      placeholder="Brief description (optional)"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Content *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none resize-none"
                      rows={10}
                      placeholder="Write your blog content here..."
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <FaImage className="inline mr-2" />
                      Featured Image
                    </label>
                    
                    {!imagePreview ? (
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                          onChange={handleImageChange}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all"
                        >
                          <FaUpload className="text-4xl text-gray-400 mb-3" />
                          <p className="text-gray-600 font-medium">Click to upload image</p>
                          <p className="text-sm text-gray-500 mt-2">JPEG, PNG, GIF, WebP (Max 5MB)</p>
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-64 object-cover rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all shadow-lg"
                        >
                          <FaTimes />
                        </button>
                        {!imageFile && editingBlog && (
                          <div className="mt-2">
                            <input
                              type="file"
                              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                              onChange={handleImageChange}
                              className="hidden"
                              id="image-replace"
                            />
                            <label
                              htmlFor="image-replace"
                              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-all"
                            >
                              <FaUpload /> Replace Image
                            </label>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none"
                      placeholder="Author name"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-gray-700 font-medium">Publish immediately</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingBlog(null);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploadingImage}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadingImage ? 'Saving...' : (editingBlog ? 'Update Post' : 'Create Post')}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Blog Modal */}
      <AnimatePresence>
        {viewingBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8 overflow-hidden"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={viewingBlog.featured_image ? `http://localhost:5000${viewingBlog.featured_image}` : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200'}
                  alt={viewingBlog.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setViewingBlog(null)}
                  className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-all"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {viewingBlog.title}
                </h1>

                <div className="flex items-center gap-6 text-gray-600 mb-6 pb-6 border-b border-gray-200">
                  <span className="flex items-center gap-2">
                    <FaUser className="text-green-600" />
                    {viewingBlog.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCalendar className="text-green-600" />
                    {new Date(viewingBlog.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                {viewingBlog.excerpt && (
                  <p className="text-xl text-gray-700 mb-6 font-medium italic">
                    {viewingBlog.excerpt}
                  </p>
                )}

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {viewingBlog.content}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Newsletter Management Component
const NewsletterManagement: React.FC<{ showNotification: (msg: string) => void }> = ({ showNotification }) => {
  const [campaigns, setCampaigns] = useState<NewsletterCampaign[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    subject: '',
    content: ''
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/admin/newsletter/campaigns`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(`${API_URL}/admin/newsletter/campaigns`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      showNotification('Campaign created successfully');
      setShowCreateModal(false);
      setFormData({ subject: '', content: '' });
      fetchCampaigns();
    } catch (error: any) {
      showNotification(error.response?.data?.message || 'Error creating campaign');
    }
  };

  const handleSendCampaign = async (id: number) => {
    if (!window.confirm('Are you sure you want to send this newsletter?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(`${API_URL}/admin/newsletter/send/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      showNotification(response.data.message);
      fetchCampaigns();
    } catch (error: any) {
      showNotification(error.response?.data?.message || 'Error sending newsletter');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Newsletter Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus /> Create Campaign
        </button>
      </div>

      {/* Create Campaign Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
            >
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-t-2xl flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Create Newsletter Campaign</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateCampaign} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none"
                    placeholder="Newsletter subject"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none resize-none"
                    rows={10}
                    placeholder="Write your newsletter content here..."
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all"
                  >
                    Create Draft
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Campaigns List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{campaign.subject}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'sent' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'sending' ? 'bg-blue-100 text-blue-800' :
                      campaign.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-sm">
                        <FaEnvelope className="text-blue-500" />
                        {campaign.sent_to_emails}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <FaWhatsapp className="text-green-500" />
                        {campaign.sent_to_whatsapp}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(campaign.sent_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSendCampaign(campaign.id)}
                        disabled={campaign.status === 'sent' || campaign.status === 'sending'}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          campaign.status === 'sent' || campaign.status === 'sending'
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        Send
                      </button>
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
                        Preview
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Careers Management Component
const CareersManagement: React.FC<{ showNotification: (msg: string) => void }> = ({ showNotification }) => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    job_type: '',
    description: '',
    requirements: '',
    benefits: '',
    salary_range: '',
    application_deadline: '',
    is_active: true
  });

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/admin/careers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCareers(response.data);
    } catch (error) {
      console.error('Error fetching careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('adminToken');
      const url = editingCareer 
        ? `${API_URL}/admin/careers/${editingCareer.id}`
        : `${API_URL}/admin/careers`;
      
      const response = await axios({
        method: editingCareer ? 'PUT' : 'POST',
        url,
        data: formData,
        headers: { 
          Authorization: `Bearer ${token}`
        }
      });

      showNotification(response.data.message || 'Career saved successfully');
      setShowModal(false);
      setEditingCareer(null);
      resetForm();
      fetchCareers();
    } catch (error: any) {
      showNotification(error.response?.data?.message || 'Error saving career');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this career listing?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/admin/careers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      showNotification('Career listing deleted successfully');
      fetchCareers();
    } catch (error: any) {
      showNotification(error.response?.data?.message || 'Error deleting career');
    }
  };

  const openEditModal = (career: Career) => {
    setEditingCareer(career);
    setFormData({
      title: career.title,
      department: career.department,
      location: career.location,
      job_type: career.job_type,
      description: career.description,
      requirements: career.requirements || '',
      benefits: career.benefits || '',
      salary_range: career.salary_range || '',
      application_deadline: career.application_deadline.split('T')[0],
      is_active: career.is_active
    });
    setShowModal(true);
  };

  const openNewModal = () => {
    setEditingCareer(null);
    resetForm();
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      location: '',
      job_type: '',
      description: '',
      requirements: '',
      benefits: '',
      salary_range: '',
      application_deadline: '',
      is_active: true
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Careers Management</h1>
        <button
          onClick={openNewModal}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus /> Add New Job
        </button>
      </div>

      {/* Careers List */}
      <div className="grid gap-6">
        {careers.map((career) => (
          <div key={career.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{career.title}</h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {career.department}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {career.location}
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {career.job_type}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(career)}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(career.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">{career.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span className="font-medium">Deadline: </span>
                {new Date(career.application_deadline).toLocaleDateString()}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                career.is_active 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {career.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8"
            >
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-t-2xl flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  {editingCareer ? 'Edit Job Position' : 'Create New Job Position'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingCareer(null);
                    resetForm();
                  }}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none"
                      placeholder="e.g., Senior Software Engineer"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Department *
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none"
                      placeholder="e.g., Engineering"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none"
                      placeholder="e.g., New York, Remote"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Type *
                    </label>
                    <select
                      value={formData.job_type}
                      onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Salary Range
                    </label>
                    <input
                      type="text"
                      value={formData.salary_range}
                      onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none"
                      placeholder="e.g., $80,000 - $120,000"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none resize-none"
                      rows={4}
                      placeholder="Describe the role and responsibilities..."
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Requirements
                    </label>
                    <textarea
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none resize-none"
                      rows={4}
                      placeholder="List the required qualifications and skills..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Benefits
                    </label>
                    <textarea
                      value={formData.benefits}
                      onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none resize-none"
                      rows={3}
                      placeholder="List the benefits and perks..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Application Deadline *
                    </label>
                    <input
                      type="date"
                      value={formData.application_deadline}
                      onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-gray-700 font-medium">Active (visible to applicants)</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingCareer(null);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
                  >
                    {editingCareer ? 'Update Position' : 'Create Position'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Subscribers Management Component
const SubscribersManagement: React.FC<{ showNotification: (msg: string) => void }> = ({ showNotification }) => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async (searchQuery = '') => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/admin/newsletter/subscribers`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: searchQuery }
      });
      setSubscribers(response.data.subscribers);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    fetchSubscribers(e.target.value);
  };

  const handleDeleteSubscriber = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this subscriber?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/admin/newsletter/subscribers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      showNotification('Subscriber deleted successfully');
      fetchSubscribers(search);
    } catch (error: any) {
      showNotification(error.response?.data?.message || 'Error deleting subscriber');
    }
  };

  const handleExport = () => {
    const csv = [
      ['Email', 'Name', 'WhatsApp', 'Subscribed Date'],
      ...subscribers.map(s => [
        s.email,
        s.name || '',
        s.whatsapp || '',
        new Date(s.subscribed_at).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Subscribers Management</h1>
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaDownload /> Export CSV
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search subscribers..."
            className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Subscribers List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WhatsApp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribed Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{subscriber.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    {subscriber.name || '-'}
                  </td>
                  <td className="px-6 py-4">
                    {subscriber.whatsapp ? (
                      <span className="flex items-center gap-1">
                        <FaWhatsapp className="text-green-500" />
                        {subscriber.whatsapp}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(subscriber.subscribed_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      subscriber.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {subscriber.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteSubscriber(subscriber.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                      title="Delete subscriber"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Applications Management Component
const ApplicationsManagement: React.FC<{ showNotification: (msg: string) => void }> = ({ showNotification }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/admin/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${API_URL}/admin/applications/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      showNotification('Application status updated');
      fetchApplications();
    } catch (error: any) {
      showNotification(error.response?.data?.message || 'Error updating status');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Applications</h1>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((application) => (
          <div key={application.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{application.full_name}</h2>
                <p className="text-gray-600">{application.career_title}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>{application.email}</span>
                  <span>•</span>
                  <span>{application.phone || 'No phone'}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  application.status === 'hired' ? 'bg-green-100 text-green-800' :
                  application.status === 'shortlisted' ? 'bg-blue-100 text-blue-800' :
                  application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
                <span className="text-xs text-gray-500">
                  Applied {new Date(application.applied_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {application.cover_letter && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Cover Letter</h3>
                <p className="text-gray-600 line-clamp-3">{application.cover_letter}</p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div>
                {application.resume_url && (
                  <a
                    href={`http://localhost:5000${application.resume_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                  >
                    <FaDownload /> Download Resume
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                <select
                  value={application.status}
                  onChange={(e) => handleStatusUpdate(application.id, e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                  <option value="hired">Hired</option>
                </select>
                <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Analytics Dashboard Component
const AnalyticsDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Analytics Dashboard</h1>
      <div className="text-center py-12 bg-white rounded-xl shadow-lg">
        <p className="text-gray-500">Analytics dashboard coming soon...</p>
      </div>
    </div>
  );
};

// Admin Settings Component
const AdminSettings: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Settings</h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-500">Settings page coming soon...</p>
      </div>
    </div>
  );
};

// Helper Components
const DashboardNavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  to: string;
  collapsed: boolean;
}> = ({ icon, label, to, collapsed }) => (
  <Link
    to={to}
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-all group relative"
  >
    <span className="text-lg">{icon}</span>
    {!collapsed && (
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: collapsed ? 0 : 1 }}
        className="font-medium"
      >
        {label}
      </motion.span>
    )}
    {collapsed && (
      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </div>
    )}
  </Link>
);

const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  link: string;
}> = ({ title, value, icon, color, link }) => (
  <Link to={link} className="block">
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div className={`${color} text-white p-3 rounded-xl`}>
          {icon}
        </div>
      </div>
    </motion.div>
  </Link>
);

export default AdminDashboard;