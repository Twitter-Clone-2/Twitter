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
  updateAccountInformation,
} = require("./accountController");

const {
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

const {
  findConversations,
  createRoom,
  createMessage,
  findMessagesForTheRoom,
} = require("./messagesController");

app.options("*", cors());

//get all users
app.get("/api/users", cors(), getAllUsers);
// get one user
//id
app.post("/api/user", cors(), getOneUser);
//email
app.post("/api/user/email", cors(), getOneUserByEmail);
app.put("/api/update/account", cors(), updateAccountInformation);
//login
app.post("/api/login", cors(), login);
//register
app.post("/api/register", cors(), register);
//tweet
app.post("/api/create/tweet", cors(), createTweet);
app.post("/api/findAllTweetsFromOneUser", cors(), findAllTweetsFromOneUser);
app.get(
  "/api/findAllTweetsFromFollowing/:id",
  cors(),
  findAllTweetsFromFollowing
);
app.post("/api/currUser/tweets", cors(), findCurrUserAndTweets);
app.post("/api/view/tweet", cors(), getOneTweetAndAllData);
app.delete(
  "/api/delete/tweet/:tweet_id",
  cors(),
  deleteTweetAndEverythingRelated
);
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
app.post(
  "/api/selectAllFollowersAndTheirAccounts",
  cors(),
  selectAllFollowersAndTheirAccounts
);
app.post(
  "/api/selectAllFollowingAndTheirAccounts",
  cors(),
  selectAllFollowingAndTheirAccounts
);

//messages
app.get("/api/findConversations/:id", cors(), findConversations);
app.post("/api/create/room", cors(), createRoom);
app.post("/api/create/message", cors(), createMessage);
app.get("/api/find/messages/:room_number", cors(), findMessagesForTheRoom);
//delete an account
app.delete("/api/delete/account", cors(), deleteUser);

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Example app listening on port ${process.env.PORT || 8080}`);
});

const io = require("socket.io")(server, { cors: true });

io.on("connection", (socket) => {
  console.log("server side connection");

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log("joined room " + room);
  });

  socket.on("send_message", ({ roomId, message }) => {
    console.log("Sending message : " + message + " in room " + roomId);
    socket.to(roomId).emit("receive-message", message);
  });
});
