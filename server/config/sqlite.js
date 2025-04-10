const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

let dbInstance = null;

async function getDb() {
  if (!dbInstance) {
    dbInstance = await open({
      filename: './database.db',
      driver: sqlite3.Database,
    });

    await dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      );
      CREATE TABLE IF NOT EXISTS orders (
        order_id TEXT PRIMARY KEY,
        user_id INTEGER,
        product_name TEXT,
        price REAL,
        status TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
  }
  return dbInstance;
}

async function addUser(username) {
  const db = await getDb();
  const existing = await db.get('SELECT id FROM users WHERE username = ?', username);
  if (existing) return existing.id;
  const { lastID } = await db.run('INSERT INTO users (username) VALUES (?)', username);
  return lastID;
}

module.exports = { getDb, addUser };