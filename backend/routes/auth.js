const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route working' });
});

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    console.log('📝 Signup request:', req.body);
    const { fullName, email, phone, password, role, location } = req.body;
    const db = req.db;

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // Check if user exists
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      db.run(
        `INSERT INTO users (fullName, email, phone, password, role, location) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [fullName, email, phone || '', hashedPassword, role || 'farmer', location || ''],
        function(err) {
          if (err) {
            console.error('Insert error:', err);
            return res.status(500).json({ error: 'Failed to create user' });
          }

          const token = jwt.sign(
            { id: this.lastID, email, role: role || 'farmer' },
            'cropconnect_secret',
            { expiresIn: '7d' }
          );

          res.status(201).json({
            message: 'User created successfully',
            token,
            user: { id: this.lastID, fullName, email, role: role || 'farmer' }
          });
        }
      );
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Route
router.post('/login', (req, res) => {
  try {
    console.log('🔑 Login request:', req.body.email);
    const { email, password } = req.body;
    const db = req.db;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      // Check password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        'cropconnect_secret',
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role
        }
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;