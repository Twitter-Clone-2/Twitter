import React from "react";
import { format } from "date-fns";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import "./tweets.css";
import TweetActions from "./TweetActions";
import DeleteTweet from "./DeleteTweet";

export default function Tweet({ tweet, likes, replyingTo = false }) {
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("currUser")).id;

  const loadTweet = (id) => {
    navigate(`/tweet/${id}`);
  };

  const takeToProfile = (id) => {
    navigate("/profile/page/" + id);
  };
  const filteredLikes = likes.filter((like) => like.tweets_id == tweet.id)

  return (
    <div className="tweet" onClick={(e) =>{
      if(e.currentTarget != e.target ) return;
      loadTweet(tweet.id)
    }}>
      <div className="tweetTopHalf">
        <div className="flex">
          <div className="paddingLeft">
            <PersonIcon sx={{ fontSize: 60 }} onClick={() => takeToProfile(tweet.accounts_id)} />
          </div>
          <div className="rightTweet">
            <div className="rightTweetHeader">
              <p className="tweetNames" onClick={() => takeToProfile(tweet.accounts_id)}>
                {tweet.first_name} {tweet.last_name}
              </p>
              <p className="tweetNames" onClick={() => takeToProfile(tweet.accounts_id)}>
                @{tweet.username}
              </p>
              <p>{format(new Date(tweet.created_at), "PPpp")}</p>
            </div>
              {replyingTo && <p>Replying to <span className="replyingToUsername">@{tweet.username}</span></p>}
            <h3>{tweet.content}</h3>
          </div>
      </div>
      {tweet.accounts_id === id && <DeleteTweet tweet_id={tweet.id} />}
      </div>
      <TweetActions tweet={tweet} likes={filteredLikes}/>
    </div>
  );
}
