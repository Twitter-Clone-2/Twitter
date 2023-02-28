import React from "react";
import { format } from "date-fns";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import "./tweets.css";
import TweetActions from "./TweetActions";
import DeleteTweet from "./DeleteTweet";
import CachedIcon from "@mui/icons-material/Cached";

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
    const dayArr = 0;
    const timeArr = 1;

    const year = 0;
    const month = 1;
    const day = 2;

    const hour = 0;
    const minute = 1;

    const breakTimeIntoArray = (arr) => {
      arr[dayArr] = arr[dayArr].split("-");
      arr[timeArr] = arr[timeArr].split(":");
      return [...arr];
    };

    let rightNow = new Date().toISOString().split("T");
    rightNow = breakTimeIntoArray(rightNow);

    let currentTweet = new Date(tweet.created_at).toISOString().split("T");
    currentTweet = breakTimeIntoArray(currentTweet);

    const deteremineDistanceInTime = (dayOrTime, dayOrTimeIndex, string) => {
      const timeDifference =
        parseFloat(rightNow[dayOrTime][dayOrTimeIndex]) -
        parseInt(currentTweet[dayOrTime][dayOrTimeIndex]);
      const differenceOfTimeOver1 = timeDifference > 1;
      return `${timeDifference} ${string}${
        differenceOfTimeOver1 ? "s" : ""
      } ago`;
    };

    if (rightNow[dayArr][year] !== currentTweet[dayArr][year]) {
      return deteremineDistanceInTime(dayArr, year, "year");
    } else if (rightNow[dayArr][month] !== currentTweet[dayArr][month]) {
      return deteremineDistanceInTime(dayArr, month, "month");
    } else if (rightNow[dayArr][day] !== currentTweet[dayArr][day]) {
      return deteremineDistanceInTime(dayArr, day, "day");
    } else if (rightNow[timeArr][hour] !== currentTweet[timeArr][hour]) {
      return deteremineDistanceInTime(timeArr, hour, "hour");
    } else if (rightNow[timeArr][minute] !== currentTweet[timeArr][minute]) {
      return deteremineDistanceInTime(timeArr, minute, "minute");
    } else {
      return "Now";
    }
  };

  displayHowOldTweetIs();
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
            <p>{displayHowOldTweetIs()}</p>
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
