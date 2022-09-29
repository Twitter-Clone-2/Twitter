const bcrypt = require("bcrypt");
const pool = require("./dataBase/index");
const { endPool, startPool } = require("./dataBase/index");

async function followAnotherUser(req, res) {
  const db = await startPool();
  const { follower, following } = req.body;
  const query = `INSERT INTO relationship (follower, following) VALUES (${follower}, ${following});`;

  try {
    await db.query(query);
    res.status(200).send(true);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}

async function unFollowAnotherUser(req, res) {
  const db = await startPool();
  const { follower, following } = req.body;
  const query = `DELETE FROM relationship WHERE follower = ${follower} AND following = ${following};`;

  try {
    await db.query(query);
    res.status(200).send(true);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}

async function selectAllFollowersAndTheirAccounts(req, res) {
  const db = await startPool();
  const { following } = req.params;
  const query = `SELECT * FROM relationship LEFT JOIN accounts ON relationship.follower = accounts.id WHERE following = ${following};`;

  try {
    const results = await db.query(query);
    res.status(200).send(results);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}

async function selectAllFollowingAndTheirAccounts(req, res) {
  const db = await startPool();
  const { follower } = req.params;
  const query = `SELECT * FROM relationship LEFT JOIN accounts ON relationship.following = accounts.id WHERE follower = ${follower};`;

  try {
    const results = await db.query(query);
    res.status(200).send(results);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}

module.exports = {
  followAnotherUser,
  unFollowAnotherUser,
  selectAllFollowersAndTheirAccounts,
  selectAllFollowingAndTheirAccounts,
};
