const db = require("../DataBase/index");
async function getAllUsers(req, res) {
  const query = `SELECT * FROM accounts;`;
  try {
    const results = await db.query(query);
    res.send(results.rows);
  } catch (e) {
    console.error(e.stack);
    res.send(e.stack);
  }
}
module.exports = { getAllUsers };
