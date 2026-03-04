const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database', 'cropconnect.db'));

const imageUpdates = [
  { 
    name: 'Millet', 
    url: 'https://img.freepik.com/premium-photo/raw-ripe-millet-crops-field-agriculture-landscape-view_656518-2279.jpg?w=2000'
  },
  { 
    name: 'Soybean', 
    url: 'https://tse1.mm.bing.net/th/id/OIP.4Cel8y5QrH8OlID0OSGMogHaE-?rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  { 
    name: 'Green Gram', 
    url: 'https://thumbs.dreamstime.com/b/green-gram-crop-field-moong-high-protein-mung-beans-plant-garden-agriculture-mong-bean-220327389.jpg'
  },
  { 
    name: 'Black Gram', 
    url: 'https://m.media-amazon.com/images/I/51pjcPf5fyL.jpg'
  }
];

console.log('🔄 Updating crop images...');

let completed = 0;

imageUpdates.forEach((item) => {
  db.run(
    'UPDATE crops SET image = ? WHERE name LIKE ?',
    [item.url, `%${item.name}%`],
    function(err) {
      if (err) {
        console.error(`❌ Error updating ${item.name}:`, err.message);
      } else if (this.changes === 0) {
        console.log(`⚠️ ${item.name} not found in database`);
      } else {
        console.log(`✅ Updated ${item.name}`);
      }
      
      completed++;
      if (completed === imageUpdates.length) {
        console.log('🎉 All images updated!');
        db.close();
      }
    }
  );
});