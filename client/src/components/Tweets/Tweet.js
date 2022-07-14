import React,{useEffect, useState} from 'react'
import { format } from "date-fns";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CachedIcon from '@mui/icons-material/Cached';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./tweets.css"
const route = require("../../utils/server_router");

export default function Tweet({ tweet , likes }) {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [replyCount, setReplyCount] = useState(0);
  const [retweetCount, setRetweetCount] = useState(0);
  const navigate = useNavigate();
  let currLikeCount = 0;
  const currentUserId =  JSON.parse(localStorage.getItem("currUser")).id;

  useEffect(()=>{
    for(let i = 0; i < likes.length; i++){
      if(likes[i].accounts_id == currentUserId && likes[i].tweets_id == tweet.id){
        setLiked(true);
      }
      if(likes[i].tweets_id == tweet.id) currLikeCount++
    }
    setCount(currLikeCount)   
  }, [likes])

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
    <div className="tweet" onClick={() => loadTweet( tweet.id)}>
      <div className="flex">
        <div>
          <PersonIcon onClick={()=> takeToProfile(tweet.accounts_id)} />
        </div>
        <div className="rightTweet">
          <div className="rightTweetHeader">
            <p  onClick={()=> takeToProfile(tweet.accounts_id)}>
              {tweet.first_name} {tweet.last_name}
            </p>
            <p  onClick={()=> takeToProfile(tweet.accounts_id)}>@{tweet.username}</p>
            <p>{format(new Date(tweet.created_at), "PPpp")}</p>
          </div>
          <h3>{tweet.content}</h3>
        </div>
      </div>

      <div className="buttonsTweet">
        <div className='flex likeCol'>
          <FavoriteBorderIcon onClick={()=> likeFunction(currentUserId, tweet.id)} className={`${liked ? "liked" : ""}`}/>
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
  );
}
