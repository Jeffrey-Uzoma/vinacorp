const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { pool } = require('./db');
require('dotenv').config();

const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for image uploads
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext);
    cb(null, nameWithoutExt + '-' + uniqueSuffix + ext);
  }
});

const imageFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'), false);
  }
};

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit for images
  }
});

// Configure multer for resume uploads
const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    const nameWithoutExt = path.basename(file.originalname, ext);
    // Prefix resume files
    cb(null, 'resume-' + nameWithoutExt.replace(/\s+/g, '-') + '-' + uniqueSuffix + ext);
  }
});

const resumeFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type for resume. Only PDF, DOC, DOCX, and TXT files are allowed.'), false);
  }
};

const uploadResume = multer({
  storage: resumeStorage,
  fileFilter: resumeFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit for resumes
  }
});

// Keep the original upload for backward compatibility
const upload = uploadImage;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// -------------------- ADMIN CREDENTIALS --------------------
const ADMIN_CREDENTIALS = {
  email: 'Iheanachor013@gmail.com',
  password: 'Michael1978',
  name: 'Admin',
  role: 'admin'
};
// ===========================================================

const JWT_SECRET = process.env.JWT_SECRET;

// -------------------- DATABASE INITIALIZATION FUNCTION --------------------
async function initializeDatabase() {
  try {
    console.log('🔧 Checking database tables...');
    
    // List of required tables
    const requiredTables = [
      'users',
      'blog_posts', 
      'newsletter_subscribers',
      'newsletter_campaigns',
      'careers',
      'applications'
    ];
    
    // Check each table
    for (const table of requiredTables) {
      try {
        const checkResult = await pool.query(
          `SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = $1
          )`,
          [table]
        );
        
        const tableExists = checkResult.rows[0].exists;
        
        if (!tableExists) {
          console.log(`📊 Creating missing table: ${table}`);
          await createTable(table);
        } else {
          console.log(`✅ Table exists: ${table}`);
        }
      } catch (error) {
        console.error(`⚠️ Error checking table ${table}:`, error.message);
      }
    }
    
    console.log('✅ Database initialization completed');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
}

// Function to create specific tables
async function createTable(tableName) {
  switch (tableName) {
    case 'users':
      await pool.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(20) DEFAULT 'user',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      `);
      break;
      
    case 'blog_posts':
      await pool.query(`
        CREATE TABLE blog_posts (
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
        
        CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
        CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
        
        -- Insert sample blog posts
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
      `);
      break;
      
    case 'newsletter_subscribers':
      await pool.query(`
        CREATE TABLE newsletter_subscribers (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          whatsapp VARCHAR(50),
          name VARCHAR(100),
          subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          is_active BOOLEAN DEFAULT true
        );
        
        CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
        CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_is_active ON newsletter_subscribers(is_active);
        
        -- Insert sample subscribers
        INSERT INTO newsletter_subscribers (email, whatsapp, name, is_active)
        VALUES 
        ('john.doe@example.com', '+2348012345678', 'John Doe', true),
        ('jane.smith@example.com', '+2348098765432', 'Jane Smith', true),
        ('bob.wilson@example.com', NULL, 'Bob Wilson', true),
        ('alice.johnson@example.com', '+2348076543210', 'Alice Johnson', true)
        ON CONFLICT (email) DO NOTHING;
      `);
      break;
      
    case 'newsletter_campaigns':
      await pool.query(`
        CREATE TABLE newsletter_campaigns (
          id SERIAL PRIMARY KEY,
          subject VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          status VARCHAR(20) DEFAULT 'draft',
          recipients_count INT DEFAULT 0,
          sent_to_emails INT DEFAULT 0,
          sent_to_whatsapp INT DEFAULT 0
        );
      `);
      break;
      
    case 'careers':
      await pool.query(`
        CREATE TABLE careers (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          department VARCHAR(100),
          location VARCHAR(100),
          job_type VARCHAR(50),
          description TEXT NOT NULL,
          requirements TEXT,
          benefits TEXT,
          salary_range VARCHAR(100),
          application_deadline DATE,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE INDEX IF NOT EXISTS idx_careers_is_active ON careers(is_active);
        CREATE INDEX IF NOT EXISTS idx_careers_slug ON careers(slug);
        
        -- Insert sample career listings
        INSERT INTO careers (title, slug, department, location, job_type, description, requirements, benefits, salary_range, application_deadline, is_active)
        VALUES 
        (
          'Environmental Consultant',
          'environmental-consultant',
          'Consulting',
          'Lagos, Nigeria',
          'Full-time',
          'We are seeking an experienced Environmental Consultant to join our team.',
          '• Bachelor''s degree in Environmental Science or related field
           • 3+ years of experience in environmental consulting
           • Strong knowledge of environmental regulations
           • Excellent communication skills',
          '• Health insurance
           • Professional development opportunities
           • Flexible work schedule
           • Annual bonuses',
          '₦3,500,000 - ₦5,000,000 per annum',
          '2024-12-31',
          true
        ),
        (
          'Civil Engineer',
          'civil-engineer',
          'Engineering',
          'Abuja, Nigeria',
          'Full-time',
          'Looking for a Civil Engineer with experience in environmental projects.',
          '• B.Sc in Civil Engineering
           • Professional certification
           • 5+ years of experience
           • Project management skills',
          '• Competitive salary
           • Company car
           • Housing allowance
           • Pension plan',
          '₦4,000,000 - ₦6,000,000 per annum',
          '2024-11-30',
          true
        ),
        (
          'Environmental Analyst',
          'environmental-analyst',
          'Research',
          'Remote',
          'Contract',
          'Part-time Environmental Analyst needed for research projects.',
          '• Master''s degree in Environmental Studies
           • Data analysis skills
           • Research experience
           • Report writing skills',
          '• Flexible hours
           • Remote work
           • Research funding
           • Conference opportunities',
          '₦1,500,000 - ₦2,500,000 per annum',
          '2024-10-31',
          true
        ) ON CONFLICT (slug) DO NOTHING;
      `);
      break;
      
    case 'applications':
      await pool.query(`
        CREATE TABLE applications (
          id SERIAL PRIMARY KEY,
          career_id INT REFERENCES careers(id) ON DELETE CASCADE,
          full_name VARCHAR(100) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          cover_letter TEXT,
          resume_url TEXT,
          status VARCHAR(50) DEFAULT 'pending',
          applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE INDEX IF NOT EXISTS idx_applications_career_id ON applications(career_id);
        CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
      `);
      break;
  }
  
  console.log(`✅ Created table: ${tableName}`);
}

// Initialize database before starting server
initializeDatabase().then(() => {
  console.log('🎉 Database ready!');
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to verify admin role
const authenticateAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// -------------------- AUTH ROUTES --------------------

// Register Route (New Users)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, role) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, name, email, role, created_at`,
      [name, email, hashedPassword, 'user']
    );

    const newUser = result.rows[0];

    const token = jwt.sign(
      { 
        id: newUser.id,
        email: newUser.email, 
        name: newUser.name,
        role: newUser.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login Route (Admin and Users)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const token = jwt.sign(
        { 
          email: ADMIN_CREDENTIALS.email, 
          name: ADMIN_CREDENTIALS.name,
          role: ADMIN_CREDENTIALS.role 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.json({
        message: 'Login successful',
        token,
        user: {
          email: ADMIN_CREDENTIALS.email,
          name: ADMIN_CREDENTIALS.name,
          role: ADMIN_CREDENTIALS.role
        }
      });
    }

    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email, 
        name: user.name,
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Verify token route
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Get current user info
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ 
    user: {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role
    }
  });
});

// Logout route
app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

// -------------------- IMAGE UPLOAD ROUTES --------------------

// Upload image endpoint (ADMIN ONLY)
app.post('/api/admin/upload', authenticateToken, authenticateAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});

// Delete uploaded image (ADMIN ONLY)
app.delete('/api/admin/upload/:filename', authenticateToken, authenticateAdmin, (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(uploadsDir, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting image' });
  }
});

// -------------------- BLOG POST ROUTES --------------------

// Get all published posts (PUBLIC)
app.get('/api/posts', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, slug, excerpt, content, author, featured_image, 
              published, created_at, updated_at 
       FROM blog_posts 
       WHERE published = true 
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Get single post by slug (PUBLIC)
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      `SELECT id, title, slug, excerpt, content, author, featured_image, 
              published, created_at, updated_at 
       FROM blog_posts 
       WHERE slug = $1 AND published = true`,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Error fetching post' });
  }
});

// Get single post by ID (PUBLIC)
app.get('/api/posts/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT id, title, slug, excerpt, content, author, featured_image, 
              published, created_at, updated_at 
       FROM blog_posts 
       WHERE id = $1 AND published = true`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Error fetching post' });
  }
});

// Get all posts including drafts (ADMIN ONLY)
app.get('/api/admin/posts', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, slug, excerpt, content, author, featured_image, 
              published, created_at, updated_at 
       FROM blog_posts 
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching admin posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Create new post (ADMIN ONLY) - Updated to handle file upload
app.post('/api/admin/posts', authenticateToken, authenticateAdmin, upload.single('featured_image'), async (req, res) => {
  try {
    const { title, excerpt, content, author, published } = req.body;

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug already exists
    const existingPost = await pool.query(
      'SELECT id FROM blog_posts WHERE slug = $1',
      [slug]
    );

    if (existingPost.rows.length > 0) {
      return res.status(400).json({ message: 'A post with this title already exists' });
    }

    // Get image URL if file was uploaded
    const featured_image = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      `INSERT INTO blog_posts (title, slug, excerpt, content, author, featured_image, published) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [title, slug, excerpt, content, author || 'Admin', featured_image, published !== 'false']
    );

    res.status(201).json({
      message: 'Post created successfully',
      post: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Update post (ADMIN ONLY) - Updated to handle file upload
app.put('/api/admin/posts/:id', authenticateToken, authenticateAdmin, upload.single('featured_image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, author, published } = req.body;

    // Get existing post to check current image
    const existingPost = await pool.query(
      'SELECT featured_image FROM blog_posts WHERE id = $1',
      [id]
    );

    if (existingPost.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Generate new slug if title changed
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Determine featured image
    let featured_image;
    if (req.file) {
      // New image uploaded
      featured_image = `/uploads/${req.file.filename}`;
      
      // Delete old image if it exists and is a local file
      const oldImage = existingPost.rows[0].featured_image;
      if (oldImage && oldImage.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, oldImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    } else {
      // Keep existing image
      featured_image = existingPost.rows[0].featured_image;
    }

    const result = await pool.query(
      `UPDATE blog_posts 
       SET title = $1, slug = $2, excerpt = $3, content = $4, 
           author = $5, featured_image = $6, published = $7, updated_at = NOW() 
       WHERE id = $8 
       RETURNING *`,
      [title, slug, excerpt, content, author, featured_image, published !== 'false', id]
    );

    res.json({
      message: 'Post updated successfully',
      post: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Error updating post' });
  }
});

// Delete post (ADMIN ONLY) - Updated to delete associated image
app.delete('/api/admin/posts/:id', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM blog_posts WHERE id = $1 RETURNING featured_image',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete associated image if it's a local file
    const featured_image = result.rows[0].featured_image;
    if (featured_image && featured_image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, featured_image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting post' });
  }
});

// -------------------- NEWSLETTER ROUTES --------------------

// Subscribe to newsletter (PUBLIC)
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email, whatsapp, name } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if already subscribed
    const existing = await pool.query(
      'SELECT id FROM newsletter_subscribers WHERE email = $1',
      [email]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        'UPDATE newsletter_subscribers SET whatsapp = $1, name = $2, is_active = true WHERE email = $3',
        [whatsapp, name, email]
      );
      return res.json({ 
        message: 'Subscription updated successfully',
        isNew: false 
      });
    }

    // Create new subscription
    const result = await pool.query(
      `INSERT INTO newsletter_subscribers (email, whatsapp, name) 
       VALUES ($1, $2, $3) 
       RETURNING id, email, whatsapp, name, subscribed_at`,
      [email, whatsapp, name]
    );

    res.status(201).json({
      message: 'Subscribed successfully',
      subscriber: result.rows[0],
      isNew: true
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Error subscribing to newsletter' });
  }
});

// Unsubscribe from newsletter (PUBLIC)
app.post('/api/newsletter/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const result = await pool.query(
      'UPDATE newsletter_subscribers SET is_active = false WHERE email = $1 RETURNING id',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    res.json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ message: 'Error unsubscribing' });
  }
});

