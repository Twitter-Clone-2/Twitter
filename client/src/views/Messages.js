import React, { useState, useEffect } from "react";
import "../CSS/Messages.css";
import route from "../utils/server_router";
import ProfileMessageCard from "../components/Messages/ProfileMessageCard";
import axios from "axios";
import PlaceHolderMessages from "../components/Messages/PlaceHolderMessages";
import Conversation from "../components/Messages/Conversation";

const Messages = () => {
  const user = JSON.parse(localStorage.getItem("currUser"));
  const [followingInfo, setFollowingInfo] = useState([]);
  const [accountClicked, setAccountClicked] = useState(false);
  const [accountBeingMessaged, setAccountBeingMessaged] = useState({});
  const [conversations, setConversations] = useState([]);
  const [roomId, setRoomId] = useState(0);
  const [lastMessages, setLastMessages] = useState({});

  const grabAllInfoForMessages = function () {
    let room_numbers;
    axios
      .get(route + "/api/selectAllFollowingAndTheirAccounts/" + user.id)
      .then((res) => {
        setFollowingInfo(res.data.rows);
      })
      .catch((e) => {
        console.error(e);
      });

    axios
      .get(route + "/api/findConversations/" + user.id)
      .then((res) => {
        console.log(res.data);
        setConversations(res.data);
        room_numbers = res.data.map((room) => room.room_id);
        axios
          .get(route + "/api/last/message/" + room_numbers)
          .then((res) => {
            setLastMessages(res.data);
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => {
        console.error(e);
      });
  };
  useEffect(() => {
    grabAllInfoForMessages();
  }, []);

  return (
    <div className="messageMainDiv flex">
      <div className="messagesProfileSection">
        <div className="messagesHeader">Messages</div>
        <div className="divForSearchBar">
          <input
            placeholder="Search Direct Messages"
            className="messagesSearchBar"
          />
        </div>
        {conversations.map((userObj, i) => (
          <ProfileMessageCard
            key={i}
            userObj={userObj}
            setAccountBeingMessaged={setAccountBeingMessaged}
            setAccountClicked={setAccountClicked}
            room_id={userObj.room_id}
            setRoomId={setRoomId}
            message={lastMessages[userObj.room_id]}
          />
        ))}
      </div>

      {!accountClicked && (
        <PlaceHolderMessages
          followingInfo={followingInfo}
          setAccountClicked={setAccountClicked}
          setAccountBeingMessaged={setAccountBeingMessaged}
          user_id={user.id}
          conversations={conversations}
          setRoomId={setRoomId}
        />
      )}

      {accountClicked && (
        <Conversation
          accountBeingMessaged={accountBeingMessaged}
          roomId={roomId}
          user={user}
        />
      )}
    </div>
  );
};

export default Messages;
