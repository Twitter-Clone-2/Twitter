import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import "./tweets.css";
import TweetActions from "./TweetActions";
import DeleteTweet from "./DeleteTweet";
import CachedIcon from "@mui/icons-material/Cached";
import { formatDistance, parseISO } from "date-fns";
import { format, formatInTimeZone, utcToZonedTime } from "date-fns-tz";
import moment from "moment";

export default function Tweet({
  tweet,
  likes,
  replyingTo = false,
  fetchAllTweetsForFeed,
  replies,
  feed,
  id,
  picture,
  currentUserId,
  retweets,
}) {
  const navigate = useNavigate();
  const loadTweet = (tweet_id) => {
    navigate(`/tweet/${tweet_id}`);
  };

  const takeToProfile = (id) => {
    navigate("/profile/page/" + id);
  };

  const filteredLikes = likes.filter(
    (like) => like.tweets_id == tweet.id || like.tweets_id == tweet.tweets_id
  );

  const filteredReplies = replies.filter(
    (reply) => reply.reply_id == tweet.id || reply.reply_id == tweet.tweets_id
  );

  const displayHowOldTweetIs = () => {
    let utcTimeStamp = moment.utc();
    utcTimeStamp = utcTimeStamp.format(); // 2023-03-01T20:56:29Z
    const now = utcTimeStamp.slice(0, -1); // remove Z from string
    return formatDistance(new Date(now), new Date(tweet.created_at));
  };

  return (
    <div
      className="tweet"
      onClick={() => {
        loadTweet(tweet.id || tweet.tweets_id);
      }}
    >
      {tweet.tweets_id && (
        <div className="tweetRetweetHeader">
          <CachedIcon sx={{ fontSize: 20 }} />
          <div>
            {tweet.retweeter_first_name} {tweet.retweeter_last_name} Retweeted
          </div>
        </div>
      )}
      <div className="tweetTopHalf">
        <div className="paddingLeft flex">
          {!picture ? (
            <PersonIcon
              sx={{ fontSize: 60 }}
              className="tweetUserPic"
              onClick={(event) => {
                event.stopPropagation();
                takeToProfile(
                  tweet.retweet ? tweet.tweeter_id : tweet.accounts_id
                );
              }}
            />
          ) : (
            <img
              src={picture}
              className="tweetUserPic"
              onClick={(event) => {
                event.stopPropagation();
                takeToProfile(
                  tweet.retweet ? tweet.tweeter_id : tweet.accounts_id
                );
              }}
            />
          )}
        </div>
        <div className="rightTweet">
          <div className="rightTweetHeader">
            <div className="tweetDisplayBothNames">
              <div
                className="tweetNames"
                id="tweetRealNames"
                onClick={(event) => {
                  event.stopPropagation();
                  takeToProfile(
                    tweet.retweet ? tweet.tweeter_id : tweet.accounts_id
                  );
                }}
              >
                {tweet.first_name} {tweet.last_name}
              </div>
              <p
                className="tweetNames tweetUserName"
                onClick={(event) => {
                  event.stopPropagation();
                  takeToProfile(
                    tweet.retweet ? tweet.tweeter_id : tweet.accounts_id
                  );
                }}
              >
                @{tweet.username}
              </p>
            </div>

            <p className="tweetDate">{displayHowOldTweetIs()}</p>
          </div>
          {replyingTo && (
            <p>
              Replying to{" "}
              <span className="replyingToUsername">@{tweet.username}</span>
            </p>
          )}
          <div className="tweetContent">{tweet.content}</div>
        </div>

        {tweet.accounts_id === currentUserId && (
          <DeleteTweet
            tweet_id={tweet.id || tweet.tweets_id}
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
        currentUserId={currentUserId}
        retweets={retweets}
        fetchAllTweetsForFeed={fetchAllTweetsForFeed}
      />
    </div>
  );
}
