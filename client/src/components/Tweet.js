import React,{useState} from 'react'
import { format } from "date-fns";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CachedIcon from '@mui/icons-material/Cached';

export default function Tweet({ tweet }) {
  const [count, setCount] = useState(0)
  const likeFunction = (accountId , tweetId) =>{
    console.log(accountId, tweetId);
    setCount(prev=> prev + 1)
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
        {/* <button >Like</button> */}
        {/* <button>Retweet</button>
        <button>Comment</button> */}
        <FavoriteBorderIcon onClick={()=> likeFunction(tweet.accounts_id, tweet.id)}/> {count}
        <ChatBubbleOutlineIcon/>
        <CachedIcon/>
      </div>
    </div>
  );
}
