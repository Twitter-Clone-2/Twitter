import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/HomePage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "../components/Post";
import Tweet from "../components/Tweets/Tweet";
import route from "../utils/server_router";

const Feed = (props) => {
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("currUser")).id;
  const [tweet, setTweet] = useState("");
  const [feed, setFeed] = useState([]);
  const [likes, setLikes] = useState([]);

  const createTweet = (e) => {
    e.preventDefault();
    let userId = JSON.parse(localStorage.getItem("currUser"));
    axios
      .post(route + "/api/create/tweet", {
        tweet: tweet,
        id: userId.id,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

      setTweet("");
  };

  useEffect(() => {
    axios
      .post(route + "/api/findAllTweetsFromFollowing", { id })
      .then(({ data }) => {
        data.tweets.sort((x, y) => x.created_at - y.created_at)
        data.tweets.reverse();
        setFeed(data.tweets.filter((tweet) => !tweet.reply_id));
        setLikes(data.likes);
      })
      .catch((e) => console.log(e));
  }, []);

  const takeToProfile = () => {
    navigate("/profile/page");
  };
  return (
    <div id="feed">
      {/* Middle */}
      <div id="allContent">
        <h2>Home</h2>
        <form onSubmit={createTweet}>
          <p className="flex">
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
            <button>Tweet</button>
          </p>
          {props.postForm ? <Post setPostForm={props.setPostForm} /> : ""}
        </form>
        {/* CREATE A TWEET */}
        <div id="createTweet"></div>
        {/* ALL TWEETS FROM YOU AND FOLLOWERS */}
        <div id="content">
          {feed.map((tweet, i) =>
          <Tweet
          className="tweet"
          tweet={tweet}
          likes={likes.filter((like) => like.tweets_id === tweet.id)}
          key={i}
          />)}
        </div>
      </div>
    </div>
  );
};

export default Feed;
