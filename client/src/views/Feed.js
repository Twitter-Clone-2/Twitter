import React, { useState, useEffect, useReducer } from "react";
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/HomePage.css";
import { useNavigate } from "react-router-dom";
import IconNav from "../components/IconNav";
import NewsAPI from "../components/NewsAPI";
import axios from "axios";
import Post from "../components/Post";

const Feed = (props) => {
  const navigate = useNavigate();
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const id = localStorage.getItem("id");
  const [tweet, setTweet] = useState("");
  let allFollowingTweets = [];
  const [render, setRender] = useState();
  //CREATING A TWEET

  const createTweet = () => {
    console.log("hello world");
  };

  const takeToProfile = () => {
    navigate("/profile/page");
  };
  return (
    <div id="mainBodyHomePage">
      {/* LEFT SIDE */}
      <IconNav
        setPostForm={props.setPostForm}
        postForm={props.PostForm}
        renderPost={props.renderPost}
      />

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
      {/* RIGHT SIDE */}
      <NewsAPI />
    </div>
  );
};

export default Feed;
