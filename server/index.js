const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

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
  createTweet,
  createAComment,
  removeLikeOrRetweet,
  likeOrRetweet,
  getOneTweetAndAllData,
  findCurrUserAndTweets,
  findAllTweetsFromFollowing,
} = require("./tweetController");

const {
  unFollowAnotherUser,
  followAnotherUser,
  selectAllFollowersAndTheirAccounts,
  selectAllFollowingAndTheirAccounts,
} = require("./relationshipsController");

const {
  findConversations,
  createRoom,
  createMessage,
  findMessagesForTheRoom,
  findLastMessage,
} = require("./messagesController");

app.options("*", cors());
//                        ACCOUNT ROUTES
app.get("/api/users", cors(), getAllUsers);
app.get("/api/user/details/:id", cors(), getOneUser);
app.get("/api/user/email/:email", cors(), getOneUserByEmail);
app.get("/api/user/:username", cors(), getOneUserByUsername);
app.put("/api/update/account", cors(), updateAccountInformation);
app.post("/api/login", cors(), login);
app.post("/api/register", cors(), register);
app.delete("/api/delete/account", cors(), deleteUser);

//                      TWEET ROUTES
app.post("/api/create/tweet", cors(), createTweet);
app.get(
  "/api/findAllTweetsFromFollowing/:id",
  cors(),
  findAllTweetsFromFollowing
);
app.get("/api/currUser/tweets/:id", cors(), findCurrUserAndTweets);
app.get("/api/view/tweet/:id", cors(), getOneTweetAndAllData);
app.delete(
  "/api/delete/tweet/:tweet_id",
  cors(),
  deleteTweetAndEverythingRelated
);
app.post("/api/likeOrRetweet", cors(), likeOrRetweet);
app.post("/api/removeLikeOrRetweet", cors(), removeLikeOrRetweet);
app.post("/api/reply", cors(), createAComment);

//                      RELATIONSHIP ROUTES
app.post("/api/follow", cors(), followAnotherUser);
app.post("/api/unfollow", cors(), unFollowAnotherUser);
app.get(
  "/api/selectAllFollowersAndTheirAccounts/:following",
  cors(),
  selectAllFollowersAndTheirAccounts
);
app.get(
  "/api/selectAllFollowingAndTheirAccounts/:follower",
  cors(),
  selectAllFollowingAndTheirAccounts
);

//                      MESSAGES ROUTES
app.get("/api/findConversations/:id", cors(), findConversations);
app.post("/api/create/room", cors(), createRoom);
app.post("/api/create/message", cors(), createMessage);
app.get("/api/find/messages/:room_number", cors(), findMessagesForTheRoom);
app.get("/api/last/message/:room_numbers", cors(), findLastMessage);

app.get("/test", (req, res) => {
  res.send("Hello World");
});
app.get("/var", (req, res) => {
  res.send(process.env.DATABASE_URL);
});

if (process.env.DEVELOPMENT) {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Example app listening on port ${process.env.PORT || 8080}`);
  });
}
// SOCKET.IO;
// const io = require("socket.io")(server, { cors: true });

// io.on("connection", (socket) => {
//   console.log("server side connection");

//   socket.on("join_room", (room) => {
//     socket.join(room);
//     console.log("joined room " + room);
//   });

//   socket.on("send_message", ({ roomId, message }) => {
//     console.log("Sending message : " + message + " in room " + roomId);
//     socket.to(roomId).emit("receive-message", message);
//   });
// });

module.exports.handler = serverless(app);
