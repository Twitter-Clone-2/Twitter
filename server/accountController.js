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
  let { id } = req.params;
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
  let { email } = req.params;
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

async function getOneUserByUsername(req, res) {
  const db = await startPool();
  const { username } = req.params;
  const query = `SELECT * FROM accounts where username = '${username}';`;

  try {
    const results = await db.query(query);
    res.status(200).send(results);
    endPool(db);
  } catch (e) {
    endPool(db);
    res.status(400).send(false);
    console.error(e.stack);
  }
}

async function register(req, res) {
  const db = await startPool();
  let { first_name, last_name, email, password, username, bio, location } =
    req.body;
  try {
    await db
      .query(
        `INSERT INTO accounts (first_name, last_name , email, password, username, bio, location) VALUES ('${first_name}','${last_name}','${email}','${password}','${username}','${bio}','${location}');`
      )
      .then(async () => {
        let newAccountID;
        const queryTograbIdOfNewAccount = `SELECT id FROM accounts WHERE username = '${username}'`;

        try {
          newAccountID = await db.query(queryTograbIdOfNewAccount);

          const queryToFollowOfficalAccount = `INSERT INTO relationship (follower, following) VALUES (${newAccountID.rows[0].id}, 833704888225202177);`;

          await db.query(queryToFollowOfficalAccount);
          endPool(db);
        } catch (e) {
          console.error(e.stack);
          res.status(400);
          endPool(db);
        }
        res.status(200).send("Account created");
      })
      .catch((err) => {
        console.error(err);
        endPool(db);
        return res.status(400);
      });
  } catch (e) {
    console.error(e);
    endPool(db);
    return res.status(400);
  }
}

async function login(req, res) {
  let i = 1;
  i++;
  const db = await startPool();
  i++;
  let { email, password } = req.body;
  i++;
  const queryForUser = `SELECT * FROM accounts WHERE email = '${email}';`;

  try {
    i++;
    const results = await db.query(queryForUser);

    i++;
    let user = results.rows[0];
    if (!user) {
      endPool(db);
      return res.send(false);
    }

    i++;
    const passwordCheck = password == user.password;
    if (!passwordCheck) {
      i++;
      endPool(db);
      return res.send(false);
    }

    i++;
    res.json({
      user: user,
      status: true,
    });
    endPool(db);
  } catch (e) {
    i++;
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
  const {
    id,
    first_name,
    last_name,
    username,
    bio,
    location,
    profile_picture,
    background_picture,
  } = req.body;
  const query = `UPDATE accounts SET first_name = '${first_name}', last_name = '${last_name}' , username = '${username}' , bio = '${bio}', location = '${location}', profile_picture = '${profile_picture}', background_picture = '${background_picture}' WHERE id = ${id} `;

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
  getOneUserByUsername,
};
