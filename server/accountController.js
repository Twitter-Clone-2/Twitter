const bcrypt = require("bcrypt");
const pool = require("./dataBase/index");
const { endPool, startPool } = require("./dataBase/index");

async function getAllUsers(req, res) {
  const db = await startPool();
  const query = `SELECT * FROM accounts;`;
  try {
    const results = await db.query(query);
    res.send(results.rows);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}

async function getOneUser(req, res) {
  const db = await startPool();
  let { id } = req.body;
  const query = `SELECT * FROM accounts WHERE id = ${id}`;
  try {
    const results = await db.query(query);
    res.send(results.rows);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}

async function getOneUserByEmail(req, res) {
  const db = await startPool();
  let { email } = req.body;
  const query = `SELECT * FROM accounts WHERE email = '${email}'`;

  try {
    const results = await db.query(query);
    res.send(results.rows);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}

async function register(req, res) {
  const db = await startPool();
  let { first_name, last_name, email, password, username, bio, location } =
    req.body;

  bcrypt.hash(password, 10).then((hash) => {
    password = hash;
    db.query(
      `INSERT INTO accounts (first_name, last_name , email, password, username, bio, location) VALUES ('${first_name}','${last_name}','${email}','${password}','${username}','${bio}','${location}');`
    )
      .then(() => {
        res.status(200).send("Account created");
        endPool(db);
      })
      .catch((err) => {
        console.log(err);
        endPool(db);
        return res.status(400);
      });
  });
}

async function login(req, res) {
  const db = await startPool();
  let { email, password } = req.body;
  const queryForUser = `SELECT * FROM accounts WHERE email = '${email}';`;

  try {
    const results = await db.query(queryForUser);
    let user = results.rows[0];
    if (!user) {
      endPool(db);
      return res.send(false);
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      console.log("passwords dont match");
      endPool(db);
      return res.send(false);
    }
    res.json({
      user: user,
      status: true,
    });
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}

async function deleteUser(req, res) {
  const db = await startPool();
  const { id } = req.body;
  const query = `DELETE FROM accounts WHERE id = ${id};`;
  try {
    await db.query(query);
    res.status(200).send(`Deleted account with id of ${id}`);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}

async function updateAccountInformation(req, res) {
  const db = await startPool();
  const { id, first_name, last_name, username, bio, location } = req.body;
  const query = `UPDATE accounts SET first_name = '${first_name}', last_name = '${last_name}' , username = '${username}' , bio = '${bio}', location = '${location}' WHERE id = ${id} `;

  console.log(query);
  try {
    await db.query(query);
    try {
      queryForAccountDetails = `SELECT * FROM accounts where id = ${id}`;
      results = await db.query(queryForAccountDetails);
      res.status(200).send(results);
      endPool(db);
    } catch (e) {
      endPool(db);
    }
  } catch (e) {
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  register,
  login,
  deleteUser,
  getOneUserByEmail,
  updateAccountInformation,
};
