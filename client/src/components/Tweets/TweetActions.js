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
  currentUserId,
  retweets,
}) {
  function determineTrueOrFalse(likesOrRetweets) {
    return likesOrRetweets.some(
      (likeOrRetweet) =>
        (likeOrRetweet.tweets_id == tweet.id &&
          likeOrRetweet.accounts_id === currentUserId) ||
        likeOrRetweet.id === currentUserId
    );
  }

  const [count, setCount] = useState(likes.length);
  const [liked, setLiked] = useState(determineTrueOrFalse(likes));
  const [retweeted, setRetweeted] = useState(false);
  const [retweetCount, setRetweetCount] = useState(retweets.length);
  const [replyCount, setReplyCount] = useState(replies.length || 0);
  const { id } = useParams();

  useEffect(() => {
    setCount(likes.length);
    setLiked(determineTrueOrFalse(likes));
    setRetweeted(determineTrueOrFalse(retweets));
    setReplyCount(replies.length || 0);

    if (displayIconCount) {
      setCount(likes.length);
      setReplyCount(replies.length);
    }
  }, [id, feed, tweet]);

  async function RetweetOnClick() {
    try {
      await axios.post(route + "/api/retweet", {
        id: currentUserId,
        tweet_id: tweet.id,
      });

      console.log("retweet is good");
    } catch (e) {
      console.error(e);
    }
  }
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
              RetweetOnClick();
            }}
            className={`${retweeted ? "retweeted" : ""}`}
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
