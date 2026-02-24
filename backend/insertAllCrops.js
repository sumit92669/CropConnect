const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database', 'cropconnect.db'));

const crops = [
  // Grains
  { name: 'Wheat', price: 2200, quantity: 500, farmer: 'Rajesh Kumar', location: 'Ludhiana, Punjab', category: 'grains', lat: 30.9010, lng: 75.8573 },
  { name: 'Rice', price: 3100, quantity: 1000, farmer: 'Sukhwinder Singh', location: 'Amritsar, Punjab', category: 'grains', lat: 31.6340, lng: 74.8723 },
  { name: 'Corn', price: 1800, quantity: 750, farmer: 'Amit Patel', location: 'Varanasi, UP', category: 'grains', lat: 25.3176, lng: 82.9739 },
  { name: 'Barley', price: 1900, quantity: 300, farmer: 'Harpreet Singh', location: 'Hapur, UP', category: 'grains', lat: 28.7435, lng: 77.7628 },
  { name: 'Millet', price: 2600, quantity: 150, farmer: 'Ramesh Rathod', location: 'Jaipur, Rajasthan', category: 'grains', lat: 26.9124, lng: 75.7873 },
  
  // Pulses
  { name: 'Soybean', price: 4200, quantity: 200, farmer: 'Priya Sharma', location: 'Indore, MP', category: 'pulses', lat: 22.7196, lng: 75.8577 },
  { name: 'Green Gram', price: 6500, quantity: 120, farmer: 'Vikram Yadav', location: 'Jhansi, UP', category: 'pulses', lat: 25.4484, lng: 78.5685 },
  { name: 'Black Gram', price: 5800, quantity: 80, farmer: 'Lakhan Singh', location: 'Sagar, MP', category: 'pulses', lat: 23.8388, lng: 78.7378 },
  { name: 'Chickpea', price: 5200, quantity: 250, farmer: 'Rafiq Ahmed', location: 'Akola, Maharashtra', category: 'pulses', lat: 20.6986, lng: 77.0023 },
  { name: 'Pigeon Pea', price: 6000, quantity: 90, farmer: 'Shyam Behari', location: 'Gulbarga, Karnataka', category: 'pulses', lat: 17.3297, lng: 76.8343 },
  
  // Vegetables
  { name: 'Potato', price: 1200, quantity: 800, farmer: 'Chhotelal Gupta', location: 'Agra, UP', category: 'vegetables', lat: 27.1767, lng: 78.0081 },
  { name: 'Onion', price: 1800, quantity: 600, farmer: 'Dnyaneshwar Patil', location: 'Nashik, Maharashtra', category: 'vegetables', lat: 19.9615, lng: 73.8089 },
  { name: 'Tomato', price: 1500, quantity: 300, farmer: 'Krishnappa Gowda', location: 'Kolar, Karnataka', category: 'vegetables', lat: 13.1356, lng: 78.1321 },
  { name: 'Cauliflower', price: 2200, quantity: 150, farmer: 'Hari Ram', location: 'Kullu, HP', category: 'vegetables', lat: 31.9577, lng: 77.1090 },
  { name: 'Cabbage', price: 1400, quantity: 200, farmer: 'Mangal Singh', location: 'Nasik, Maharashtra', category: 'vegetables', lat: 19.9615, lng: 73.8089 },
  { name: 'Brinjal', price: 1600, quantity: 100, farmer: 'Shakuntala Devi', location: 'Haveri, Karnataka', category: 'vegetables', lat: 14.7932, lng: 75.4027 },
  { name: 'Okra', price: 2800, quantity: 80, farmer: 'Ramprasad Yadav', location: 'Varanasi, UP', category: 'vegetables', lat: 25.3176, lng: 82.9739 },
  { name: 'Green Chili', price: 3500, quantity: 50, farmer: 'Krishna Murthy', location: 'Guntur, AP', category: 'vegetables', lat: 16.3067, lng: 80.4365 },
  { name: 'Spinach', price: 1200, quantity: 40, farmer: 'Suresh Rathore', location: 'Jaipur, Rajasthan', category: 'vegetables', lat: 26.9124, lng: 75.7873 },
  { name: 'Carrot', price: 1900, quantity: 70, farmer: 'Tashi Dorjee', location: 'Ooty, TN', category: 'vegetables', lat: 11.4064, lng: 76.6932 },
  { name: 'Radish', price: 1100, quantity: 60, farmer: 'Gopal Das', location: 'Allahabad, UP', category: 'vegetables', lat: 25.4358, lng: 81.8463 },
  { name: 'Pumpkin', price: 1300, quantity: 120, farmer: 'Laxmi Bai', location: 'Raipur, Chhattisgarh', category: 'vegetables', lat: 21.2514, lng: 81.6296 },
  { name: 'Bitter Gourd', price: 3000, quantity: 30, farmer: 'Ravi Shankar', location: 'Varanasi, UP', category: 'vegetables', lat: 25.3176, lng: 82.9739 },
  { name: 'Bottle Gourd', price: 1200, quantity: 80, farmer: 'Sitaram Gupta', location: 'Patna, Bihar', category: 'vegetables', lat: 25.5941, lng: 85.1376 },
  
  // Fruits
  { name: 'Banana', price: 2500, quantity: 400, farmer: 'Kannan Raj', location: 'Thanjavur, TN', category: 'fruits', lat: 10.7870, lng: 79.1387 },
  { name: 'Mango', price: 5500, quantity: 150, farmer: 'Abdul Khan', location: 'Lucknow, UP', category: 'fruits', lat: 26.8467, lng: 80.9462 },
  { name: 'Orange', price: 4500, quantity: 120, farmer: 'Santosh Warghade', location: 'Nagpur, Maharashtra', category: 'fruits', lat: 21.1458, lng: 79.0882 },
  { name: 'Apple', price: 8000, quantity: 80, farmer: 'Mohinder Singh', location: 'Shimla, HP', category: 'fruits', lat: 31.1048, lng: 77.1734 }
];

db.serialize(() => {
  // Clear existing crops
  db.run('DELETE FROM crops', (err) => {
    if (err) console.error('Error clearing crops:', err);
    else console.log('✅ Old crops deleted');
  });

  // Insert new crops
  crops.forEach((crop, index) => {
    db.run(
      `INSERT INTO crops (name, price, quantity, farmer, location, category, lat, lng) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [crop.name, crop.price, crop.quantity, crop.farmer, crop.location, crop.category, crop.lat, crop.lng],
      function(err) {
        if (err) console.error(`Error inserting ${crop.name}:`, err);
        else console.log(`✅ Inserted: ${crop.name} (ID: ${this.lastID})`);
      }
    );
  });
});

setTimeout(() => {
  db.close();
  console.log('🎉 Database updated with 28 crops!');
}, 2000);