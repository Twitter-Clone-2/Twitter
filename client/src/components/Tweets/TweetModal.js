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
import Button from "@mui/material/Button";
import "../../CSS/IconNav.css";

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
//https://www.pastemagazine.com/movies/best-horror-movies-on-netflix-streaming/#3-the-haunting-of-hill-house
export default function TweetModal({
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
    <>
      <Button id="tweetButton" variant="contained">
        Tweet
      </Button>
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
        </Box>
      </Modal>
    </>
  );
}
