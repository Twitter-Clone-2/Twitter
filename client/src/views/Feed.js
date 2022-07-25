import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/Feed.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tweet from "../components/Tweets/Tweet";
import route from "../utils/server_router";

const Feed = (props) => {
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("currUser")).id;
  const [tweet, setTweet] = useState("");
  const [feed, setFeed] = useState([]);
  const [likes, setLikes] = useState([]);

  const fetchAllTweetsForFeed = () =>{
    axios
      .get(route + "/api/findAllTweetsFromFollowing/" + id)
      .then(({ data }) => {
        data.tweets.sort((x, y) => x.created_at - y.created_at)
        data.tweets.reverse();
        setFeed(data.tweets.filter((tweet) => !tweet.reply_id));
        setLikes(data.likes);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    fetchAllTweetsForFeed();
  }, []);

  const takeToProfile = () => {
    navigate("/profile/page");
  };

  const createTweet = () => {
    if(tweet.length == 0) return
    axios
      .post(route + "/api/create/tweet", {
        tweet,
        id,
      })
      .then(() =>{
        setTweet("");
        fetchAllTweetsForFeed();
      })
      .catch((err) => console.log(err));
      
  };
  return (
    <div id="feed">
      <div id="allContent">
        <div id="feedContainer">
          <h2>Home</h2>
          <div id="feedCreateTweet">
            <PersonIcon
              onClick={takeToProfile}
              sx={{ fontSize: 100 }}
            />
            <input
              style={{ flexGrow: 1 }}
              placeholder="What's happening?"
              onChange={(e) => setTweet(e.target.value)}
              value={tweet}
            />
            <button onClick={createTweet} id="feedTweetButton" className={tweet.length == 0 ? "incompleteColor" : ""}>Tweet</button>
          </div>
        </div>
        <div id="content">
          {feed.map((tweet, i) =>
          <Tweet
          className="tweet"
          tweet={tweet}
          likes={likes.filter((like) => like.tweets_id === tweet.id)}
          key={i}
          fetchAllTweetsForFeed={fetchAllTweetsForFeed}
          />)}
        </div>
      </div>
    </div>
  );
};

export default Feed;
