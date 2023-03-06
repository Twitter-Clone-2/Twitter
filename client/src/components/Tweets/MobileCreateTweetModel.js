import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import route from "../../utils/server_router";
import "./mobileTweetModal.css";
import { useDispatch } from "react-redux";
import { updateFeed } from "../../redux/mainSlice";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  height: "50vh",
  bgcolor: "white",
  borderRadius: "25px",
  boxShadow: 24,
  p: 0,
};

const MobileCreateTweetModel = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = JSON.parse(localStorage.getItem("currUser"));
  const [tweet, setTweet] = useState("");

  const createTweet = () => {
    if (tweet.length == 0) return;
    if (tweet.length > 240) return;
    axios
      .post(route + "/api/create/tweet", {
        tweet,
        id: user.id,
      })
      .then(() => {
        setTweet("");
        dispatch(updateFeed());
        handleClose();
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <EditIcon
        className="icon"
        sx={{ fontSize: "35px" }}
        onClick={handleOpen}
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
          <div className="mobileTweet">
            <div className="mobileTweetTopRow">
              <span className="font bold cancelSpan" onClick={handleClose}>
                Cancel
              </span>
              <button
                className="font mobileTweetButton bold"
                id={0 < tweet.length && tweet.length < 240 ? "" : "dim"}
                onClick={createTweet}
              >
                Tweet
              </button>
            </div>

            <div className="mobileTweetInputDiv">
              <textarea
                value={tweet}
                onChange={(e) => {
                  setTweet(e.target.value);
                }}
                className="mobileTweetInput font"
                placeholder="What's Happening?"
                autoFocus
              />
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default MobileCreateTweetModel;
{
  /* <CloseIcon
              className="replyModalCloseIcon"
              onClick={(event) => {
                event.stopPropagation();
                handleClose();
              }}
            /> */
}