// Get all subscribers (ADMIN ONLY)
app.get('/api/admin/newsletter/subscribers', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM newsletter_subscribers WHERE is_active = true';
    let params = [];
    
    if (search) {
      query += ' AND (email ILIKE $1 OR name ILIKE $1 OR whatsapp ILIKE $1)';
      params.push(`%${search}%`);
    }

    query += ' ORDER BY subscribed_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Get total count
    const countQuery = search 
      ? 'SELECT COUNT(*) FROM newsletter_subscribers WHERE is_active = true AND (email ILIKE $1 OR name ILIKE $1 OR whatsapp ILIKE $1)'
      : 'SELECT COUNT(*) FROM newsletter_subscribers WHERE is_active = true';
    const countResult = await pool.query(countQuery, search ? [`%${search}%`] : []);

    res.json({
      subscribers: result.rows,
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page),
      totalPages: Math.ceil(countResult.rows[0].count / limit)
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ 
      message: 'Error fetching subscribers',
      subscribers: [],
      total: 0,
      page: parseInt(page),
      totalPages: 0
    });
  }
});

// Create newsletter campaign (ADMIN ONLY)
app.post('/api/admin/newsletter/campaigns', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const { subject, content } = req.body;

    if (!subject || !content) {
      return res.status(400).json({ message: 'Subject and content are required' });
    }

    const result = await pool.query(
      `INSERT INTO newsletter_campaigns (subject, content) 
       VALUES ($1, $2) 
       RETURNING *`,
      [subject, content]
    );

    res.status(201).json({
      message: 'Newsletter draft created successfully',
      campaign: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating newsletter:', error);
    res.status(500).json({ message: 'Error creating newsletter' });
  }
});

