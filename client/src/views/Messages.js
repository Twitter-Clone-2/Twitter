import React,{useState, useEffect} from 'react'
import "../CSS/Messages.css"
import route from "../utils/server_router";
import ProfileMessageCard from '../components/ProfileMessageCard';
import axios from "axios";
import PlaceHolderMessages from '../components/PlaceHolderMessages';
import Conversation from '../components/Conversation';

const Messages = () => {
    const user = JSON.parse(localStorage.getItem("currUser"));
    const [followingInfo, setFollowingInfo] = useState([])
    const [accountClicked, setAccountClicked] = useState(false)
    const [accountBeingMessaged, setAccountBeingMessaged] = useState({})
    const [conversations, setConversations] = useState([])
    const [roomId, setRoomId] = useState(0)


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
    //dont forget to pass room id to follower modal later
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
        {conversations.map((userObj,i)=> <ProfileMessageCard 
        key={i} 
        userObj={userObj}
        setAccountBeingMessaged={setAccountBeingMessaged}
        setAccountClicked={setAccountClicked}
        room_id={userObj.room_id}
        setRoomId={setRoomId}
        />)}
      </div>

      {!accountClicked && 
      <PlaceHolderMessages 
      followingInfo={followingInfo} 
      setAccountClicked={setAccountClicked}
      setAccountBeingMessaged={setAccountBeingMessaged}
      user_id={user.id}
      />}

      {accountClicked && <Conversation 
      accountBeingMessaged={accountBeingMessaged}
      roomId={roomId}
      />}

    </div>
  )
}

export default Messages

