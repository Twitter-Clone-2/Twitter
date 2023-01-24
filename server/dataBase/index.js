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
    console.log("console.log that is a success");
    return await pool.connect();
  } catch (e) {
    console.error("Console log that hiot an error", e);
  }
}

function endPool(db) {
  db.release();
}
module.exports = { endPool, startPool };
