const { Pool } = require("pg");

const credentials = {
  user: "xomllrqn",
  host: "heffalump.db.elephantsql.com",
  database: "xomllrqn",
  password: "kTfz0mBGRigsvHG76TSz1mAMhAWl0R4K",
  port: 5432,
  allowExitOnIdle: true,
};

async function startPool() {
  const pool = new Pool(credentials);
  return await pool.connect();
}
function endPool(db) {
  db.release();
}
module.exports = { endPool, startPool };
