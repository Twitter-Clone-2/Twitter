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
        let tempFeed = [
          ...data.tweets.filter((tweet) => !tweet.reply_id),
          ...data.retweets,
        ];
        setFeed(tempFeed);

        tempFeed
          .sort((x, y) => {
            if (x.retweet_created_at && y.retweet_created_at) {
              return (
                new Date(x.retweet_created_at) - new Date(y.retweet_created_at)
              );
            } else if (x.retweet_created_at) {
              return new Date(x.retweet_created_at) - new Date(y.created_at);
            } else if (y.retweet_created_at) {
              return new Date(x.created_at) - new Date(y.retweet_created_at);
            } else {
              return new Date(x.created_at) - new Date(y.created_at);
            }
          })
          .reverse();
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
            {user.profile_picture ? (
              <img src={user.profile_picture} className="feedProfilePicture" />
            ) : (
              <PersonIcon onClick={takeToProfile} sx={{ fontSize: 100 }} />
            )}

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
              likes={likes.filter(
                (like) =>
                  like.tweets_id === tweet.id ||
                  like.tweets_id === tweet.tweets_id
              )}
              retweets={retweets.filter(
                (retweet) =>
                  retweet.tweets_id === tweet.id ||
                  retweet.tweets_id == tweet.tweets_id
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
