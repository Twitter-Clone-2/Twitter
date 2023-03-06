import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/Feed.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tweet from "../components/Tweets/Tweet";
import route from "../utils/server_router";
import InputBase from "@mui/material/InputBase";
import { useSelector } from "react-redux";
import { selectUpdateFeedCounter } from "../redux/selectors";

const Feed = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currUser"));
  const [newTweet, setNewTweet] = useState("");
  const [likes, setLikes] = useState([]);
  const [replies, setReplies] = useState([]);
  const [retweets, setRetweets] = useState([]);

  const [feed, setFeed] = useState([]);
  const updateFeedCounter = useSelector(selectUpdateFeedCounter);
  const fetchAllTweetsForFeed = () => {
    axios
      .get(route + "/api/findAllTweetsFromFollowing/" + user.id)
      .then(({ data }) => {
        let tempFeed = [
          ...data.tweets.filter((tweet) => !tweet.reply_id),
          ...data.retweetsOnFeed,
        ];
        const guestAccountID = 845413666895134722;
        if (user.id == guestAccountID) {
          const twitterAccountID = 833704888225202177;
          var twitterTweetsToPutOnTop = [];
          tempFeed = tempFeed.filter((tweet) => {
            if (tweet.accounts_id != twitterAccountID) {
              return tweet;
            } else {
              twitterTweetsToPutOnTop.push(tweet);
            }
          });
        }

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
        if (user.id == guestAccountID) {
          tempFeed.unshift(...twitterTweetsToPutOnTop);
        }
        setFeed(tempFeed);
        setLikes(data.likes);
        setReplies(data.replies);
        setRetweets(data.retweets);
      })
      .catch((e) => console.error(e));
  };
  useEffect(() => {
    fetchAllTweetsForFeed();
  }, [updateFeedCounter]);

  const takeToProfile = () => {
    navigate("/profile/page");
  };

  const createTweet = () => {
    if (newTweet.length == 0) return;
    if (newTweet.length > 240) return;
    axios
      .post(route + "/api/create/tweet", {
        tweet: newTweet,
        id: user.id,
      })
      .then(() => {
        setNewTweet("");
        fetchAllTweetsForFeed();
      })
      .catch((err) => console.error(err));
  };
  return (
    <div id="feed">
      <div id="allContent">
        <div id="feedContainer">
          <h2 className="mobileRemove">Home</h2>
          <div id="feedCreateTweet" className="mobileRemove">
            {user.profile_picture ? (
              <img src={user.profile_picture} className="feedProfilePicture" />
            ) : (
              <PersonIcon onClick={takeToProfile} sx={{ fontSize: 100 }} />
            )}

            <InputBase
              placeholder="What's happening?"
              onChange={(e) => setNewTweet(e.target.value)}
              value={newTweet}
              multiline={true}
              helperText={`5/$100`}
              sx={{
                fontSize: "24px",
                fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
                width: "100%",
                flexGrow: "1",
              }}
            />
            <button
              onClick={createTweet}
              id="feedTweetButton"
              className={newTweet.length == 0 ? "incompleteColor" : ""}
            >
              Tweet
            </button>
          </div>
        </div>

        <div id="content">
          {feed.length > 0 &&
            feed.map((tweet, i) => (
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
