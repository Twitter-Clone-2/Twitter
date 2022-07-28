const { Pool } = require("pg");
require("dotenv").config();

const credentials = {
  connectionString: process.env.DATABASE_URL,
  
};

async function startPool() {
  const pool = new Pool(credentials);
  return await pool.connect();
}

function endPool(db) {
  db.release();
}
module.exports = { endPool, startPool };
