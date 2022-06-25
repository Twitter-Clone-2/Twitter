const { Pool, Client } = require("pg");

const credentials = {
  user: "xomllrqn",
  host: "heffalump.db.elephantsql.com",
  database: "xomllrqn",
  password: "kTfz0mBGRigsvHG76TSz1mAMhAWl0R4K",
  port: 5432,
};
const pool = new Pool(credentials);

module.exports = pool;
