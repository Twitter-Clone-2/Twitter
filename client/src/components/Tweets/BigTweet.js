import React,{useState, useEffect} from 'react'
import { format } from "date-fns";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CachedIcon from '@mui/icons-material/Cached';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import "./tweets.css"
const route = require("../../utils/server_router");

const BigTweet = ({tweet , likes , replies }) => {
    const [count, setCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [replyCount, setReplyCount] = useState(0);
    const [retweetCount, setRetweetCount] = useState(0);
    const navigate = useNavigate();
    const currentUserId =  JSON.parse(localStorage.getItem("currUser")).id;


    useEffect(()=>{
      setCount(likes.length)
      setReplyCount(replies.length)

      for(let i = 0; i < likes.length; i++){
        if(likes[i].id == currentUserId){
          setLiked(true);
          console.log("this line hit");
        }
      }
    },[likes])

    console.log(`tweet = ${JSON.stringify(tweet)}
     likes = ${JSON.stringify(likes)}
      replies = ${JSON.stringify(replies)}`)


    const likeFunction = (accounts_id , tweets_id) =>{  
        if(liked == false){
          axios.post(route + "/api/likeTweet", {
            accounts_id,
            tweets_id
          }).then(res =>{
            setLiked(true)
            setCount(prev=> prev + 1)
          }).catch(e=>{
            console.log(e);
          })
        }
    
        if(liked == true){
          axios.post(route + "/api/removeLike", {
            accounts_id,
            tweets_id
          }).then(res =>{
            setLiked(false);
            setCount(prev=> prev - 1)
          }).catch(e=>{
            console.log(e);
          })
        }
        
      }
      const loadTweet = (id) =>{
        navigate(`/tweet/${id}`)
      }
    
      const takeToProfile = (id) =>{
        navigate("/profile/page/" + id);
      }
  return (
    <div className="bigTweet">
    <div className='bigTweetHeader'>
      <KeyboardBackspaceIcon className='backButton marginLeft' sx={{ fontSize: 40 }}/>
      <div id='thread'>Thread</div>
    </div>
    
    <div className="bigTweetPicAndNames marginLeft">
      <div className="leftTweet">
        <PersonIcon sx={{ fontSize: 60 }} onClick={()=> takeToProfile(tweet.accounts_id)} />
      </div>
      
       <div>
          <p className='bold' onClick={()=> takeToProfile(tweet.accounts_id)}>
            {tweet.first_name} {tweet.last_name}
          </p>
          <p  onClick={()=> takeToProfile(tweet.accounts_id)}>@{tweet.username}</p>
       </div>
    </div>

    <div className='bigTweetContent'>
      {tweet.content}
    </div>
          
    <div className='marginLeft bigTweetDate borderBot underline'>{format(new Date(tweet.created_at), "PPpp")}</div>
       
      
    

    <div className='flex bigTweetCount marginLeft borderBot'>
        {count > 0 && <div className='underline' >
          <span className='bold'>{count}</span>
          <span>Likes</span>
          </div>}
        
          {replyCount > 0 && <div className='underline'>
          <span className='bold'>{replyCount}</span>
          <span>Replies</span>
          </div>}

          {retweetCount > 0 && <div className='underline'>
          <span className='bold'>{retweetCount}</span>
          <span>Retweets</span>
          </div>}
    </div>

    <div className="buttonsTweet borderBot">
      <div className='flex likeCol'>
        <FavoriteBorderIcon onClick={()=> likeFunction(JSON.parse(localStorage.getItem("currUser")).id, tweet.id)} className={`${liked ? "liked" : ""}`}/>
      </div>
     
      <div className='flex replyCol'>
        <ChatBubbleOutlineIcon/>
      </div>

      <div className='flex retweetCol'>
        <CachedIcon/>
      </div>
    </div>
  </div> 
  )
}

export default BigTweet