// Get all newsletter campaigns (ADMIN ONLY)
app.get('/api/admin/newsletter/campaigns', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM newsletter_campaigns ORDER BY sent_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ 
      message: 'Error fetching campaigns',
      campaigns: []
    });
  }
});

// Send newsletter (ADMIN ONLY)
app.post('/api/admin/newsletter/send/:id', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get campaign
    const campaignResult = await pool.query(
      'SELECT * FROM newsletter_campaigns WHERE id = $1',
      [id]
    );

    if (campaignResult.rows.length === 0) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const campaign = campaignResult.rows[0];

    // Get active subscribers
    const subscribers = await pool.query(
      'SELECT email, whatsapp, name FROM newsletter_subscribers WHERE is_active = true'
    );

    const totalSubscribers = subscribers.rows.length;
    let emailSent = 0;
    let whatsappSent = 0;

    // Update campaign status to sending
    await pool.query(
      'UPDATE newsletter_campaigns SET status = $1, recipients_count = $2 WHERE id = $3',
      ['sending', totalSubscribers, id]
    );

    // TODO: Implement actual email sending integration
    // For now, we'll simulate sending
    for (const subscriber of subscribers.rows) {
      // Send email
      if (subscriber.email) {
        // TODO: Integrate with email service (Nodemailer, SendGrid, etc.)
        console.log(`Sending email to: ${subscriber.email}`);
        emailSent++;
      }

      // Send WhatsApp message
      if (subscriber.whatsapp) {
        // TODO: Integrate with WhatsApp API (Twilio, WhatsApp Business API, etc.)
        console.log(`Sending WhatsApp to: ${subscriber.whatsapp}`);
        whatsappSent++;
      }

      // Add small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    // Update campaign status
    await pool.query(
      `UPDATE newsletter_campaigns 
       SET status = $1, sent_to_emails = $2, sent_to_whatsapp = $3 
       WHERE id = $4`,
      ['sent', emailSent, whatsappSent, id]
    );

    res.json({
      message: 'Newsletter sent successfully',
      sentToEmails: emailSent,
      sentToWhatsApp: whatsappSent,
      totalRecipients: totalSubscribers
    });
  } catch (error) {
    console.error('Error sending newsletter:', error);
    
    // Update campaign status to failed
    await pool.query(
      'UPDATE newsletter_campaigns SET status = $1 WHERE id = $2',
      ['failed', req.params.id]
    );
    
    res.status(500).json({ message: 'Error sending newsletter' });
  }
});

