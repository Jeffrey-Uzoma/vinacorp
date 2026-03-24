import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendar, FaUser, FaClock } from 'react-icons/fa';
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
  updated_at: string;
}

const SingleBlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_URL}/posts/id/${id}`);
      setBlog(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Blog post not found');
    } finally {
      setLoading(false);
    }
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center pt-32">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center pt-32 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The blog post you are looking for does not exist.'}</p>
          <Link
            to="/news/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all"
          >
            <FaArrowLeft />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-32 pb-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium transition-colors"
          >
            <FaArrowLeft />
            Back
          </button>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden shadow-2xl mb-8"
        >
          <img
            src={blog.featured_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200'}
            alt={blog.title}
            className="w-full h-96 object-cover"
          />
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 sm:p-12"
        >
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                <FaUser className="text-white" size={16} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Written by</p>
                <p className="font-semibold text-gray-900">{blog.author}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaCalendar className="text-green-600" size={18} />
              <div>
                <p className="text-sm text-gray-500">Published</p>
                <p className="font-semibold text-gray-900">
                  {new Date(blog.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaClock className="text-green-600" size={18} />
              <div>
                <p className="text-sm text-gray-500">Reading time</p>
                <p className="font-semibold text-gray-900">{getReadingTime(blog.content)} min read</p>
              </div>
            </div>
          </div>

          {/* Excerpt */}
          {blog.excerpt && (
            <div className="mb-8 p-6 bg-green-50 border-l-4 border-green-600 rounded-r-xl">
              <p className="text-lg text-gray-700 italic leading-relaxed">
                {blog.excerpt}
              </p>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {blog.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Tags/Categories (Optional) */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Environmental
              </span>
              <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                Conservation
              </span>
              <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                Sustainability
              </span>
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-8 flex items-center justify-between">
            <p className="text-gray-600 font-medium">Share this article:</p>
            <div className="flex gap-3">
              <button className="w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all flex items-center justify-center">
                F
              </button>
              <button className="w-10 h-10 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-all flex items-center justify-center">
                T
              </button>
              <button className="w-10 h-10 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all flex items-center justify-center">
                W
              </button>
            </div>
          </div>
        </motion.div>

        {/* Related Articles Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            to="/news/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            View More Articles
          </Link>
        </motion.div>
      </article>
    </div>
  );
};

export default SingleBlogPost;