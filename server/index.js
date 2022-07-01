const express = require("express");
const cors = require("cors");
const app = express();
// const serverless = require("serverless-http");
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
app.options("*", cors()); // include before other routes
//get all users
app.get("/api/users", cors(), getAllUsers);
// get one user
//id
app.post("/api/user", cors(), getOneUser);
//email
app.post("/api/user/email", cors(), getOneUserByEmail);
//login
app.post("/api/login", cors(), login);
//register
app.post("/api/register", cors(), register);
//tweet
app.post("/api/create/tweet", cors(), createTweet);
app.post("/api/findAllTweetsFromOneUser", cors(), findAllTweetsFromOneUser);
//likes
//retweets

//reply
//follow status
app.post("/api/findFollowers", cors(), findFollowers);
app.post("/api/findFollowing", cors(), findFollowing);
app.post("/api/follow", cors(), followAnotherUser);
app.post("/api/unfollow", cors(), unFollowAnotherUser);
//delete an account
app.delete("/api/delete/account", cors(), deleteUser);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// module.exports.handler = serverless(app);
