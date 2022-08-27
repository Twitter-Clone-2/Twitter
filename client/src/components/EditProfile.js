import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/EditProfile.css";

const style = {
  position: "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid none",
  borderRadius: 5,
  boxShadow: 24,
  p: 0.5,
};

export default function EditProfile() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [bio, setBio] = useState("");

  return (
    <div>
      <button className="profileEdit" onClick={handleOpen}>
        Edit Profile
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className="editProfileHeader">
              <div className="editProfileLeftHeader">
                <CloseIcon id="editProfileCloseIcon" onClick={handleClose} />
                <div> Edit Profile</div>
              </div>

              <button id="editProfileSaveButton"> Save </button>
            </div>

            <div id="editProfileGreyBackground">
              <CameraAltIcon
                className="editProfileCameraIcon"
                id="editProfileCameraIconBackgroundPic"
                sx={{ fontSize: "30px" }}
              />
            </div>

            <div>
              <PersonIcon
                sx={{ fontSize: 150 }}
                className="editProfileProfilePicture"
              />
              <CameraAltIcon
                className="editProfileCameraIcon"
                id="editProfileCameraIconProfilePic"
                sx={{ fontSize: "30px" }}
              />
            </div>

            <div className="editProfileInputs">
              <TextField
                id="outlined-textarea"
                className="editProfileInputs"
                label="First Name"
                multiline
                fullWidth
              />

              <TextField
                id="outlined-textarea"
                className="editProfileInputs"
                label="Last Name"
                multiline
                fullWidth
              />

              <TextField
                id="outlined-textarea"
                className="editProfileInputs"
                label="UserName"
                multiline
                fullWidth
              />
              <TextField
                id="outlined-textarea"
                className="editProfileInputs"
                label="Bio"
                multiline
                fullWidth
                rows={3}
              />
              <TextField
                id="outlined-textarea"
                className="editProfileInputs"
                label="Location"
                multiline
                fullWidth
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
