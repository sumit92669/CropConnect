const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database', 'cropconnect.db'));

// Your exact crop names and the new image URLs you provided
const imageUpdates = [
  { name: 'Wheat', url: 'https://kj1bcdn.b-cdn.net/media/10277/how-to-grow-wheat.jpg?width=1200' },
  { name: 'Rice', url: 'https://images.squarespace-cdn.com/content/v1/62e7a92f066fa3730dcd4604/6045ca78-903c-46c4-92bb-584a34b8689f/iStock-1185860793.jpg' },
  { name: 'Corn', url: 'https://www.aces.edu/wp-content/uploads/2018/08/shutterstock_-Zeljko-Radojko_field-corn.jpg' },
  { name: 'Barley', url: 'https://cdn.britannica.com/31/75931-050-FED41F1F/Barley.jpg' },
  { name: 'Millet', url: 'https://img.freepik.com/premium-photo/raw-ripe-millet-crops-field-agriculture-landscape-view_656518-2279.jpg?w=2000' },
  { name: 'Soybean', url: 'https://tse1.mm.bing.net/th/id/OIP.4Cel8y5QrH8OlID0OSGMogHaE-?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { name: 'Green Gram', url: 'https://thumbs.dreamstime.com/b/green-gram-crop-field-moong-high-protein-mung-beans-plant-garden-agriculture-mong-bean-220327389.jpg' },
  { name: 'Black Gram', url: 'https://m.media-amazon.com/images/I/51pjcPf5fyL.jpg' },
  { name: 'Chickpea', url: 'https://www.shutterstock.com/image-photo/chickpea-plant-farm-green-chickpeas-600nw-2479189155.jpg' },
  { name: 'Pigeon Pea', url: 'https://tse3.mm.bing.net/th/id/OIP.H7Pe667f4Bvs4Q72OtqcBQHaE6?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { name: 'Potato', url: 'https://img.freepik.com/premium-photo/closeup-growing-potatoes-farm-field_1092689-63313.jpg?w=1380' },
  { name: 'Onion', url: 'https://img.khetivyapar.com/images/news/1712142861-use-fertilizer-in-onion-crops-in-this-way-and-get-a-bumper-crop-yield-onion-cultivation-onion-farming-in-india.jpg' },
  { name: 'Tomato', url: 'https://www.thespruce.com/thmb/ZsK25I6NhZJr9Y5Bxj3bGitaQL4=/5750x3827/filters:no_upscale():max_bytes(150000):strip_icc()/top-tomato-growing-tips-1402587-10-f09428178dbe4e64b88189ea97d831b8.jpg' },
  { name: 'Cauliflower', url: 'https://thumbs.dreamstime.com/z/cauliflower-field-crop-many-cauliflowers-agriculture-landscape-vegetable-farm-drawing-imitation-generative-ai-illustration-324339661.jpg?w=992' },
  { name: 'Cabbage', url: 'https://img.freepik.com/premium-photo/cabbage-field-cultivation-lush-green-leafy-cabbage-crop-growing-vast-agriculture-land-ideal_1014870-11037.jpg?w=996' },
  { name: 'Brinjal', url: 'https://plantsinformation.com/wp-content/uploads/Brinjal-600x400.jpg' },
  { name: 'Okra', url: 'https://1.bp.blogspot.com/-TjpJBMF_Vdg/X8zQQMAZ68I/AAAAAAAAAGg/j_LNH1obHxglbPD5xP5_kUmhxdN88xICgCLcBGAsYHQ/s690/1.%2BJuan%2Bmagsasaka%2Bokra%2Bproduction%2Bguide.jpg' },
  { name: 'Green Chili', url: 'https://tse4.mm.bing.net/th/id/OIP.nY5MTN3_ZfzoAvdGYyDN_gHaFj?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { name: 'Spinach', url: 'https://kj1bcdn.b-cdn.net/media/85040/spinach_nutrition.jpg' },
  { name: 'Carrot', url: 'https://img.freepik.com/premium-photo/ripe-carrots-harvested-vegetable-farm-carrot-harvest-carrot-cultivation-concept_561246-1590.jpg?w=2000' },
  { name: 'Radish', url: 'https://tse3.mm.bing.net/th/id/OIP.z8vNIx7GO6pK7K6mtDOFtwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { name: 'Pumpkin', url: 'https://tse4.mm.bing.net/th/id/OIP.judpkLZqVhePKH6PoSPBDAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { name: 'Bitter Gourd', url: 'https://cdn.shopify.com/s/files/1/0663/9613/articles/Bittergourd.webp?v=1687165171' },
  { name: 'Bottle Gourd', url: 'https://tse1.mm.bing.net/th/id/OIP.UfaU-iD55fJuLU7_VhyaUQHaFh?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { name: 'Banana', url: 'https://eos.com/wp-content/uploads/2024/05/banana-growing-plantation.png.webp' },
  { name: 'Mango', url: 'https://tse1.explicit.bing.net/th/id/OIP.gHjmjUFiwKtWf94dvRJpUwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { name: 'Orange', url: 'https://floridainsider.com/wp-content/uploads/2022/02/orangecrop.png' },
  { name: 'Apple', url: 'https://tse3.mm.bing.net/th/id/OIP.sRjScPrq55-JTnURu8-3nAHaE4?rs=1&pid=ImgDetMain&o=7&rm=3' }
];

console.log('🔄 Starting image update for all crops...');

let total = imageUpdates.length;
let completed = 0;
let successCount = 0;
let failCount = 0;

imageUpdates.forEach((item) => {
  db.run(
    'UPDATE crops SET image = ? WHERE name = ? OR name LIKE ?',
    [item.url, item.name, `%${item.name}%`],
    function(err) {
      completed++;
      if (err) {
        failCount++;
        console.log(`❌ ${item.name}: Error - ${err.message}`);
      } else if (this.changes === 0) {
        failCount++;
        console.log(`⚠️ ${item.name}: Not found in database`);
      } else {
        successCount++;
        console.log(`✅ ${item.name}: Updated successfully`);
      }
      
      if (completed === total) {
        console.log('\n' + '='.repeat(50));
        console.log(`🎉 IMAGE UPDATE SUMMARY`);
        console.log('='.repeat(50));
        console.log(`✅ Successful: ${successCount} crops`);
        console.log(`❌ Failed/Not Found: ${failCount} crops`);
        console.log(`📊 Total processed: ${total} crops`);
        console.log('='.repeat(50));
        
        // Optional: Show which ones might have issues
        if (failCount > 0) {
          console.log('\n⚠️  Note: Some crops failed. Common reasons:');
          console.log('   - The crop name in database might be slightly different');
          console.log('   - The image URL might be broken or expired');
          console.log('   - You may need to run a more specific match script');
        }
        
        db.close();
      }
    }
  );
});