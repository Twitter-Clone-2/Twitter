const express = require("express");
const cors = require("cors");

const app = express();


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
  checkFollowStatus,
  findAllRelationshipStatus,
  selectAllFollowersAndTheirAccounts,
  selectAllFollowingAndTheirAccounts,
  findAllTweetsFromFollowing,
  likeATweet,
  removeLike,
  findCurrUserAndTweets,
  createAComment,
  getOneTweetAndAllData,
  deleteTweetAndEverythingRelated,
} = require("./controllers");

app.options("*", cors());
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
app.get("/api/findAllTweetsFromFollowing/:id", cors(), findAllTweetsFromFollowing);
app.post("/api/currUser/tweets", cors(), findCurrUserAndTweets);
app.post("/api/view/tweet", cors(), getOneTweetAndAllData);
app.delete("/api/delete/tweet/:tweet_id", cors(), deleteTweetAndEverythingRelated);
//likes
app.post("/api/likeTweet", cors(), likeATweet);
app.post("/api/removeLike", cors(), removeLike);
//retweets

//reply
app.post("/api/reply", cors(), createAComment);
//follow status
app.post("/api/findFollowers", cors(), findFollowers);
app.post("/api/findFollowing", cors(), findFollowing);
app.post("/api/findAllRelationships", cors(), findAllRelationshipStatus);
app.post("/api/follow", cors(), followAnotherUser);
app.post("/api/unfollow", cors(), unFollowAnotherUser);
app.post("/api/checkFollowStatus", cors(), checkFollowStatus);
app.post("/api/selectAllFollowersAndTheirAccounts", cors(), selectAllFollowersAndTheirAccounts);
app.post("/api/selectAllFollowingAndTheirAccounts", cors(), selectAllFollowingAndTheirAccounts);
//delete an account
app.delete("/api/delete/account", cors(), deleteUser);

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Example app listening on port ${process.env.PORT || 8080}`);
});


const io = require('socket.io')(server, {cors : true});

io.on("connection", socket =>{
  console.log(`-----------------${socket.id}----------------`);
  socket.on("send_message", (message, room) =>{
    socket.to(room).emit("receive-message", message)
  });

  socket.on("join_room", room =>{
    socket.join(room)
  })
});