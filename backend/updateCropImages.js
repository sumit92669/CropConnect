const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database', 'cropconnect.db'));

// Working image URLs
const imageUpdates = [
  // Grains
  { name: 'Wheat', url: 'https://cdn.britannica.com/90/94190-050-C0BA6A58/Cereal-crops-wheat-reproduction.jpg' },
  { name: 'Rice', url: 'https://media.istockphoto.com/id/1364729870/photo/the-beautiful-agricultural-green-seedling-ricefield-in-sunset.jpg?s=612x612&w=0&k=20&c=KjM5GtCeqL2gLvZQJfVY7X8LhY5wqWbC4u1fZzYxXzY=' },
  { name: 'Corn', url: 'https://images.pexels.com/photos/5473170/pexels-photo-5473170.jpeg' },
  { name: 'Barley', url: 'https://www.farmatma.in/wp-content/uploads/2019/05/barley-crop.jpg' },
  { name: 'Millet', url: 'https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg' },
  
  // Pulses
  { name: 'Soybean', url: 'https://images.pexels.com/photos/3843088/pexels-photo-3843088.jpeg' },
  { name: 'Green Gram', url: 'https://5.imimg.com/data5/SELLER/Default/2023/12/372377215/UR/NQ/FJ/119051270/toor-dal.jpg' },
  { name: 'Black Gram', url: 'https://5.imimg.com/data5/SELLER/Default/2023/7/330983210/OT/FQ/AI/119051270/urad-dal.jpg' },
  { name: 'Chickpea', url: 'https://5.imimg.com/data5/SELLER/Default/2023/11/364696146/VP/RK/RU/15419080/bengal-gram.jpg' },
  { name: 'Pigeon Pea', url: 'https://5.imimg.com/data5/SELLER/Default/2023/12/372377215/UR/NQ/FJ/119051270/toor-dal.jpg' },
  
  // Vegetables (generic vegetable images)
  { name: 'Potato', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Onion', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Tomato', url: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg' },
  { name: 'Cauliflower', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Cabbage', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Brinjal', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Okra', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Green Chili', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Spinach', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Carrot', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Radish', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Pumpkin', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Bitter Gourd', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  { name: 'Bottle Gourd', url: 'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg' },
  
  // Fruits
  { name: 'Banana', url: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg' },
  { name: 'Mango', url: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg' },
  { name: 'Orange', url: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg' },
  { name: 'Apple', url: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg' }
];

console.log('🔄 Starting image update...');

db.serialize(() => {
  let count = 0;
  imageUpdates.forEach((item) => {
    db.run(
      'UPDATE crops SET image = ? WHERE name LIKE ?',
      [item.url, `%${item.name}%`],
      function(err) {
        if (err) {
          console.error(`❌ ${item.name}:`, err.message);
        } else {
          count++;
          console.log(`✅ ${item.name} updated`);
        }
      }
    );
  });
  
  setTimeout(() => {
    console.log(`🎉 Total ${count} crops updated!`);
    db.close();
  }, 2000);
});