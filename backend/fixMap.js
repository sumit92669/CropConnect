const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database', 'cropconnect.db'));

console.log('🔄 Fixing map coordinates...');

// City coordinates for all crops
const coordinates = {
  'Ludhiana': { lat: 30.9010, lng: 75.8573 },
  'Amritsar': { lat: 31.6340, lng: 74.8723 },
  'Varanasi': { lat: 25.3176, lng: 82.9739 },
  'Hapur': { lat: 28.7435, lng: 77.7628 },
  'Jaipur': { lat: 26.9124, lng: 75.7873 },
  'Indore': { lat: 22.7196, lng: 75.8577 },
  'Jhansi': { lat: 25.4484, lng: 78.5685 },
  'Sagar': { lat: 23.8388, lng: 78.7378 },
  'Akola': { lat: 20.6986, lng: 77.0023 },
  'Gulbarga': { lat: 17.3297, lng: 76.8343 },
  'Agra': { lat: 27.1767, lng: 78.0081 },
  'Nashik': { lat: 19.9615, lng: 73.8089 },
  'Kolar': { lat: 13.1356, lng: 78.1321 },
  'Kullu': { lat: 31.9577, lng: 77.1090 },
  'Haveri': { lat: 14.7932, lng: 75.4027 },
  'Guntur': { lat: 16.3067, lng: 80.4365 },
  'Ooty': { lat: 11.4064, lng: 76.6932 },
  'Allahabad': { lat: 25.4358, lng: 81.8463 },
  'Raipur': { lat: 21.2514, lng: 81.6296 },
  'Patna': { lat: 25.5941, lng: 85.1376 },
  'Thanjavur': { lat: 10.7870, lng: 79.1387 },
  'Lucknow': { lat: 26.8467, lng: 80.9462 },
  'Nagpur': { lat: 21.1458, lng: 79.0882 },
  'Shimla': { lat: 31.1048, lng: 77.1734 }
};

// First, add lat/lng columns if they don't exist
db.serialize(() => {
  db.run("ALTER TABLE crops ADD COLUMN lat REAL", (err) => {
    if (err) console.log('⚠️ lat column already exists');
    else console.log('✅ Added lat column');
  });
  
  db.run("ALTER TABLE crops ADD COLUMN lng REAL", (err) => {
    if (err) console.log('⚠️ lng column already exists');
    else console.log('✅ Added lng column');
  });
});

// Wait a bit for columns to be added
setTimeout(() => {
  // Get all crops
  db.all('SELECT id, name, location FROM crops', [], (err, crops) => {
    if (err) {
      console.error('❌ Error fetching crops:', err);
      return;
    }

    console.log(`📊 Found ${crops.length} crops`);

    let updated = 0;
    crops.forEach((crop) => {
      let lat = 28.6139; // Default Delhi
      let lng = 77.2090;

      // Find matching city in location
      for (const [city, coord] of Object.entries(coordinates)) {
        if (crop.location && crop.location.includes(city)) {
          lat = coord.lat;
          lng = coord.lng;
          break;
        }
      }

      db.run(
        'UPDATE crops SET lat = ?, lng = ? WHERE id = ?',
        [lat, lng, crop.id],
        function(err) {
          if (err) {
            console.error(`❌ Error updating ${crop.name}:`, err.message);
          } else {
            updated++;
            console.log(`✅ Updated: ${crop.name} (${crop.location})`);
          }
        }
      );
    });

    setTimeout(() => {
      console.log(`\n🎉 Total ${updated} crops updated with coordinates!`);
      db.close();
    }, 2000);
  });
}, 1000);