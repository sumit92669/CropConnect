const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'cropconnect.db'));

db.serialize(() => {
  // Add columns if they don't exist
  db.run("ALTER TABLE crops ADD COLUMN lat REAL", (err) => {
    if (err) console.log("Column lat already exists or error:", err.message);
    else console.log("✅ Added lat column");
  });
  
  db.run("ALTER TABLE crops ADD COLUMN lng REAL", (err) => {
    if (err) console.log("Column lng already exists or error:", err.message);
    else console.log("✅ Added lng column");
  });
});

db.close();