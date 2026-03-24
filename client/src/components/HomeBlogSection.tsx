import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCalendar, FaUser } from 'react-icons/fa';
import axios from 'axios';

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
}

const HomeBlogSection: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/posts`);
      // Get only the latest 3 blogs
      setBlogs(response.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogClick = (blogId: number) => {
    navigate(`/news/blog/${blogId}`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Latest from Our <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Blog</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest articles, insights, and environmental tips
          </p>
        </motion.div>

        {/* Blog Cards */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleBlogClick(blog.id)}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={blog.featured_image ? `http://localhost:5000${blog.featured_image}` : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800'}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {blog.title}
                  </h3>
                  
                  {blog.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <FaUser className="text-green-600" size={14} />
                      {blog.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendar className="text-green-600" size={14} />
                      {new Date(blog.created_at).toLocaleDateString('en-GB')}
                    </span>
                  </div>

                  <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700">
                    Read More
                    <FaArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform" size={14} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/news/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            View All Articles
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeBlogSection;