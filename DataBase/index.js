const { Pool, Client } = require("pg");

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "twitterdb",
  password: "root",
  port: 5432,
};
const pool = new Pool(credentials);

module.exports = pool;
