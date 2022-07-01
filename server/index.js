const express = require("express");
const cors = require("cors");
const app = express();
const serverless = require("serverless-http");
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
  getAllUsers,
  getOneUser,
  register,
  login,
  deleteUser,
  getOneUserByEmail,
  createTweet,
  findAllTweetsFromOneUser,
  unFollowAnotherUser,
  followAnotherUser,
  findFollowers,
  findFollowing,
} = require("./controllers");
//important query SELECT * FROM replies RIGHT JOIN accounts ON accounts.id = replies.accounts_id RIGHT JOIN tweets ON tweets.id = replies.tweets_id

//get all users
app.get("/api/users", cors(), getAllUsers);
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
//follow status
app.post("/api/findFollowers", findFollowers);
app.post("/api/findFollowing", findFollowing);
app.post("/api/follow", followAnotherUser);
app.post("/api/unfollow", unFollowAnotherUser);
//delete an account
app.delete("/api/delete/account", deleteUser);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports.handler = serverless(app);
