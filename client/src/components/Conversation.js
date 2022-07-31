import React,{useState,useEffect} from 'react'
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/Conversation.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { format, set } from "date-fns";
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import GifBoxIcon from '@mui/icons-material/GifBox';
import SendIcon from '@mui/icons-material/Send';
import {io} from 'socket.io-client';
import route from "../utils/server_router";
import axios from "axios";

const socket = io(route);

const Conversation = ({
    accountBeingMessaged,
    roomId,
}) => {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const [allMessages, setAllMessages] = useState([])

    useEffect(() => {
        socket.on("connect", () => {
        });
        console.log("testing connection")
    }, [])
    
    useEffect(() => {
        socket.emit("join_room", roomId) 
    }, [roomId])

    socket.on('receive-message', (data) =>{
        console.log(data);
        setAllMessages(prev => [...prev, data ])
    });   
    
    const sendMesssage = () =>{
        socket.emit("send_message", {
          message,
          roomId,
        })
        setAllMessages(prev => [...prev, message ])
        setMessage("")
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
                {allMessages.map((currMessage,i)=>
                <div key={i}>{currMessage}</div>
                )}
            </div>
        </div>
        <div className='convoFooter'> 
            <WallpaperIcon className="conversationIcon" sx={{color:"rgb(70,168,242)"}}/>
            <GifBoxIcon className="conversationIcon" sx={{color:"rgb(70,168,242)"}}/>
            <input 
            id='convoFooterInput'
            placeholder='Start a new message'
            onChange={(e)=>setMessage(e.target.value)}
            value={message}
            />
            <SendIcon 
            sx={{color:"rgb(70,168,242)"}}
            onClick={sendMesssage}
            className="conversationIcon"
            />
        </div>
    </div>
  )
}

export default Conversation