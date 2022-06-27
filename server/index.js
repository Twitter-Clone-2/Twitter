const express = require("express");
const app = express();
const cors = require("cors");
const serverless = require("serverless-http");
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// AWS important info
// Access key id = AKIAWUDQ5NFXQ4XJDYKC
//Secret Access key = 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
const {
  getAllUsers,
  getOneUser,
  register,
  login,
  deleteUser,
  getOneUserByEmail,
  createTweet,
  findAllTweetsFromOneUser,
} = require("./controllers");
//important query SELECT * FROM replies RIGHT JOIN accounts ON accounts.id = replies.accounts_id RIGHT JOIN tweets ON tweets.id = replies.tweets_id

//get all users
app.get("/api/users", getAllUsers);
// get one user
//id
app.post("/api/user", getOneUser);
//email
app.post("/api/user/email", getOneUserByEmail);
//login
app.post("/api/login", login);
//register
app.post("/api/register", register);
//tweet
app.post("/api/create/tweet", createTweet);
app.post("/api/findAllTweetsFromOneUser", findAllTweetsFromOneUser);
//likes
//retweets

//reply

//delete an account
app.delete("/api/delete/account", deleteUser);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports.handler = serverless(app);
