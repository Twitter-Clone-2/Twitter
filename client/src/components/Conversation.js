import React,{useState,useEffect} from 'react'
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/Conversation.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { format } from "date-fns";
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import GifBoxIcon from '@mui/icons-material/GifBox';
import SendIcon from '@mui/icons-material/Send';

const Conversation = ({
    accountBeingMessaged
}) => {
    const [test, setTest] = useState([])
    const testingArray = () =>{
        setTest([...test, "hi"])
    }
    return (
    <div className="conversationBody">
        <div className='convoHeader'>
            <PersonIcon sx={{fontSize:45}}/>
            <div className='convoHeaderNames'>
                <span id='convoHeaderRealNames'>
                    {accountBeingMessaged.first_name} {accountBeingMessaged.last_name}
                </span>
                <span id="convoHeaderUsernames">
                    @{accountBeingMessaged.username}
                </span>
            </div>
        </div>
        <div className='convoBody'>
            <div className='convoAccountBeingMessagedDetails'>
                <div>
                    <span className='convoBodyAccountName'>
                        {accountBeingMessaged.first_name} {accountBeingMessaged.last_name} 
                    </span> 
                    <span className='convoBodyAccountUsername'>  
                        @{accountBeingMessaged.username}
                    </span>
                </div>
                <div className='conversationAccountBio'>
                    {accountBeingMessaged.bio}
                </div>
                <div className='conversationAccountJoinedDate'>
                    <CalendarMonthIcon/>
                    {format(new Date(accountBeingMessaged.created_at), "PPpp")}
                </div>
            </div>
            {test.map((item, i)=> {
                return(
                    <div key={i}>{item}</div>
                )
            })}
        </div>
        <div className='convoFooter'> 
            <WallpaperIcon className="conversationIcon" sx={{color:"rgb(70,168,242)"}}/>
            <GifBoxIcon className="conversationIcon" sx={{color:"rgb(70,168,242)"}}/>
            <input 
            id='convoFooterInput'
            placeholder='Start a new message'
            />
            <SendIcon 
            sx={{color:"rgb(70,168,242)"}}
            onClick={testingArray}
            className="conversationIcon"
            />
        </div>
    </div>
  )
}

export default Conversation