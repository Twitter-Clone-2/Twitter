import React,{useState, useEffect} from 'react'
import "../CSS/Messages.css"
import io from 'socket.io-client';


const Messages = () => {
    const [socket] = useState(() => io(":process.env.PORT" || ':8080'));

    useEffect(() => {
        console.log("test");
        console.log(process.env.PORT);
        socket.on('Welcome', data => console.log(data));

        return () => socket.disconnect(true);
    }, [])
    
  return (
    <div className='messageMainDiv'>Messages</div>
  )
}

export default Messages