-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    featured_image TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    whatsapp VARCHAR(50),
    name VARCHAR(100),
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Create newsletter_campaigns table
CREATE TABLE IF NOT EXISTS newsletter_campaigns (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'draft', -- draft, sending, sent, failed
    recipients_count INT DEFAULT 0,
    sent_to_emails INT DEFAULT 0,
    sent_to_whatsapp INT DEFAULT 0
);

-- Create careers table
CREATE TABLE IF NOT EXISTS careers (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    department VARCHAR(100),
    location VARCHAR(100),
    job_type VARCHAR(50), -- full-time, part-time, contract, remote
    description TEXT NOT NULL,
    requirements TEXT,
    benefits TEXT,
    salary_range VARCHAR(100),
    application_deadline DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    career_id INT REFERENCES careers(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    cover_letter TEXT,
    resume_url TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- pending, reviewed, shortlisted, rejected, hired
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_is_active ON newsletter_subscribers(is_active);
CREATE INDEX IF NOT EXISTS idx_careers_is_active ON careers(is_active);
CREATE INDEX IF NOT EXISTS idx_careers_slug ON careers(slug);
CREATE INDEX IF NOT EXISTS idx_applications_career_id ON applications(career_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);

-- Insert sample blog post
INSERT INTO blog_posts (title, slug, excerpt, content, author, featured_image, published)
VALUES (
    'Welcome to Our Blog',
    'welcome-to-our-blog',
    'This is your first blog post. Start creating amazing content and share your thoughts with the world!',
    'Welcome to our blog! This is where we share our thoughts, experiences, and insights on various topics. We''re excited to have you here and hope you find the content valuable and engaging.

In this blog, you''ll find articles about technology, lifestyle, and personal development. Each post is crafted with care to provide you with actionable insights and entertaining content.

Stay tuned for more posts coming soon! Feel free to explore and enjoy your reading experience.',
    'Admin User',
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200',
    true
),
(
    'Getting Started with Environmental Conservation',
    'getting-started-with-environmental-conservation',
    'Learn the basics of environmental conservation and how you can make a difference in your community.',
    'Environmental conservation is more important than ever. In this post, we explore simple yet effective ways you can contribute to protecting our planet.

From reducing waste to supporting sustainable practices, every action counts. We''ll guide you through practical steps you can take today to make a positive impact on the environment.

Join us on this journey towards a more sustainable future!',
    'Admin User',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200',
    true
),
(
    '10 Tips for Sustainable Living',
    '10-tips-for-sustainable-living',
    'Discover practical tips to live a more sustainable and eco-friendly lifestyle.',
    '1. Reduce single-use plastics
2. Conserve water and energy
3. Support local and organic food
4. Use public transportation
5. Recycle and compost
6. Choose sustainable products
7. Reduce food waste
8. Plant trees and gardens
9. Educate others about sustainability
10. Support environmental organizations

These simple changes can make a big difference in reducing your environmental footprint.',
    'Admin User',
    'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200',
    true
) ON CONFLICT (slug) DO NOTHING;

-- Display all data
SELECT 'Users Table:' as info;
SELECT * FROM users;

SELECT 'Blog Posts Table:' as info;
SELECT * FROM blog_posts;