// -------------------- CAREERS ROUTES --------------------

// Get all active career listings (PUBLIC)
app.get('/api/careers', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, slug, department, location, job_type, 
              description, requirements, benefits, salary_range,
              application_deadline, created_at
       FROM careers 
       WHERE is_active = true 
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching careers:', error);
    res.status(500).json({ 
      message: 'Error fetching career listings',
      careers: []
    });
  }
});

// Get single career by slug (PUBLIC)
app.get('/api/careers/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      `SELECT id, title, slug, department, location, job_type, 
              description, requirements, benefits, salary_range,
              application_deadline, created_at
       FROM careers 
       WHERE slug = $1 AND is_active = true`,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Career not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching career:', error);
    res.status(500).json({ message: 'Error fetching career listing' });
  }
});

// Submit job application (PUBLIC)
app.post('/api/careers/:id/apply', uploadResume.single('resume'), async (req, res) => {
  try {
    // Get career_id from URL params, not from request body
    const career_id = req.params.id;
    const { full_name, email, phone, cover_letter } = req.body;

    console.log('Career ID from URL:', career_id);
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    if (!full_name || !email) {
      return res.status(400).json({ message: 'Full name and email are required' });
    }

    // Convert career_id to integer
    const careerIdInt = parseInt(career_id);
    if (isNaN(careerIdInt)) {
      return res.status(400).json({ message: 'Invalid career ID' });
    }

    // Check if career exists and is active
    const careerResult = await pool.query(
      'SELECT id, title FROM careers WHERE id = $1 AND is_active = true',
      [careerIdInt]
    );

    if (careerResult.rows.length === 0) {
      return res.status(404).json({ message: 'Career listing not found or inactive' });
    }

    const careerTitle = careerResult.rows[0].title;

    // Check if already applied
    const existingApplication = await pool.query(
      'SELECT id FROM applications WHERE career_id = $1 AND email = $2',
      [careerIdInt, email]
    );

    if (existingApplication.rows.length > 0) {
      return res.status(400).json({ 
        message: `You have already applied for the position: ${careerTitle}` 
      });
    }

    // Handle resume upload
    let resumeUrl = null;
    if (req.file) {
      resumeUrl = `/uploads/${req.file.filename}`;
    }

    const result = await pool.query(
      `INSERT INTO applications 
       (career_id, full_name, email, phone, cover_letter, resume_url) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [careerIdInt, full_name, email, phone, cover_letter, resumeUrl]
    );

    res.status(201).json({
      message: `Application for "${careerTitle}" submitted successfully`,
      application: result.rows[0],
      careerTitle: careerTitle
    });
  } catch (error) {
    console.error('Application error:', error);
    
    // More specific error handling
    if (error.code === '23503') { // Foreign key violation
      return res.status(400).json({ 
        message: 'Invalid career position selected' 
      });
    }
    
    if (error.code === '23505') { // Unique constraint violation
      return res.status(400).json({ 
        message: 'You have already applied for this position' 
      });
    }
    
    res.status(500).json({ message: 'Error submitting application' });
  }
});

