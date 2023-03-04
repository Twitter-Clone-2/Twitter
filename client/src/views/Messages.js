import React, { useState, useEffect } from "react";
import "../CSS/Messages.css";
import route from "../utils/server_router";
import ProfileMessageCard from "../components/Messages/ProfileMessageCard";
import axios from "axios";
import PlaceHolderMessages from "../components/Messages/PlaceHolderMessages";
import Conversation from "../components/Messages/Conversation";

import FollowersAndFollowingModal from "../components/FollowersAndFollowingModal";

const Messages = () => {
  const user = JSON.parse(localStorage.getItem("currUser"));
  const [followingInfo, setFollowingInfo] = useState([]);
  const [accountClicked, setAccountClicked] = useState(false);
  const [accountBeingMessaged, setAccountBeingMessaged] = useState({});
  const [conversations, setConversations] = useState([]);
  const [roomId, setRoomId] = useState(0);
  const [lastMessages, setLastMessages] = useState({});
  const [searchArr, setSearchArr] = useState([]);

  useEffect(() => {
    alert(
      "For now all messages are taken down as the switch from Heroku to AWS Lambda is causing problems with the sockets"
    );
  }, []);
  const grabAllInfoForMessages = function () {
    let room_numbers;
    axios
      .get(route + "/api/selectAllFollowingAndTheirAccounts/" + user.id)
      .then((res) => {
        setFollowingInfo(res.data.rows);
      })
      .catch((e) => {
        console.error("This is thew console log", e);
      });

    axios
      .get(route + "/api/findConversations/" + user.id)
      .then((res) => {
        setConversations(res.data);
        setSearchArr(res.data);
        if (res.data.length) {
          room_numbers = res.data.map((room) => room.room_id);
          axios
            .get(route + "/api/last/message/" + room_numbers)
            .then((res) => {
              setLastMessages(res.data);
            })
            .catch((e) => console.error(e));
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    grabAllInfoForMessages();
  }, []);

  function changeConvoArray(name) {
    if (name.length > 0) {
      setSearchArr(
        conversations.filter((person) => {
          return (
            person.first_name.slice(0, name.length).toUpperCase() ==
              name.toUpperCase() ||
            person.username.slice(0, name.length).toUpperCase() ==
              name.toUpperCase() ||
            person.last_name.slice(0, name.length).toUpperCase() ==
              name.toUpperCase() ||
            `${person.first_name} ${person.last_name}`
              .slice(0, name.length)
              .toUpperCase() == name.toUpperCase()
          );
        })
      );
    } else {
      setSearchArr(conversations);
    }
  }

  return (
    <div className="messageMainDiv flex">
      <div
        className={
          accountClicked
            ? "messagesMobileHide messagesProfileSection"
            : "messagesProfileSection"
        }
      >
        <div className="messagesHeader">Messages</div>
        <div className="divForSearchBar">
          <input
            placeholder="Search Direct Messages"
            className="messagesSearchBar"
            onChange={(e) => changeConvoArray(e.target.value)}
          />
          <div
            className="messagesDesktopHide"
            id="messagesMobileCreateConvoIcon"
          >
            <FollowersAndFollowingModal
              num={`MobileMessageIcon`}
              relationship={followingInfo}
              handle={true}
              setAccountClicked={setAccountClicked}
              setAccountBeingMessaged={setAccountBeingMessaged}
              user_id={user.id}
              conversations={conversations}
              setRoomId={setRoomId}
            />
          </div>
        </div>
        {searchArr.map((userObj, i) => (
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
