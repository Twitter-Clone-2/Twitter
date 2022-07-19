import React,{useState, useEffect} from 'react'
import "../CSS/Messages.css"
import io from 'socket.io-client';
import route from "../utils/server_router";


const Messages = () => {
    // const [socket] = useState(() => io(":process.env.PORT" || ':8080'));

    const socket = io.connect(route)

    // useEffect(() => {
    //     console.log("test");
    //     console.log(process.env.PORT);
    //     socket.on('Welcome', data => console.log(data));

    //     return () => socket.disconnect(true);
    // }, [])
    
    const sendMesssage = () =>{
      socket.emit("send_message", {message : "Hello"})
    }
  return (
    <div className='messageMainDiv'>
      <input placeholder='Message...'/>
      <button onClick={sendMesssage}>Send Message</button>
    </div>
  )
}

export default Messages