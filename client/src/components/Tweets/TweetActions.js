import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CachedIcon from "@mui/icons-material/Cached";
import axios from "axios";
import route from "../../utils/server_router";
import { useParams } from "react-router-dom";
import ReplyModal from "./ReplyModal";
import { BarChartOutlined, UploadOutlined } from "@ant-design/icons";

export default function TweetActions({
  tweet,
  likes,
  bigTweetView = false,
  replies,
  feed,
  currentUserId,
  retweets,
  fetchAllTweetsForFeed,
  id = null,
}) {
  function determineTrueOrFalse(likesOrRetweets) {
    return likesOrRetweets.some(
      (likeOrRetweet) =>
        (likeOrRetweet.tweets_id == tweet.id ||
          likeOrRetweet.tweets_id == tweet.tweets_id) &&
        likeOrRetweet.accounts_id === currentUserId
    );
  }
  const [count, setCount] = useState(likes.length);
  const [liked, setLiked] = useState(determineTrueOrFalse(likes));
  const [retweeted, setRetweeted] = useState(determineTrueOrFalse(retweets));
  const [retweetCount, setRetweetCount] = useState(retweets.length || 0);
  const [replyCount, setReplyCount] = useState(replies.length || 0);

  useEffect(() => {
    setCount(likes.length);
    setLiked(determineTrueOrFalse(likes));
    setRetweeted(determineTrueOrFalse(retweets));
    setRetweetCount(retweets.length || 0);
    setReplyCount(replies.length || 0);

    if (bigTweetView) {
      setCount(likes.length);
      setReplyCount(replies.length);
    }
  }, [id, feed, tweet]);

  const likeOrRetweetFunction = (accounts_id, tweets_id, functionality) => {
    let status;
    if (functionality == "likes") {
      status = liked;
    } else {
      status = retweeted;
    }
    if (status === false) {
      axios
        .post(route + "/api/likeOrRetweet", {
          accounts_id,
          tweets_id,
          functionality,
        })
        .then(() => {
          if (functionality == "likes") {
            setLiked(true);
            setCount((prev) => prev + 1);
          } else {
            setRetweeted(true);
            setRetweetCount((prev) => prev + 1);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }

    if (status) {
      axios
        .post(route + "/api/removeLikeOrRetweet", {
          accounts_id,
          tweets_id,
          functionality,
        })
        .then(() => {
          if (functionality == "likes") {
            setLiked(false);
            setCount((prev) => prev - 1);
          } else {
            setRetweeted(false);
            setRetweetCount((prev) => prev - 1);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
    fetchAllTweetsForFeed();
  };

  return (
    <div className="tweet-actions-container">
      {bigTweetView && (
        <div className="flex bigTweetCount paddingLeft borderBot">
          {count > 0 && (
            <div className="underline">
              <span className="bold">{count}</span>
              <span> Likes</span>
            </div>
          )}

          {replyCount > 0 && (
            <div className="underline">
              <span className="bold">{replyCount}</span>
              <span> Replies</span>
            </div>
          )}

          {retweetCount > 0 && (
            <div className="underline">
              <span className="bold">{retweetCount}</span>
              <span> Retweets</span>
            </div>
          )}
        </div>
      )}
      <div className="buttonsTweet borderBot">
        <div className="flex likeCol">
          <FavoriteBorderIcon
            onClick={(event) => {
              event.stopPropagation();
              likeOrRetweetFunction(
                currentUserId,
                tweet.id || tweet.tweets_id,
                "likes"
              );
            }}
            className={`${liked ? "liked" : ""}`}
          />
          {!bigTweetView && count > 0 && (
            <div className={`${liked ? "liked likeCount" : "likeCount"}`}>
              {" "}
              {count}
            </div>
          )}
        </div>

        <div className="flex replyCol">
          <ReplyModal
            tweet_id={tweet.id || tweet.tweets_id}
            first_name={tweet.first_name}
            last_name={tweet.last_name}
            username={tweet.username}
            created_at={tweet.created_at}
            content={tweet.content}
          />
          {!bigTweetView && Boolean(replyCount) && (
            <div className="replyCount">
              {replyCount === 0 ? "" : replyCount}
            </div>
          )}
        </div>

        <div className="flex retweetCol">
          <CachedIcon
            onClick={(event) => {
              event.stopPropagation();
              likeOrRetweetFunction(
                currentUserId,
                tweet.id || tweet.tweets_id,
                "retweets"
              );
            }}
            className={`${retweeted ? "retweeted" : ""}`}
          />
          <p
            className={`${
              retweeted ? "retweeted retweetCount" : "retweetCount"
            }`}
          >
            {" "}
            {retweetCount === 0 ? "" : retweetCount}{" "}
          </p>
        </div>
        <div>
          <BarChartOutlined className="tweet-actions-icon" />
        </div>
        <div>
          <UploadOutlined className="tweet-actions-icon" />
        </div>
      </div>
    </div>
  );
}
