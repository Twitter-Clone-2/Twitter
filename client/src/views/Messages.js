import React,{useState, useEffect} from 'react'
import "../CSS/Messages.css"
import io from 'socket.io-client';
import route from "../utils/server_router";
import ProfileMessageCard from '../components/ProfileMessageCard';
import axios from "axios";
import PlaceHolderMessages from '../components/PlaceHolderMessages';
import Conversation from '../components/Conversation';

const Messages = () => {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
   // const socket = io.connect(route);
    const user = JSON.parse(localStorage.getItem("currUser"));
    const [followingInfo, setFollowingInfo] = useState([])
    const [accountClicked, setAccountClicked] = useState(false)
    const [accountBeingMessaged, setAccountBeingMessaged] = useState({})
    const [conversations, setConversations] = useState([])

    // useEffect(() => {
    //     socket.on('receive_message', data =>{
    //       setMessageReceived(data.message)
    //     });
    //     return () => socket.disconnect(true);
    // }, [])
    
    // const sendMesssage = () =>{
    //   socket.emit("send_message", {message})
    // }

    const grabAllInfoForMessages = function(){
      axios.post(route + "/api/selectAllFollowingAndTheirAccounts",{
        follower : user.id
      }).then(res=>{
        setFollowingInfo(res.data.rows)
      }).catch(e=>{
        console.error(e);
      })

      axios
        .get(route + "/api/findConversations/" + user.id)
        .then((res) =>{
          console.log(res.data);
          setConversations(res.data)
        })
        .catch(e=>{
          console.error(e)
        })
    }
    useEffect(() => {
      grabAllInfoForMessages();
    }, [])
    
  return (
    <div className='messageMainDiv flex'>
      
      <div className="messagesProfileSection">
        <div className='messagesHeader'>Messages</div>
        <div className='divForSearchBar'>
          <input
           placeholder='Search Direct Messages'
           className='messagesSearchBar'
           />
        </div>
        <ProfileMessageCard/>
        <ProfileMessageCard/>
      </div>

      {!accountClicked && 
      <PlaceHolderMessages 
      followingInfo={followingInfo} 
      setAccountClicked={setAccountClicked}
      setAccountBeingMessaged={setAccountBeingMessaged}
      />}

      {accountClicked && <Conversation accountBeingMessaged={accountBeingMessaged}/>}

    </div>
  )
}

export default Messages

/*            BASIC VERSION OF SOCKET IO, WORKING
    <div className='messageMainDiv'>
      <input placeholder='Message...' onChange={(e) => setMessage(e.target.value)}/>
      <button onClick={sendMesssage}>Send Message</button>
      <h1>Message : {messageReceived}</h1>
    </div>
*/