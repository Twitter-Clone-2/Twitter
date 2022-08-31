import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import "../../CSS/ReplyModal.css";
import PersonIcon from "@mui/icons-material/Person";
import InputBase from "@mui/material/InputBase";
import route from "../../utils/server_router";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "25px",
  boxShadow: 24,
  p: 2,
};

export default function ReplyModal({
  tweet_id,
  first_name,
  last_name,
  username,
  created_at,
  content,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reply, setReply] = useState("");
  const currentUserId = JSON.parse(localStorage.getItem("currUser")).id;
  const navigate = useNavigate();

  const createReply = () => {
    axios
      .post(route + "/api/reply", {
        content: reply,
        id: currentUserId,
        fk: tweet_id,
      })
      .then(() => {
        setReply("");
        navigate(`/tweet/${tweet_id}`);
      });
  };

  return (
    <div>
      <ChatBubbleOutlineIcon
        onClick={(event) => {
          event.stopPropagation();
          handleOpen();
        }}
      />
      <Modal
        open={open}
        onClose={(event) => {
          event.stopPropagation();
          handleClose();
        }}
        onClick={(event) => {
          event.stopPropagation();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <CloseIcon
              className="replyModalCloseIcon"
              onClick={(event) => {
                event.stopPropagation();
                handleClose();
              }}
            />
          </div>

          <div>
            {/* TOP */}
            <div className="replyModalUserAndTweet">
              <PersonIcon sx={{ fontSize: "80px" }} />
              <div>
                <div>
                  <span className="replyModalFont" id="replyModalAccountName">
                    {first_name} {last_name}
                  </span>
                  <span className="replyModalFont replyModalGray">
                    {" "}
                    @{username}{" "}
                  </span>
                  <span className="replyModalFont replyModalGray">
                    * {format(new Date(created_at), "PPpp")}
                  </span>
                </div>
                <div className="replyModalFont">{content}</div>
              </div>
            </div>

            {/* MID */}
            <div className="replyModalFont replyModalMiddle">
              Replying to{" "}
              <span
                onClick={() => console.log("take to their profile")}
                className="replyModalAccountLink"
              >
                @{username}
              </span>
            </div>

            {/* BOT */}
            <div className="replyModalReplyBot">
              <div>
                <PersonIcon sx={{ fontSize: "80px" }} />
              </div>

              <div>
                <InputBase
                  className="replyModalInput"
                  placeholder="Tweet your reply"
                  onChange={(e) => setReply(e.target.value)}
                  value={reply}
                  multiline={true}
                  sx={{
                    fontSize: "33px",
                    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
                    width: "100%",
                  }}
                />
              </div>
            </div>
            <div className="replyModalGetButtonOnRight">
              <div></div>
              <button
                id="feedTweetButton"
                className={reply.length == 0 ? "incompleteColor" : ""}
                onClick={createReply}
              >
                Reply
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
