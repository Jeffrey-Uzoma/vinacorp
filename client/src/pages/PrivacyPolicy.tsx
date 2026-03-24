import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaLock, 
  FaUserCheck, 
  FaDatabase, 
  FaCookie,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Foot from '../components/Foot';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: 'Vinacorp Limited ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
      icon: <FaShieldAlt className="text-2xl" />
    },
    {
      id: 'data-collection',
      title: '2. Information We Collect',
      content: 'We collect information that you provide directly to us, including:',
      items: [
        'Personal identification information (name, email address, phone number)',
        'Professional information (company name, job title)',
        'Contact information provided through contact forms or newsletter subscriptions',
        'Resume and cover letter information when applying for careers',
        'Communications you send to us'
      ],
      icon: <FaDatabase className="text-2xl" />
    },
    {
      id: 'usage',
      title: '3. How We Use Your Information',
      content: 'We use the information we collect to:',
      items: [
        'Provide, maintain, and improve our services',
        'Process and respond to your inquiries and requests',
        'Send you newsletters and marketing communications (with your consent)',
        'Process job applications and recruitment',
        'Comply with legal obligations and protect our rights'
      ],
      icon: <FaUserCheck className="text-2xl" />
    },
    {
      id: 'cookies',
      title: '4. Cookies and Tracking Technologies',
      content: 'We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.',
      subSections: [
        {
          title: 'Essential Cookies',
          content: 'Required for the basic functions of the website'
        },
        {
          title: 'Analytics Cookies',
          content: 'Help us understand how visitors interact with our website'
        },
        {
          title: 'Marketing Cookies',
          content: 'Used to track visitors across websites to display relevant advertisements'
        }
      ],
      icon: <FaCookie className="text-2xl" />
    },
    {
      id: 'data-sharing',
      title: '5. Data Sharing and Disclosure',
      content: 'We may share your information with:',
      items: [
        'Service providers who assist in our operations',
        'Professional advisors (lawyers, accountants)',
        'Government or regulatory authorities when required by law',
        'Third parties in connection with a business transaction'
      ],
      important: 'We do not sell your personal information to third parties.',
      icon: <FaLock className="text-2xl" />
    },
    {
      id: 'data-security',
      title: '6. Data Security',
      content: 'We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.',
      items: [
        'Encryption of sensitive data',
        'Regular security assessments',
        'Access controls and authentication',
        'Secure data storage practices'
      ]
    },
    {
      id: 'your-rights',
      title: '7. Your Rights',
      content: 'Depending on your location, you may have the following rights regarding your personal information:',
      items: [
        'Right to access your personal information',
        'Right to correct inaccurate data',
        'Right to delete your data (under certain conditions)',
        'Right to restrict or object to processing',
        'Right to data portability',
        'Right to withdraw consent'
      ]
    },
    {
      id: 'children-privacy',
      title: '8. Children\'s Privacy',
      content: 'Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us.'
    },
    {
      id: 'international-transfer',
      title: '9. International Data Transfers',
      content: 'Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.'
    },
    {
      id: 'changes',
      title: '10. Changes to This Privacy Policy',
      content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.'
    },
    {
      id: 'contact',
      title: '11. Contact Us',
      content: 'If you have any questions about this Privacy Policy, please contact us:'
    }
  ];

  const lastUpdated = 'January 28, 2024';

  return (
    <div>
      <Topbar/>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-[5em]">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <FaLock className="text-4xl" />
                <span className="text-xl font-semibold">Privacy & Data Protection</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Privacy Policy
              </h1>
              
              <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto mb-8">
                How we protect and handle your personal information
              </p>
              
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-medium">Last Updated:</span>
                <span>{lastUpdated}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-6 bg-white border-b sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    {section.title.replace(/^\d+\.\s/, '')}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                id="introduction"
                className="mb-16 scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <FaShieldAlt className="text-green-600 text-2xl" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    1. Introduction
                  </h2>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Vinacorp Limited ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                  information when you visit our website or use our services.
                </p>
                
                <p className="text-gray-700">
                  By accessing our website or using our services, you agree to the collection and 
                  use of information in accordance with this policy. If you disagree with any part 
                  of this Privacy Policy, please do not use our website or services.
                </p>
              </motion.div>

              {/* Data Collection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                id="data-collection"
                className="mb-16 scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <FaDatabase className="text-blue-600 text-2xl" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    2. Information We Collect
                  </h2>
                </div>
                
                <p className="text-gray-700 mb-6">
                  We collect information that you provide directly to us, including:
                </p>
                
                <ul className="space-y-3 mb-6">
                  {sections[1].items?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <p className="text-gray-700">
                  We also automatically collect certain information when you visit our website, 
                  including your IP address, browser type, operating system, referring URLs, 
                  pages viewed, and the dates/times of your visits.
                </p>
              </motion.div>

              {/* How We Use Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                id="usage"
                className="mb-16 scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <FaUserCheck className="text-purple-600 text-2xl" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    3. How We Use Your Information
                  </h2>
                </div>
                
                <p className="text-gray-700 mb-6">
                  We use the information we collect to:
                </p>
                
                <ul className="space-y-3 mb-6">
                  {sections[2].items?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg">
                  <p className="text-gray-700 font-medium">
                    We only process your personal information when we have a legal basis to do so, 
                    including when you have given consent, when processing is necessary for the 
                    performance of a contract, or when we have a legitimate interest.
                  </p>
                </div>
              </motion.div>

              {/* Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                id="cookies"
                className="mb-16 scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-amber-100 rounded-xl">
                    <FaCookie className="text-amber-600 text-2xl" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    4. Cookies and Tracking Technologies
                  </h2>
                </div>
                
                <p className="text-gray-700 mb-6">
                  {sections[3].content}
                </p>
                
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Types of Cookies We Use
                  </h3>
                  
                  <div className="space-y-4">
                    {sections[3].subSections?.map((sub, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900 mb-2">{sub.title}</h4>
                        <p className="text-gray-700">{sub.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie 
                  is being sent. However, if you do not accept cookies, you may not be able to use 
                  some portions of our website.
                </p>
              </motion.div>

              {/* Data Sharing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                id="data-sharing"
                className="mb-16 scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <FaLock className="text-red-600 text-2xl" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    5. Data Sharing and Disclosure
                  </h2>
                </div>
                
                <p className="text-gray-700 mb-6">
                  We may share your information with:
                </p>
                
                <ul className="space-y-3 mb-6">
                  {sections[4].items?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                {sections[4].important && (
                  <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-lg mb-6">
                    <p className="text-gray-700 font-medium">
                      {sections[4].important}
                    </p>
                  </div>
                )}
                
                <p className="text-gray-700">
                  We require all third parties to respect the security of your personal information 
                  and to treat it in accordance with the law. We do not allow our third-party service 
                  providers to use your personal information for their own purposes.
                </p>
              </motion.div>

              {/* Continue with other sections... */}

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                id="contact"
                className="mb-16 scroll-mt-24"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  11. Contact Us
                </h2>
                
                <p className="text-gray-700 mb-8">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-xl">
                        <FaEnvelope className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                        <a 
                          href="mailto:privacy@vinacorp.com" 
                          className="text-green-600 hover:text-green-700"
                        >
                          info@vinacorp.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-xl">
                        <FaPhone className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                        <a 
                          href="tel:+1234567890" 
                          className="text-green-600 hover:text-green-700"
                        >
                          (+234) 703 137 2870
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-xl">
                        <FaMapMarkerAlt className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                        <p className="text-gray-700">
                          IIHT Complex, Opposite Jephthah College, KM 5 East–West Road, Port Harcourt
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-gray-600 text-sm">
                      For data protection inquiries, please include "Privacy Policy Inquiry" in 
                      the subject line of your email.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Your Privacy Matters to Us
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                We are committed to being transparent about how we collect and use your data. 
                If you have any concerns about your privacy or data protection, don't hesitate 
                to reach out to our privacy team.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:info@vinacorp.com"
                  className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all"
                >
                  Contact Privacy Team
                </a>
                
                <a
                  href="/contact"
                  className="bg-transparent border-2 border-green-600 text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all"
                >
                  General Inquiries
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Back to Top */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all z-50"
          >
            ↑
          </button>
        </div>
      </div>
      <Footer/>
      <Foot/>
    </div> 
  );
};

export default PrivacyPolicy;