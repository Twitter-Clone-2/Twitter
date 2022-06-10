const express = require("express");
const db = require("../DataBase/index");
const app = express();
const cors = require("cors");
const port = 8080;
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

const { getAllUsers } = require("./controllers");
//important query SELECT * FROM replies RIGHT JOIN accounts ON accounts.id = replies.accounts_id RIGHT JOIN tweets ON tweets.id = replies.tweets_id
//get all users
// app.get("/api/users", (req, res) => {
//   db.query("SELECT * FROM accounts")
//     .then((response) => res.send(response.rows))
//     .catch((e) => console.log(e));
// });

//this doesnt work
//app.get("/api/users", () => getAllUsers);

app.get("/api/users", getAllUsers);

//login
// app.post("/api/login", (req,res) =>{
//   const account =
// })

//register
app.post("/api/register", (req, res) => {
  console.log(req.body);
  let { first_name, last_name, email, password, username, bio, location } =
    req.body;
  console.log(first_name);
  bcrypt.hash(password, 10).then((hash) => {
    console.log(hash);
    password = hash;
    db.query(
      `INSERT INTO accounts (first_name, last_name , username, password, email, bio, location) VALUES ('${first_name}','${last_name}','${email}','${password}','${username}','${bio}','${location}');`
    )
      .then(() => res.status(200).send("account created"))
      .catch((err) => console.log("err"));
  });
  console.log(password);
});
//tweet

//likes

//retweets

//reply

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
