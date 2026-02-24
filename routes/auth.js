const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

module.exports = (db) => {
  // Test route to check if router is working
  router.get('/test', (req, res) => {
    res.json({ message: 'Auth route working' });
  });

  // Login Route
  router.post('/login', async (req, res) => {
    console.log('Login attempt:', req.body); // Debug line
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      // Find user
      const user = await db.get('SELECT * FROM users WHERE email = ?', email);
      console.log('User found:', user ? 'Yes' : 'No'); // Debug line

      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      // Check password
      const validPassword = await bcrypt.compare(password, user.password);
      console.log('Password valid:', validPassword); // Debug line

      if (!validPassword) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      // Create token
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
    } catch (error) {
      console.error('Login error details:', error);
      res.status(500).json({ error: error.message || 'Server error' });
    }
  });

  // Signup Route
  router.post('/signup', async (req, res) => {
    console.log('Signup attempt:', req.body); // Debug line
    try {
      const { fullName, email, phone, password, role, location } = req.body;

      if (!fullName || !email || !password) {
        return res.status(400).json({ error: 'Required fields missing' });
      }

      // Check if user exists
      const existingUser = await db.get('SELECT * FROM users WHERE email = ?', email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      const result = await db.run(
        `INSERT INTO users (fullName, email, phone, password, role, location) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [fullName, email, phone || '', hashedPassword, role || 'farmer', location || '']
      );

      // Create token
      const token = jwt.sign(
        { id: result.lastID, email, role: role || 'farmer' },
        'cropconnect_secret',
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'User created successfully',
        token,
        user: { id: result.lastID, fullName, email, role: role || 'farmer' }
      });
    } catch (error) {
      console.error('Signup error details:', error);
      res.status(500).json({ error: error.message || 'Server error' });
    }
  });

  return router;
};