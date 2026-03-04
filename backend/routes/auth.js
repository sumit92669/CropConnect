const express = require('express');
const router = express.Router();

// Demo login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'farmer@demo.com' && password === 'farmer123') {
    return res.json({
      message: 'Login successful',
      token: 'demo-token',
      user: { id: 1, fullName: 'Demo Farmer', email, role: 'farmer' }
    });
  }
  
  if (email === 'buyer@demo.com' && password === 'buyer123') {
    return res.json({
      message: 'Login successful',
      token: 'demo-token',
      user: { id: 2, fullName: 'Demo Buyer', email, role: 'buyer' }
    });
  }
  
  res.status(400).json({ error: 'Invalid credentials' });
});

// Demo signup
router.post('/signup', async (req, res) => {
  const { fullName, email, password, role } = req.body;
  
  res.status(201).json({
    message: 'User created successfully',
    token: 'demo-token',
    user: { id: 3, fullName, email, role: role || 'farmer' }
  });
});

module.exports = router;