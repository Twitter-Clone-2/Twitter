const express = require("express");
const db = require("../DataBase/index");
const app = express();
const cors = require("cors");
const port = 8080;

app.use(cors());
app.use(express.json());

const {
  getAllUsers,
  getOneUser,
  register,
  login,
  deleteUser,
  getOneUserByEmail,
} = require("./controllers");
//important query SELECT * FROM replies RIGHT JOIN accounts ON accounts.id = replies.accounts_id RIGHT JOIN tweets ON tweets.id = replies.tweets_id

//get all users
app.get("/api/users", getAllUsers);
// get one user
//id
app.get("/api/user", getOneUser);
//email
app.get("/api/user/email", getOneUserByEmail);
//login
app.post("/api/login", login);
//register
app.post("/api/register", register);
//tweet

//likes
//retweets

//reply

//delete an account
app.delete("/api/delete/account", deleteUser);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
