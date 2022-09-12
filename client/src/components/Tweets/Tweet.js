import React from "react";
import { format } from "date-fns";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import "./tweets.css";
import TweetActions from "./TweetActions";
import DeleteTweet from "./DeleteTweet";

export default function Tweet({
  tweet,
  likes,
  replyingTo = false,
  fetchAllTweetsForFeed,
  replies,
  feed,
  id,
  picture,
}) {
  const navigate = useNavigate();
  const loadTweet = (tweet_id) => {
    navigate(`/tweet/${tweet_id}`);
  };

  const takeToProfile = (id) => {
    navigate("/profile/page/" + id);
  };
  const filteredLikes = likes.filter((like) => like.tweets_id == tweet.id);
  const filteredReplies = replies.filter((reply) => reply.reply_id == tweet.id);

  return (
    <div
      className="tweet"
      onClick={() => {
        loadTweet(tweet.id);
      }}
    >
      <div className="tweetTopHalf">
        <div className="flex">
          <div className="paddingLeft">
            {!picture ? (
              <PersonIcon
                sx={{ fontSize: 60 }}
                className="tweetUserPic"
                onClick={() => takeToProfile(tweet.accounts_id)}
              />
            ) : (
              <img src={picture} className="tweetUserPic" />
            )}
          </div>
          <div className="rightTweet">
            <div className="rightTweetHeader">
              <div
                className="tweetNames"
                id="tweetRealNames"
                onClick={(event) => {
                  event.stopPropagation();
                  takeToProfile(tweet.accounts_id);
                }}
              >
                {tweet.first_name} {tweet.last_name}
              </div>
              <p
                className="tweetNames"
                onClick={(event) => {
                  event.stopPropagation();
                  takeToProfile(tweet.accounts_id);
                }}
              >
                @{tweet.username}
              </p>
              <p>{format(new Date(tweet.created_at), "PPpp")}</p>
            </div>
            {replyingTo && (
              <p>
                Replying to{" "}
                <span className="replyingToUsername">@{tweet.username}</span>
              </p>
            )}
            <div className="tweetContent">{tweet.content}</div>
          </div>
        </div>
        {tweet.accounts_id === id && (
          <DeleteTweet
            tweet_id={tweet.id}
            fetchAllTweetsForFeed={fetchAllTweetsForFeed}
            onClick={(event) => event.stopPropagation()}
          />
        )}
      </div>
      <TweetActions
        tweet={tweet}
        likes={filteredLikes}
        replies={filteredReplies}
        feed={feed}
      />
    </div>
  );
}
