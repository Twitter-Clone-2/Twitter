import React from "react";
import { format } from "date-fns";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./tweets.css";
import TweetActions from "./TweetActions";
import ReplyBox from "./ReplyBox";
import Tweet from "./Tweet";

const BigTweet = ({
  tweet,
  likes,
  replies,
  retweets,
  replyRetweets,
  replyLikes,
  replyReplies,
  currentUserId,
}) => {
  const navigate = useNavigate();
  console.log(retweets);
  const takeToProfile = (id) => {
    navigate("/profile/page/" + id);
  };

  const backToFeed = () => {
    navigate(-1);
  };
  return (
    <div className="bigTweet">
      <div className="bigTweetHeader">
        <KeyboardBackspaceIcon
          className="backButton  cursorPointer"
          sx={{ fontSize: 40 }}
          onClick={() => backToFeed()}
        />
        <div id="thread">Tweet</div>
      </div>

      <div className="bigTweetPicAndNames paddingLeft">
        <div className="leftTweet cursorPointer">
          {tweet.profile_picture ? (
            <img
              src={tweet.profile_picture}
              className="bigTweetProfilePicture"
              onClick={() => takeToProfile(tweet.accounts_id)}
            />
          ) : (
            <PersonIcon
              sx={{ fontSize: 60 }}
              onClick={() => takeToProfile(tweet.accounts_id)}
            />
          )}
        </div>

        <div>
          <p
            className="bold tweetNames"
            onClick={() => takeToProfile(tweet.accounts_id)}
          >
            {tweet.first_name} {tweet.last_name}
          </p>
          <p
            className="tweetNames"
            onClick={() => takeToProfile(tweet.accounts_id)}
          >
            @{tweet.username}
          </p>
        </div>
      </div>

      <div className="bigTweetContent">{tweet.content}</div>

      <div className="paddingLeft bigTweetDate borderBot underline">
        {format(new Date(tweet.created_at), "PPpp")}
      </div>

      <TweetActions
        tweet={tweet}
        likes={likes}
        displayIconCount={true}
        replies={replies}
        retweets={retweets}
        currentUserId={currentUserId}
      />

      <ReplyBox tweet={tweet} />

      {replies.map((reply, i) => (
        <Tweet
          key={i}
          tweet={reply}
          likes={replyLikes}
          retweets={replyRetweets}
          replyingTo={true}
          replies={replyReplies}
          id={reply.accounts_id}
          picture={reply.profile_picture}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};

export default BigTweet;
