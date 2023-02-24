const { Pool } = require("pg");
require("dotenv").config();

const credentials = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

async function startPool() {
  try {
    const pool = new Pool(credentials);
    return await pool.connect();
  } catch (e) {}
}

function endPool(db) {
  db.release();
}
module.exports = { endPool, startPool };
