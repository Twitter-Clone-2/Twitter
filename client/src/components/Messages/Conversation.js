import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import "../../CSS/Conversation.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { format, set } from "date-fns";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import GifBoxIcon from "@mui/icons-material/GifBox";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";
import route from "../../utils/server_router";
import axios from "axios";

// const socket = io(route);

const Conversation = ({ accountBeingMessaged, roomId, user }) => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  // useEffect(() => {
  //   socket.on("connect", () => {});
  //   socket.on("receive-message", (data) => {
  //     let newMessage = { received: data };
  //     setAllMessages((prev) => [...prev, newMessage]);
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.emit("join_room", roomId);
  //   setAllMessages([]);

  //   axios
  //     .get(route + "/api/find/messages/" + roomId)
  //     .then((res) => {
  //       let oldMessages = res.data.map((message) => {
  //         if (message.user_sent_message == user.id) {
  //           return { sent: message.message };
  //         } else {
  //           return { received: message.message };
  //         }
  //       });
  //       setAllMessages(oldMessages);
  //     })
  //     .catch((e) => console.error(e));
  // }, [roomId]);

  // const sendMesssage = () => {
  //   socket.emit("send_message", {
  //     message,
  //     roomId,
  //   });

  //   axios
  //     .post(route + "/api/create/message", {
  //       user_id: user.id,
  //       message,
  //       room_number: roomId,
  //     })
  //     .then(() => {
  //       let newMessage = { sent: message };
  //       setAllMessages((prev) => [...prev, newMessage]);
  //       setMessage("");
  //     });
  // };

  return (
    <div className="conversationBody">
      <div className="convoHeader">
        {accountBeingMessaged.profile_picture ? (
          <img
            src={accountBeingMessaged.profile_picture}
            className="convoProfilePicture"
          />
        ) : (
          <PersonIcon sx={{ fontSize: 45 }} />
        )}
        <div className="convoHeaderNames">
          <span id="convoHeaderRealNames">
            {accountBeingMessaged.first_name} {accountBeingMessaged.last_name}
          </span>
          <span id="convoHeaderUsernames">
            @{accountBeingMessaged.username}
          </span>
        </div>
      </div>
      <div className="convoBody" id="messageBody">
        <div className="convoAccountBeingMessagedDetails">
          <div>
            <span className="convoBodyAccountName">
              {accountBeingMessaged.first_name} {accountBeingMessaged.last_name}
            </span>
            <span className="convoBodyAccountUsername">
              @{accountBeingMessaged.username}
            </span>
          </div>
          <div className="conversationAccountBio">
            {accountBeingMessaged.bio}
          </div>
          <div className="conversationAccountJoinedDate">
            <CalendarMonthIcon />
            {format(new Date(accountBeingMessaged.created_at), "PPpp")}
          </div>
        </div>
        {allMessages.map((currMessage, i) => (
          <div
            className={currMessage.sent ? "convoSentDiv" : "convoReceivedDiv"}
            key={i}
          >
            {currMessage.sent && (
              <div className="convoSentMessage" key={i}>
                {currMessage.sent}
              </div>
            )}
            {currMessage.received && (
              <div key={i} className="convoReceivedMessage">
                {currMessage.received}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="convoFooter">
        <WallpaperIcon
          className="conversationIcon"
          sx={{ color: "rgb(70,168,242)" }}
        />
        <GifBoxIcon
          className="conversationIcon"
          sx={{ color: "rgb(70,168,242)" }}
        />
        <input
          id="convoFooterInput"
          placeholder="Start a new message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <SendIcon
          sx={{ color: "rgb(70,168,242)" }}
          // onClick={sendMesssage}
          className="conversationIcon"
        />
      </div>
    </div>
  );
};

export default Conversation;
