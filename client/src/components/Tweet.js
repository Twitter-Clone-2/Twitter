import React from 'react'
import { format } from "date-fns";
import PersonIcon from "@mui/icons-material/Person";

export default function Tweet({ tweet }) {
  console.log(tweet)
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
        <button onClick={()=> likeFunction(tweet.accounts_id, tweet)}>Like</button>
        <button>Retweet</button>
        <button>Comment</button>
      </div>
    </div>
  );
}
