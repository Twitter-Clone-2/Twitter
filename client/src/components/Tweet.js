import React,{useEffect, useState} from 'react'
import { format } from "date-fns";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CachedIcon from '@mui/icons-material/Cached';
import axios from 'axios';
const route = require("../utils/server_router");

export default function Tweet({ tweet , likes }) {
  const [count, setCount] = useState(0)
  const [liked, setLiked] = useState(false);
  let currLikeCount = 0

  useEffect(()=>{
    for(let i = 0; i < likes.length; i++){
      if(likes[i].accounts_id == JSON.parse(localStorage.getItem("currUser")).id && likes[i].tweets_id == tweet.id){
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
  return (
    <div className="tweet">
      <div className="flex">
        <div className="leftTweet">
          <PersonIcon />
        </div>
        <div className="rightTweet">
          <div className="rightTweetHeader">
            <p>
              {tweet.first_name} {tweet.last_name}
            </p>
            <p>@{tweet.username}</p>
            <p>{format(new Date(tweet.created_at), "PPpp")}</p>
          </div>
          <h3>{tweet.content}</h3>
        </div>
      </div>

      <div className="buttonsTweet">
        <div className='flex likeCol'>
          <FavoriteBorderIcon onClick={()=> likeFunction(JSON.parse(localStorage.getItem("currUser")).id, tweet.id)} className={`${liked ? "liked" : ""}`}/>
          <p className='likeCount'> {count == 0 ? "" : count} </p> 
        </div>
        <ChatBubbleOutlineIcon/>
        <CachedIcon/>
      </div>
    </div>
  );
}
