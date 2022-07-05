import React, { useState, useEffect, useReducer } from "react";
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/HomePage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "../components/Post";

const Feed = (props) => {
  const navigate = useNavigate();
  const route = require("../utils/server_router");
  const id = localStorage.getItem("id");
  const [tweet, setTweet] = useState("");
  let allFollowingTweets = [];
  const [render, setRender] = useState();
  const [currUser, setCurrUser] = useState({});

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
  };

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
              onClick={() => takeToProfile()}
              sx={{ fontSize: 100 }}
            />
            <input
              style={{flexGrow: 1}}
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
          <h1>Hi</h1>
          {render &&
            render.map((tweet, i) => {
              return (
                <div className="tweet" key={i}>
                  <div className="flex">
                    <div className="leftTweet">
                      <PersonIcon onClick={() => takeToProfile()} />
                    </div>
                    <div className="rightTweet">
                      <div className="rightTweetHeader">
                        <p>
                          {tweet.firstName} {tweet.lastName}
                        </p>
                        <p>@{tweet.userName}</p>
                        <p>{tweet.tweetTime}</p>
                      </div>
                      <h3>{tweet.tweet}</h3>
                    </div>
                  </div>

                  <div className="buttonsTweet">
                    <button>Like</button>
                    <button>Retweet</button>
                    <button>Comment</button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
