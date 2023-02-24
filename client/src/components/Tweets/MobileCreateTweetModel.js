import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./mobileTweetModal.css";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  height: "50vh",
  bgcolor: "black",
  borderRadius: "25px",
  boxShadow: 24,
  p: 0,
};

const MobileCreateTweetModel = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
              <button className="font mobileTweetButton bold">Tweet</button>
            </div>

            <div className="mobileTweetInputDiv">
              <textarea className="mobileTweetInput font" autoFocus />
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
