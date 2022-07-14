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
    let currLikeCount = 0;

    console.log(tweet, likes, replies)


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
          
    <div className='marginLeft bigTweetDate'>{format(new Date(tweet.created_at), "PPpp")}</div>
       
      
    

    <div className='flex '>
        <div>{likes.length} Likes</div>
        <div>{replies.length} Replies</div>
        <div>0 Retweets</div>
    </div>

    <div className="buttonsTweet">
      <div className='flex likeCol'>
        <FavoriteBorderIcon onClick={()=> likeFunction(JSON.parse(localStorage.getItem("currUser")).id, tweet.id)} className={`${liked ? "liked" : ""}`}/>
        <div className='likeCount'> {count == 0 ? "" : count} </div> 
      </div>
     
      <div className='flex replyCol'>
        <ChatBubbleOutlineIcon/>
        <div className='replyCount'> {replyCount == 0 ? "" : replyCount} </div> 
      </div>

      <div className='flex retweetCol'>
        <CachedIcon/>
        <p className='retweetCount'> {retweetCount == 0 ? "" : retweetCount} </p>
      </div>
    </div>
  </div> 
  )
}

export default BigTweet