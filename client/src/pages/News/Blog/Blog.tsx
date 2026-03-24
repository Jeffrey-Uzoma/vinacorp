import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSearch, FaCalendar, FaUser } from 'react-icons/fa';
import axios from 'axios';
import Topbar from '../../../components/Topbar';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Foot from '../../../components/Foot';

const API_URL = 'http://localhost:5000/api';

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

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingBlog, setViewingBlog] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      // Fetch only published posts from the public endpoint
      const response = await axios.get(`${API_URL}/posts`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <Topbar/>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-10 pb-10 mt-[7em]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Our Blog
              </h1>
              <p className="text-xl text-gray-600">
                Discover our latest articles and insights
              </p>
            </div>

            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none shadow-lg"
                />
              </div>
            </div>
          </motion.div>

          {/* Blog Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">
                {searchQuery ? 'No blog posts found matching your search.' : 'No blog posts available at the moment.'}
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
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

                    <button
                      onClick={() => setViewingBlog(blog)}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-medium flex items-center justify-center gap-2"
                    >
                      Read Article
                    </button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

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
      </div>
      <Footer/>
      <Foot/>
    </div>
  );
};

export default Blog;