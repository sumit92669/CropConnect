const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database', 'cropconnect.db'));

// Exact crop names and their new images
const imageUpdates = [
  { name: 'Wheat', url: 'https://cdn.britannica.com/90/94190-050-C0BA6A58/Cereal-crops-wheat-reproduction.jpg' },
  { name: 'Rice', url: 'https://images.pexels.com/photos/4110252/pexels-photo-4110252.jpeg' },
  { name: 'Corn', url: 'https://images.pexels.com/photos/5473170/pexels-photo-5473170.jpeg' },
  { name: 'Barley', url: 'https://www.farmatma.in/wp-content/uploads/2019/05/barley-crop.jpg' },
  { name: 'Millet', url: 'https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg' },
  { name: 'Soybean', url: 'https://images.pexels.com/photos/3843088/pexels-photo-3843088.jpeg' },
  { name: 'Green Gram', url: 'https://apseeds.ap.gov.in/Assets/Images/inner-pages-img/GreenGram.jpg' },
  { name: 'Black Gram', url: 'https://tse2.mm.bing.net/th/id/OIP.FlrRFkr6R8h3h61-iu-1CgHaFr?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { name: 'Chickpea', url: 'https://www.bhg.com/thmb/AFG80NSx7Vc0YRX9fTWU9ye9e6Y=/3500x0/filters:no_upscale():strip_icc()/grow-chickpeas-8655370-fea1e109fea143d1a09a862f0cbb17f1.jpg' },
  { name: 'Onion', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Tomato', url: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg' },
  { name: 'Potato', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Cauliflower', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Cabbage', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Brinjal', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Okra', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Carrot', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Spinach', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' }
];

console.log('🔄 Updating images...');

let total = imageUpdates.length;
let completed = 0;

imageUpdates.forEach((item) => {
  db.run(
    'UPDATE crops SET image = ? WHERE name = ?',
    [item.url, item.name],
    function(err) {
      if (err) {
        console.log(`❌ ${item.name}: Error -`, err.message);
      } else if (this.changes === 0) {
        console.log(`⚠️ ${item.name}: Not found in database`);
      } else {
        console.log(`✅ ${item.name}: Updated`);
      }
      
      completed++;
      if (completed === total) {
        console.log('\n🎉 Image update completed!');
        db.close();
      }
    }
  );
});