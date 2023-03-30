import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import route from "../../utils/server_router";
import axios from "axios";
import "./tweets.css";

const ReplyBox = ({ tweet, setReplies, replies, grabTweet }) => {
  const currentUserId = JSON.parse(localStorage.getItem("currUser")).id;
  const navigate = useNavigate();
  const [hiddenDiv, setHiddenDiv] = useState(true);
  const [reply, setReply] = useState("");

  const createReply = () => {
    axios
      .post(route + "/api/reply", {
        content: reply,
        id: currentUserId,
        fk: tweet.id,
      })
      .then(() => {
        setReply("");
        setHiddenDiv(true);
        setReplies(replies);
        grabTweet();
      });
  };
  const takeToProfile = (id) => {
    navigate("/profile/page/" + id);
  };

  const settingHiddenDiv = () => {
    setHiddenDiv(false);
  };

  return (
    <>
      {!hiddenDiv && (
        <div className="replyingTo">
          Replying to{" "}
          <span className="replyingToUsername">@{tweet.username}</span>
        </div>
      )}
      <div className="paddingLeft replyBox">
        <PersonIcon
          sx={{ fontSize: 60 }}
          onClick={() => takeToProfile(currentUserId)}
        />
        <input
          className="replyBoxFont"
          placeholder="Tweet your reply"
          onClick={settingHiddenDiv}
          onChange={(e) => setReply(e.target.value)}
          value={reply}
        />
      </div>

      <div
        className={
          !hiddenDiv ? "borderBot submitReplyDiv" : "testing borderBot"
        }
      >
        <button className="submitReplyButton" onClick={createReply}>
          Reply
        </button>
      </div>
    </>
  );
};

export default ReplyBox;
