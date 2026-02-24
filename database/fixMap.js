const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

async function fixMap() {
  const db = await open({
    filename: path.join(__dirname, 'cropconnect.db'),
    driver: sqlite3.Database
  });

  console.log('✅ Database connected');

  // Add columns if missing
  try {
    await db.exec('ALTER TABLE crops ADD COLUMN lat REAL');
    console.log('✅ Added lat column');
  } catch (e) {
    console.log('⚠️ lat column already exists');
  }
  
  try {
    await db.exec('ALTER TABLE crops ADD COLUMN lng REAL');
    console.log('✅ Added lng column');
  } catch (e) {
    console.log('⚠️ lng column already exists');
  }

  // Update coordinates
  const updates = [
    { name: 'Wheat', lat: 30.9010, lng: 75.8573 },
    { name: 'Rice', lat: 31.6340, lng: 74.8723 },
    { name: 'Corn', lat: 25.3176, lng: 82.9739 },
    { name: 'Barley', lat: 28.7435, lng: 77.7628 },
    { name: 'Millet', lat: 26.9124, lng: 75.7873 },
    { name: 'Soybean', lat: 22.7196, lng: 75.8577 },
    { name: 'Green Gram', lat: 25.4484, lng: 78.5685 },
    { name: 'Black Gram', lat: 23.8388, lng: 78.7378 },
    { name: 'Chickpea', lat: 20.6986, lng: 77.0023 },
    { name: 'Pigeon Pea', lat: 17.3297, lng: 76.8343 },
    { name: 'Potato', lat: 27.1767, lng: 78.0081 },
    { name: 'Onion', lat: 19.9615, lng: 73.8089 },
    { name: 'Tomato', lat: 13.1356, lng: 78.1321 },
    { name: 'Cauliflower', lat: 31.9577, lng: 77.1090 },
    { name: 'Cabbage', lat: 19.9615, lng: 73.8089 },
    { name: 'Brinjal', lat: 14.7932, lng: 75.4027 },
    { name: 'Okra', lat: 25.3176, lng: 82.9739 },
    { name: 'Green Chili', lat: 16.3067, lng: 80.4365 },
    { name: 'Spinach', lat: 26.9124, lng: 75.7873 },
    { name: 'Carrot', lat: 11.4064, lng: 76.6932 },
    { name: 'Radish', lat: 25.4358, lng: 81.8463 },
    { name: 'Pumpkin', lat: 21.2514, lng: 81.6296 },
    { name: 'Bitter Gourd', lat: 25.3176, lng: 82.9739 },
    { name: 'Bottle Gourd', lat: 25.5941, lng: 85.1376 },
    { name: 'Banana', lat: 10.7870, lng: 79.1387 },
    { name: 'Mango', lat: 26.8467, lng: 80.9462 },
    { name: 'Orange', lat: 21.1458, lng: 79.0882 },
    { name: 'Apple', lat: 31.1048, lng: 77.1734 }
  ];

  for (const crop of updates) {
    await db.run(
      'UPDATE crops SET lat = ?, lng = ? WHERE name LIKE ?',
      [crop.lat, crop.lng, `%${crop.name}%`]
    );
    console.log(`✅ Updated: ${crop.name}`);
  }

  const count = await db.get('SELECT COUNT(*) as total FROM crops WHERE lat IS NOT NULL');
  console.log(`🎉 Total ${count.total} crops have coordinates!`);
}

fixMap();