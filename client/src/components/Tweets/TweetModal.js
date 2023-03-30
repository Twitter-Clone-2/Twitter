import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import "../../CSS/ReplyModal.css";
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

export default function TweetModal() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

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
