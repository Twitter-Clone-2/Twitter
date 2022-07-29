import React from 'react'
import PersonIcon from "@mui/icons-material/Person";
import io from 'socket.io-client';
import route from "../utils/server_router";

const ProfileMessageCard = ({
  userObj,
  setAccountBeingMessaged,
  setAccountClicked,
  room_id,
  setRoomId,
}) => {
  const socket = io.connect(route);

  return (
    <div 
    className='messagesProfileCard'
    onClick={()=> {
      setAccountBeingMessaged(userObj)
      setAccountClicked(true)
      setRoomId(room_id)
      socket.emit("join_room", room_id)
    }}
    >
        <PersonIcon sx={{ fontSize: 70 }}/>

        <div>
            <div>{userObj.first_name} {userObj.last_name} @{userObj.username}</div>
            <div>Hey how is your day going</div>
        </div>
    </div>
  )
}

export default ProfileMessageCard