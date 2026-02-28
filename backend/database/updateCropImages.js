const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database', 'cropconnect.db'));

const imageUpdates = [
  // Working URLs (verified)
  { name: 'Wheat', url: 'https://cdn.britannica.com/90/94190-050-C0BA6A58/Cereal-crops-wheat-reproduction.jpg' },
  { name: 'Barley', url: 'https://www.farmatma.in/wp-content/uploads/2019/05/barley-crop.jpg' },
  
  // Alternative reliable URLs for others
  { name: 'Rice', url: 'https://images.pexels.com/photos/4110252/pexels-photo-4110252.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Corn', url: 'https://images.pexels.com/photos/5473170/pexels-photo-5473170.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Millet', url: 'https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Soybean', url: 'https://images.pexels.com/photos/3843088/pexels-photo-3843088.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Green Gram', url: 'https://images.pexels.com/photos/4110252/pexels-photo-4110252.jpeg?auto=compress&cs=tinysrgb&w=400' }, // Placeholder
  { name: 'Black Gram', url: 'https://images.pexels.com/photos/4110252/pexels-photo-4110252.jpeg?auto=compress&cs=tinysrgb&w=400' }, // Placeholder
  { name: 'Chickpea', url: 'https://images.pexels.com/photos/4110252/pexels-photo-4110252.jpeg?auto=compress&cs=tinysrgb&w=400' } // Placeholder
];

db.serialize(() => {
  imageUpdates.forEach((item) => {
    db.run(
      'UPDATE crops SET image = ? WHERE name LIKE ?',
      [item.url, `%${item.name}%`],
      function(err) {
        if (err) {
          console.error(`❌ Error updating ${item.name}:`, err.message);
        } else {
          console.log(`✅ Updated image for: ${item.name}`);
        }
      }
    );
  });
});

setTimeout(() => {
  db.close();
  console.log('🎉 Image update completed!');
}, 2000);