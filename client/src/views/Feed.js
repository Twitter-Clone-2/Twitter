import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/Feed.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tweet from "../components/Tweets/Tweet";
import route from "../utils/server_router";
import InputBase from "@mui/material/InputBase";

const Feed = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currUser"));
  const [tweet, setTweet] = useState("");
  const [feed, setFeed] = useState([]);
  const [likes, setLikes] = useState([]);
  const [replies, setReplies] = useState([]);
  const [retweets, setRetweets] = useState([]);

  const fetchAllTweetsForFeed = () => {
    axios
      .get(route + "/api/findAllTweetsFromFollowing/" + user.id)
      .then(({ data }) => {
        data.tweets.sort((x, y) => x.created_at - y.created_at);
        setFeed(data.tweets.filter((tweet) => !tweet.reply_id));
        setLikes(data.likes);
        setReplies(data.tweets.filter((tweet) => tweet.reply_id));
        setRetweets(data.retweets);
      })
      .catch((e) => console.error(e));
  };
  useEffect(() => {
    fetchAllTweetsForFeed();
  }, []);

  const takeToProfile = () => {
    navigate("/profile/page");
  };

  const createTweet = () => {
    if (tweet.length == 0) return;
    axios
      .post(route + "/api/create/tweet", {
        tweet,
        id: user.id,
      })
      .then(() => {
        setTweet("");
        fetchAllTweetsForFeed();
      })
      .catch((err) => console.error(err));
  };
  return (
    <div id="feed">
      <div id="allContent">
        <div id="feedContainer">
          <h2>Home</h2>
          <div id="feedCreateTweet">
            <PersonIcon onClick={takeToProfile} sx={{ fontSize: 100 }} />

            <InputBase
              placeholder="What's happening?"
              onChange={(e) => setTweet(e.target.value)}
              value={tweet}
              multiline={true}
              sx={{
                fontSize: "33px",
                fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
                width: "100%",
                flexGrow: "1",
              }}
            />
            <button
              onClick={createTweet}
              id="feedTweetButton"
              className={tweet.length == 0 ? "incompleteColor" : ""}
            >
              Tweet
            </button>
          </div>
        </div>

        <div id="content">
          {feed.map((tweet, i) => (
            <Tweet
              className="tweet"
              tweet={tweet}
              likes={likes.filter((like) => like.tweets_id === tweet.id)}
              retweets={retweets.filter(
                (retweet) => retweet.tweets_id === tweet.id
              )}
              key={i}
              fetchAllTweetsForFeed={fetchAllTweetsForFeed}
              replies={replies}
              feed={feed}
              id={tweet.accounts_id}
              picture={tweet.profile_picture}
              currentUserId={user.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
