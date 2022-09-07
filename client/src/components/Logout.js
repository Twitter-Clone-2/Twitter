import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../CSS/IconNav.css";
import PersonIcon from "@mui/icons-material/Person";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CancelIcon from "@mui/icons-material/Cancel";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import TwitterIcon from "@mui/icons-material/Twitter";

const Logout = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setStage(1);
  };
  const [stage, setStage] = useState(1);
  const [value, setValue] = useState(0);
  const { first_name, last_name, username } = JSON.parse(
    localStorage.getItem("currUser")
  );
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: `${stage === 2 ? "25px" : "1px"}`,
    boxShadow: 24,
    p: 0,
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("currUser");
    navigate("/");
  };

  return (
    <div>
      <div id="iconNavBarSignout" onClick={handleOpen}>
        <div>
          {JSON.parse(localStorage.getItem("currUser")).profile_picture ? (
            <img
              src={JSON.parse(localStorage.getItem("currUser")).profile_picture}
              className="tweetUserPic"
            />
          ) : (
            <PersonIcon sx={{ fontSize: 50 }} />
          )}
        </div>
        <div id="iconNavBarNames">
          <span id="iconNavBarName" className="iconNavBarFont">
            {first_name} {last_name}
          </span>
          <span id="iconNavBarUsername" className="iconNavBarFont">
            @{username}
          </span>
        </div>
        <div>
          <MoreHorizIcon />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {stage === 1 && (
            <div className="tweetDeleteOption">
              <div
                className="deleteTweetRow "
                onClick={(event) => {
                  setStage(2);
                  event.stopPropagation();
                }}
              >
                <SentimentVeryDissatisfiedIcon />
                Logout
              </div>
              <div
                className="deleteTweetRow"
                onClick={(event) => {
                  handleClose();
                  event.stopPropagation();
                }}
              >
                <CancelIcon />
                Cancel
              </div>
            </div>
          )}

          {stage == 2 && (
            <div className="tweetDeleteOption">
              <div className="deleteTweetPadding">
                <div className="center5">
                  <TwitterIcon
                    id="twitterIcon"
                    className="icon"
                    sx={{ fontSize: 40 }}
                  />
                </div>
                <div className="deleteTweetHeader">Log out of "Twitter"?</div>
                <div className="deleteTweetBody">
                  You can always log back in at any time. If you just want to
                  switch accounts, you can do that by adding an existing
                  account.
                </div>
                <div className="deleteTweetButtonsDiv">
                  <button
                    className="deleteTweetFinalButton deleteTweetButtons"
                    id="deleteTweetButtonFinal"
                    onClick={(event) => {
                      event.stopPropagation();
                      logout();
                    }}
                  >
                    Log Out
                  </button>

                  <button
                    className="deleteTweetSecondCancelButton deleteTweetButtons"
                    id="deleteTweetCancelButtonFinal"
                    onClick={(event) => {
                      handleClose();
                      event.stopPropagation();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Logout;
