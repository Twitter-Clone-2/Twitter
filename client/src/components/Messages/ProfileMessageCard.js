import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import "../../CSS/Messages.css";

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
      }}
    >
      {userObj.profile_picture ? (
        <img
          src={userObj.profile_picture}
          className="profileMessageCardProfilePicture"
        />
      ) : (
        <PersonIcon sx={{ fontSize: 70 }} />
      )}

      <div>
        <div>
          <span className="profileMessageCardNames">
            {userObj.first_name} {userObj.last_name}
          </span>
          <span className="profileMessageCardUsername">
            {" "}
            @{userObj.username}
          </span>
        </div>
        <div>{message && message.message}</div>
      </div>
    </div>
  );
};

export default ProfileMessageCard;
