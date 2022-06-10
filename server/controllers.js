const db = require("../DataBase/index");
const bcrypt = require("bcrypt");
const { query } = require("express");

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

async function getOneUser(req, res) {
  let { id } = req.body;
  const query = `SELECT * FROM accounts WHERE id = ${id}`;

  try {
    const results = await db.query(query);
    res.send(results.rows);
  } catch (e) {
    console.error(e.stack);
    res.send(e.stack);
  }
}

async function register(req, res) {
  let { first_name, last_name, email, password, username, bio, location } =
    req.body;

  bcrypt.hash(password, 10).then((hash) => {
    password = hash;
    db.query(
      `INSERT INTO accounts (first_name, last_name , username, password, email, bio, location) VALUES ('${first_name}','${last_name}','${email}','${password}','${username}','${bio}','${location}');`
    )
      .then(() => res.status(200).send("account created"))
      .catch((err) => console.log("err"));
  });
}
//Validations for incorrect login need to be fixed/added
async function login(req, res) {
  let { email, password } = req.body;
  const queryForUser = `SELECT * FROM accounts WHERE email = '${email}';`;

  try {
    const results = await db.query(queryForUser);
    //res.send(results.rows);
    let user = results.rows[0];
    console.log(user);
    //checks to see if there is a user with that email
    if (!user) {
      return res.status(400);
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      console.log("passwords dont match");
      return res.status(400);
    }
    console.log("hello correct user");
    res.json({ id: user.id });
    //checks to see if it is the correct password
  } catch (e) {
    console.error(e.stack);
    res.send(e.stack);
  }
}
module.exports = { getAllUsers, getOneUser, register, login };
