import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CachedIcon from "@mui/icons-material/Cached";
import axios from "axios";
import route from "../../utils/server_router";
import { useParams } from "react-router-dom";
import ReplyModal from "./ReplyModal";

export default function TweetActions({
  tweet,
  likes,
  displayIconCount = false,
  replies,
  feed,
}) {
  const currentUserId = JSON.parse(localStorage.getItem("currUser")).id;
  const tweetIsLiked = likes.some(
    (like) =>
      (like.tweets_id == tweet.id && like.accounts_id === currentUserId) ||
      like.id === currentUserId
  );
  const [count, setCount] = useState(likes.length);
  const [liked, setLiked] = useState(tweetIsLiked);
  const [retweetCount, setRetweetCount] = useState(0);
  const [replyCount, setReplyCount] = useState(replies.length || 0);
  const { id } = useParams();

  useEffect(() => {
    setCount(likes.length);
    setLiked(tweetIsLiked);
    setReplyCount(replies.length || 0);

    if (displayIconCount) {
      setCount(likes.length);
      setReplyCount(replies.length);
    }
  }, [id, feed, tweet]);

  const likeFunction = (accounts_id, tweets_id) => {
    if (liked === false) {
      axios
        .post(route + "/api/likeTweet", {
          accounts_id,
          tweets_id,
        })
        .then(() => {
          setLiked(true);
          setCount((prev) => prev + 1);
        })
        .catch((e) => {
          console.error(e);
        });
    }

    if (liked) {
      axios
        .post(route + "/api/removeLike", {
          accounts_id,
          tweets_id,
        })
        .then(() => {
          setLiked(false);
          setCount((prev) => prev - 1);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  return (
    <div>
      {displayIconCount && (
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
              likeFunction(currentUserId, tweet.id);
            }}
            className={`${liked ? "liked" : ""}`}
          />
          {!displayIconCount && Boolean(count) && (
            <div className="likeCount"> {count}</div>
          )}
        </div>

        <div className="flex replyCol">
          <ReplyModal
            tweet_id={tweet.id}
            first_name={tweet.first_name}
            last_name={tweet.last_name}
            username={tweet.username}
            created_at={tweet.created_at}
            content={tweet.content}
          />
          {!displayIconCount && Boolean(replyCount) && (
            <div className="replyCount">
              {replyCount === 0 ? "" : replyCount}
            </div>
          )}
        </div>

        <div className="flex retweetCol">
          <CachedIcon
            onClick={(event) => {
              event.stopPropagation();
            }}
          />
          <p className="retweetCount">
            {" "}
            {retweetCount === 0 ? "" : retweetCount}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
