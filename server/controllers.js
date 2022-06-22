const db = require("../DataBase/index");
const bcrypt = require("bcrypt");

async function getAllUsers(req, res) {
  const query = `SELECT * FROM accounts;`;
  try {
    const results = await db.query(query);
    res.send(results.rows);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
  }
}

async function getOneUser(req, res) {
  let { id } = req.body;
  const query = `SELECT * FROM accounts WHERE id = ${id}`;

  try {
    const results = await db.query(query);
    res.send(results.rows);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
  }
}

async function getOneUserByEmail(req, res) {
  let { email } = req.body;
  console.log(email);
  const query = `SELECT * FROM accounts WHERE email = '${email}'`;

  try {
    const results = await db.query(query);
    res.send(results.rows);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
  }
}

async function register(req, res) {
  let { first_name, last_name, email, password, username, bio, location } =
    req.body;

  bcrypt.hash(password, 10).then((hash) => {
    password = hash;
    db.query(
      `INSERT INTO accounts (first_name, last_name , email, password, username, bio, location) VALUES ('${first_name}','${last_name}','${email}','${password}','${username}','${bio}','${location}');`
    )
      .then(() => {
        res.status(200).send("Account created");
      })
      .catch((err) => {
        console.log(err);
        return res.status(400);
      });
  });
}

async function login(req, res) {
  let { email, password } = req.body;
  const queryForUser = `SELECT * FROM accounts WHERE email = '${email}';`;

  try {
    const results = await db.query(queryForUser);

    let user = results.rows[0];
    console.log(user);

    if (!user) {
      return res.send(false);
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      console.log("passwords dont match");
      return res.send(false);
    }
    console.log("hello correct user");
    res.json({
      id: user.id,
      status: true,
    });
  } catch (e) {
    console.error(e.stack);
    res.status(400);
  }
}

async function deleteUser(req, res) {
  const { id } = req.body;
  const query = `DELETE FROM accounts WHERE id = ${id};`;

  try {
    const results = await db.query(query);
    res.status(200).send(`Deleted account with id of ${id}`);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
  }
}
module.exports = {
  getAllUsers,
  getOneUser,
  register,
  login,
  deleteUser,
  getOneUserByEmail,
};
