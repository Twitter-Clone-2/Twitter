import React from 'react'
import PersonIcon from "@mui/icons-material/Person";

const ProfileMessageCard = () => {
  return (
    <div className='messagesProfileCard'>
        <PersonIcon sx={{ fontSize: 55 }}/>

        <div>
            <div>Reza Amraei @RezaAmraei</div>
            <div>Hey how is your day going</div>
        </div>
    </div>
  )
}

export default ProfileMessageCard