// Get all career listings (ADMIN ONLY)
app.get('/api/admin/careers', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, slug, department, location, job_type, 
              description, requirements, benefits, salary_range,
              application_deadline, is_active, created_at, updated_at
       FROM careers 
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching careers:', error);
    res.status(500).json({ 
      message: 'Error fetching career listings',
      careers: []
    });
  }
});

// Create new career listing (ADMIN ONLY)
app.post('/api/admin/careers', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const { 
      title, department, location, job_type, description, 
      requirements, benefits, salary_range, application_deadline, is_active 
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug already exists
    const existing = await pool.query(
      'SELECT id FROM careers WHERE slug = $1',
      [slug]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'A career with similar title already exists' });
    }

    const result = await pool.query(
      `INSERT INTO careers 
       (title, slug, department, location, job_type, description, 
        requirements, benefits, salary_range, application_deadline, is_active) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
       RETURNING *`,
      [
        title, slug, department, location, job_type, description,
        requirements, benefits, salary_range, application_deadline,
        is_active !== 'false'
      ]
    );

    res.status(201).json({
      message: 'Career listing created successfully',
      career: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating career:', error);
    res.status(500).json({ message: 'Error creating career listing' });
  }
});

// Update career listing (ADMIN ONLY) - FIXED VERSION
app.put('/api/admin/careers/:id', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, department, location, job_type, description, 
      requirements, benefits, salary_range, application_deadline, is_active 
    } = req.body;

    console.log('📝 Updating career ID:', id);
    console.log('📦 Update data:', { title, department, location });

    // Get existing career with ALL fields including slug
    const existingResult = await pool.query(
      'SELECT title, slug FROM careers WHERE id = $1',
      [id]
    );

    if (existingResult.rows.length === 0) {
      return res.status(404).json({ message: 'Career not found' });
    }

    const existingCareer = existingResult.rows[0];
    let slug;

    // Generate new slug if title changed, otherwise keep existing slug
    if (title && title !== existingCareer.title) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      // Check if new slug exists
      const slugCheck = await pool.query(
        'SELECT id FROM careers WHERE slug = $1 AND id != $2',
        [slug, id]
      );

      if (slugCheck.rows.length > 0) {
        return res.status(400).json({ 
          message: 'A career with similar title already exists. Please use a different title.' 
        });
      }
    } else {
      // Keep the existing slug if title hasn't changed
      slug = existingCareer.slug;
      console.log('✅ Keeping existing slug:', slug);
    }

    // Validate that we have a slug (should never be null/undefined at this point)
    if (!slug) {
      console.error('❌ Slug is undefined/null for career ID:', id);
      // Generate a fallback slug from title or ID
      slug = title 
        ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : `career-${id}`;
      console.log('⚠️ Generated fallback slug:', slug);
    }

    // Update the career
    const result = await pool.query(
      `UPDATE careers 
       SET title = $1, slug = $2, department = $3, location = $4, 
           job_type = $5, description = $6, requirements = $7, 
           benefits = $8, salary_range = $9, application_deadline = $10,
           is_active = $11, updated_at = NOW()
       WHERE id = $12 
       RETURNING *`,
      [
        title || existingCareer.title,
        slug,
        department || '',
        location || '',
        job_type || '',
        description || '',
        requirements || '',
        benefits || '',
        salary_range || '',
        application_deadline || null,
        is_active !== 'false',
        id
      ]
    );

    console.log('✅ Career updated successfully');

    res.json({
      message: 'Career listing updated successfully',
      career: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Error updating career:', error);
    
    // Handle specific database errors
    if (error.code === '23502') { // Not null violation
      return res.status(400).json({ 
        message: 'Required fields are missing. Please check your input.' 
      });
    }
    
    res.status(500).json({ 
      message: 'Error updating career listing. Please try again.' 
    });
  }
});

