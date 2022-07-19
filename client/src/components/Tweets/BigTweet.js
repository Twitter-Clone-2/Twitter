import React from "react";
import { format } from "date-fns";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./tweets.css";
import TweetActions from "./TweetActions";
import ReplyBox from "./ReplyBox";
import Tweet from "./Tweet";

const BigTweet = ({ tweet, likes, replies, replyLikes }) => {
  const navigate = useNavigate();

  const takeToProfile = (id) => {
    navigate("/profile/page/" + id);
  };

  const backToFeed = () =>{
    navigate("/main/feed")
  }
  return (
    <div className="bigTweet">
      <div className="bigTweetHeader">
        <KeyboardBackspaceIcon
          className="backButton paddingLeft"
          sx={{ fontSize: 40 }}
          onClick={()=>backToFeed()}
        />
        <div id="thread">Tweet</div>
      </div>

      <div className="bigTweetPicAndNames paddingLeft">
        <div className="leftTweet">
          <PersonIcon
            sx={{ fontSize: 60 }}
            onClick={() => takeToProfile(tweet.accounts_id)}
          />
        </div>

        <div>
          <p className="bold" onClick={() => takeToProfile(tweet.accounts_id)}>
            {tweet.first_name} {tweet.last_name}
          </p>
          <p onClick={() => takeToProfile(tweet.accounts_id)}>
            @{tweet.username}
          </p>
        </div>
      </div>

      <div className="bigTweetContent">{tweet.content}</div>

      <div className="paddingLeft bigTweetDate borderBot underline">
        {format(new Date(tweet.created_at), "PPpp")}
      </div>

      <TweetActions tweet={tweet} likes={likes} displayIconCount={true} replies={replies}/>

      <ReplyBox tweet={tweet}/>

      {replies.map((reply, i) => <Tweet key={i} tweet={reply} likes={replyLikes} replyingTo={true}/>)}
    </div>
  );
};

export default BigTweet;
