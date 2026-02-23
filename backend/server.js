const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
let db;
(async () => {
  db = await connectDB();
  app.locals.db = db;
})();

// Test API
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working with database!' });
});

// Get all crops from database
app.get('/api/crops', async (req, res) => {
  try {
    const crops = await db.all('SELECT * FROM crops ORDER BY createdAt DESC');
    res.json(crops);
  } catch (error) {
    console.error('Error fetching crops:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single crop
app.get('/api/crops/:id', async (req, res) => {
  try {
    const crop = await db.get('SELECT * FROM crops WHERE id = ?', req.params.id);
    if (!crop) {
      return res.status(404).json({ error: 'Crop not found' });
    }
    res.json(crop);
  } catch (error) {
    console.error('Error fetching crop:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new crop
app.post('/api/crops', async (req, res) => {
  try {
    const { name, price, quantity, unit, farmer, location, image } = req.body;
    
    const result = await db.run(
      'INSERT INTO crops (name, price, quantity, unit, farmer, location, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, price, quantity, unit || 'quintal', farmer, location, image]
    );

    res.status(201).json({ 
      message: 'Crop added successfully', 
      id: result.lastID 
    });
  } catch (error) {
    console.error('Error adding crop:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete crop
app.delete('/api/crops/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM crops WHERE id = ?', req.params.id);
    res.json({ message: 'Crop deleted successfully' });
  } catch (error) {
    console.error('Error deleting crop:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});