// Delete career listing (ADMIN ONLY)
app.delete('/api/admin/careers/:id', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM careers WHERE id = $1 RETURNING title',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Career not found' });
    }

    res.json({ 
      message: `Career listing "${result.rows[0].title}" deleted successfully` 
    });
  } catch (error) {
    console.error('Error deleting career:', error);
    res.status(500).json({ message: 'Error deleting career listing' });
  }
});

// Get all applications for a career (ADMIN ONLY)
app.get('/api/admin/careers/:id/applications', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      `SELECT a.*, c.title as career_title 
       FROM applications a
       JOIN careers c ON a.career_id = c.id
       WHERE a.career_id = $1 
       ORDER BY a.applied_at DESC`,
      [id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ 
      message: 'Error fetching applications',
      applications: []
    });
  }
});

// Get all applications (ADMIN ONLY)
app.get('/api/admin/applications', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.*, c.title as career_title 
       FROM applications a
       JOIN careers c ON a.career_id = c.id
       ORDER BY a.applied_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ 
      message: 'Error fetching applications',
      applications: []
    });
  }
});

// Update application status (ADMIN ONLY)
app.put('/api/admin/applications/:id', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const result = await pool.query(
      'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({
      message: 'Application status updated successfully',
      application: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ message: 'Error updating application status' });
  }
});

// -------------------- DASHBOARD STATS ROUTE --------------------
app.get('/api/admin/dashboard/stats', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    // Helper function to safely get count
    const getCount = async (query, params = []) => {
      try {
        const result = await pool.query(query, params);
        return parseInt(result.rows[0]?.count || 0);
      } catch (error) {
        console.log(`Note: ${error.message}`);
        return 0;
      }
    };

    // Get all counts with error handling
    const [
      totalBlogPosts,
      publishedBlogPosts,
      activeSubscribers,
      activeCareers,
      totalApplications,
      newsletterCampaigns
    ] = await Promise.all([
      getCount('SELECT COUNT(*) FROM blog_posts'),
      getCount('SELECT COUNT(*) FROM blog_posts WHERE published = true'),
      getCount('SELECT COUNT(*) FROM newsletter_subscribers WHERE is_active = true'),
      getCount('SELECT COUNT(*) FROM careers WHERE is_active = true'),
      getCount('SELECT COUNT(*) FROM applications'),
      getCount('SELECT COUNT(*) FROM newsletter_campaigns')
    ]);

    res.json({
      stats: {
        totalBlogPosts,
        publishedBlogPosts,
        activeSubscribers,
        activeCareers,
        totalApplications,
        newsletterCampaigns
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ 
      message: 'Error fetching dashboard statistics',
      stats: {
        totalBlogPosts: 0,
        publishedBlogPosts: 0,
        activeSubscribers: 0,
        activeCareers: 0,
        totalApplications: 0,
        newsletterCampaigns: 0
      }
    });
  }
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;

// Start server after database initialization
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`👤 Admin Email: ${ADMIN_CREDENTIALS.email}`);
    console.log(`📁 Uploads directory: ${uploadsDir}`);
  });
}).catch(error => {
  console.error('❌ Failed to initialize database:', error);
  process.exit(1);
});