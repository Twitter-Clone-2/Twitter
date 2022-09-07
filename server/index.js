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
  getOneUserByUsername,
} = require("./accountController");

const {
  deleteTweetAndEverythingRelated,
  findAllTweetsFromOneUser,
  createTweet,
  createAComment,
  removeLike,
  likeATweet,
  getOneTweetAndAllData,
  findCurrUserAndTweets,
  findAllTweetsFromFollowing,
} = require("./tweetController");

const {
  unFollowAnotherUser,
  followAnotherUser,
  findFollowers,
  findFollowing,
  checkFollowStatus,
  findAllRelationshipStatus,
  selectAllFollowersAndTheirAccounts,
  selectAllFollowingAndTheirAccounts,
} = require("./relationshipsController");

const {
  findConversations,
  createRoom,
  createMessage,
  findMessagesForTheRoom,
} = require("./messagesController");

app.options("*", cors());
//                        ACCOUNT ROUTES
app.get("/api/users", cors(), getAllUsers);
app.post("/api/user", cors(), getOneUser);
app.post("/api/user/email", cors(), getOneUserByEmail);
app.get("/api/user/:username", cors(), getOneUserByUsername);
app.put("/api/update/account", cors(), updateAccountInformation);
app.post("/api/login", cors(), login);
app.post("/api/register", cors(), register);
app.delete("/api/delete/account", cors(), deleteUser);

//                      TWEET ROUTES
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
app.post("/api/likeTweet", cors(), likeATweet);
app.post("/api/removeLike", cors(), removeLike);
app.post("/api/reply", cors(), createAComment);

//                      RELATIONSHIP ROUTES
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

//                      MESSAGES ROUTES
app.get("/api/findConversations/:id", cors(), findConversations);
app.post("/api/create/room", cors(), createRoom);
app.post("/api/create/message", cors(), createMessage);
app.get("/api/find/messages/:room_number", cors(), findMessagesForTheRoom);

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Example app listening on port ${process.env.PORT || 8080}`);
});

//                      SOCKET.IO
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
