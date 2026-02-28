const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database', 'cropconnect.db'));

// Exact crop names as they appear in database
const updates = [
  // Grains
  { id: 1, name: 'Wheat', url: 'https://cdn.britannica.com/90/94190-050-C0BA6A58/Cereal-crops-wheat-reproduction.jpg' },
  { id: 2, name: 'Rice', url: 'https://media.istockphoto.com/id/1364729870/photo/the-beautiful-agricultural-green-seedling-ricefield-in-sunset.jpg?s=612x612&w=0&k=20&c=KjM5GtCeqL2gLvZQJfVY7X8LhY5wqWbC4u1fZzYxXzY=' },
  { id: 3, name: 'Corn', url: 'https://images.pexels.com/photos/5473170/pexels-photo-5473170.jpeg' },
  { id: 4, name: 'Barley', url: 'https://www.farmatma.in/wp-content/uploads/2019/05/barley-crop.jpg' },
  { id: 5, name: 'Millet', url: 'https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg' },
  
  // Pulses
  { id: 6, name: 'Soybean', url: 'https://images.pexels.com/photos/3843088/pexels-photo-3843088.jpeg' },
  { id: 7, name: 'Green Gram', url: 'https://5.imimg.com/data5/SELLER/Default/2023/12/372377215/UR/NQ/FJ/119051270/toor-dal.jpg' },
  { id: 8, name: 'Black Gram', url: 'https://5.imimg.com/data5/SELLER/Default/2023/7/330983210/OT/FQ/AI/119051270/urad-dal.jpg' },
  { id: 9, name: 'Chickpea', url: 'https://5.imimg.com/data5/SELLER/Default/2023/11/364696146/VP/RK/RU/15419080/bengal-gram.jpg' },
  { id: 10, name: 'Pigeon Pea', url: 'https://5.imimg.com/data5/SELLER/Default/2023/12/372377215/UR/NQ/FJ/119051270/toor-dal.jpg' }
];

console.log('🔄 Updating images...');

// Update one by one with exact ID
const runUpdates = () => {
  let completed = 0;
  
  updates.forEach((item) => {
    db.run(
      'UPDATE crops SET image = ? WHERE id = ?',
      [item.url, item.id],
      function(err) {
        if (err) {
          console.error(`❌ ID ${item.id} (${item.name}):`, err.message);
        } else {
          completed++;
          console.log(`✅ ID ${item.id}: ${item.name} updated`);
        }
        
        if (completed === updates.length) {
          console.log(`🎉 All ${completed} crops updated!`);
          db.close();
        }
      }
    );
  });
};

// Pehle check karo kitne crops hain
db.all('SELECT id, name FROM crops', [], (err, rows) => {
  if (err) {
    console.error('Database error:', err);
    return;
  }
  
  console.log(`📊 Total crops in database: ${rows.length}`);
  rows.forEach(row => console.log(`   ID ${row.id}: ${row.name}`));
  
  runUpdates();
});