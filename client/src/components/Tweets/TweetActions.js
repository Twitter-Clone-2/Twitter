import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CachedIcon from "@mui/icons-material/Cached";
import axios from "axios";
import route from "../../utils/server_router";

export default function TweetActions({
  tweet,
  likes,
  displayIconCount = false,
}) {
  const currentUserId = JSON.parse(localStorage.getItem("currUser")).id;
  const tweetIsLiked = likes.some(
    (like) => like.accounts_id === currentUserId || like.id === currentUserId
  );
  const [count, setCount] = useState(likes.length);
  const [liked, setLiked] = useState(tweetIsLiked);
  const [replyCount, setReplyCount] = useState(0);
  const [retweetCount, setRetweetCount] = useState(0);

  const likeFunction = (accounts_id, tweets_id) => {
    if (liked === false) {
      axios
        .post(route + "/api/likeTweet", {
          accounts_id,
          tweets_id,
        })
        .then((res) => {
          setLiked(true);
          setCount((prev) => prev + 1);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    if (liked) {
      axios
        .post(route + "/api/removeLike", {
          accounts_id,
          tweets_id,
        })
        .then((res) => {
          setLiked(false);
          setCount((prev) => prev - 1);
        })
        .catch((e) => {
          console.log(e);
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
              <span>Likes</span>
            </div>
          )}

          {replyCount > 0 && (
            <div className="underline">
              <span className="bold">{replyCount}</span>
              <span>Replies</span>
            </div>
          )}

          {retweetCount > 0 && (
            <div className="underline">
              <span className="bold">{retweetCount}</span>
              <span>Retweets</span>
            </div>
          )}
        </div>
      )}
      <div className="buttonsTweet">
        <div className="flex likeCol">
          <FavoriteBorderIcon
            onClick={(event) => {
              event.stopPropagation();
              likeFunction(currentUserId, tweet.id);
              console.log("asdfsadfasdf");
            }}
            className={`${liked ? "liked" : ""}`}
          />
          {!displayIconCount && Boolean(count) && (
            <div className="likeCount"> {count}</div>
          )}
        </div>

        <div className="flex replyCol">
          <ChatBubbleOutlineIcon
            onClick={(event) => {
              event.stopPropagation();
              console.log("comment was clicked");
            }}
          />
          <div className="replyCount">
            {" "}
            {replyCount === 0 ? "" : replyCount}{" "}
          </div>
        </div>

        <div className="flex retweetCol">
          <CachedIcon
            onClick={(event) => {
              event.stopPropagation();
              console.log("retweet was clicked");
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
