import React from "react";
import { format } from "date-fns";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import "./tweets.css";
import TweetActions from "./TweetActions";

export default function Tweet({ tweet, likes }) {
  const navigate = useNavigate();

  const loadTweet = (id) => {
    navigate(`/tweet/${id}`);
  };

  const takeToProfile = (id) => {
    navigate("/profile/page/" + id);
  };
  const filteredLikes = likes.filter((like) => like.tweets_id == tweet.id)

  return (
    <div className="tweet" onClick={() => loadTweet(tweet.id)}>
      <div className="flex">
        <div>
          <PersonIcon onClick={() => takeToProfile(tweet.accounts_id)} />
        </div>
        <div className="rightTweet">
          <div className="rightTweetHeader">
            <p onClick={() => takeToProfile(tweet.accounts_id)}>
              {tweet.first_name} {tweet.last_name}
            </p>
            <p onClick={() => takeToProfile(tweet.accounts_id)}>
              @{tweet.username}
            </p>
            <p>{format(new Date(tweet.created_at), "PPpp")}</p>
          </div>
          <h3>{tweet.content}</h3>
        </div>
      </div>
      <TweetActions tweet={tweet} likes={filteredLikes}/>
    </div>
  );
}
