import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { io } from "socket.io-client";

const ProfileMessageCard = ({
  userObj,
  setAccountBeingMessaged,
  setAccountClicked,
  room_id,
  setRoomId,
  message,
}) => {
  return (
    <div
      className="messagesProfileCard"
      onClick={() => {
        setAccountBeingMessaged(userObj);
        setAccountClicked(true);
        setRoomId(room_id);
        console.log(userObj);
      }}
    >
      {userObj.profile_picture ? (
        <img src={userObj.profile_picture} />
      ) : (
        <PersonIcon sx={{ fontSize: 70 }} />
      )}

      <div>
        <div>
          {userObj.first_name} {userObj.last_name} @{userObj.username}
        </div>
        <div>{message && message.message}</div>
      </div>
    </div>
  );
};

export default ProfileMessageCard;
