const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

async function connectDB() {
  try {
    const db = await open({
      filename: path.join(__dirname, 'cropconnect.db'),
      driver: sqlite3.Database
    });

    console.log('✅ Database connected');

    // Create tables
    await db.exec(`
      CREATE TABLE IF NOT EXISTS crops (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        unit TEXT DEFAULT 'quintal',
        farmer TEXT NOT NULL,
        location TEXT NOT NULL,
        image TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'farmer',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert sample data if empty
    const count = await db.get('SELECT COUNT(*) as count FROM crops');
    if (count.count === 0) {
      await db.run(`
        INSERT INTO crops (name, price, quantity, farmer, location, image) VALUES
        ('Wheat', 2200, 500, 'Rajesh Kumar', 'Ludhiana, Punjab', 'https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg'),
        ('Rice', 3100, 1000, 'Sukhwinder Singh', 'Amritsar, Punjab', 'https://images.pexels.com/photos/4110252/pexels-photo-4110252.jpeg'),
        ('Corn', 1800, 750, 'Amit Patel', 'Varanasi, UP', 'https://images.pexels.com/photos/5473170/pexels-photo-5473170.jpeg')
      `);
      console.log('✅ Sample data inserted');
    }

    return db;
  } catch (error) {
    console.error('❌ Database error:', error);
  }
}

module.exports = connectDB;