import React,{useState, useEffect} from 'react'
import "../CSS/Messages.css"
import io from 'socket.io-client';
import route from "../utils/server_router";


const Messages = () => {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("")
    const socket = io.connect(route)

    useEffect(() => {
        socket.on('receive_message', data =>{
          setMessageReceived(data.message)
        });

        return () => socket.disconnect(true);
    }, [socket])
    
    const sendMesssage = () =>{
      socket.emit("send_message", {message})
    }
  return (
    <div className='messageMainDiv'>
      <input placeholder='Message...' onChange={(e) => setMessage(e.target.value)}/>
      <button onClick={sendMesssage}>Send Message</button>
      <h1>Message : {messageReceived}</h1>
    </div>
  )
}

export default Messages