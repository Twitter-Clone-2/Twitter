import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/EditProfile.css";
import route from "../utils/server_router";
import axios from "axios";

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
  overflow: "hidden",
};

export default function EditProfile({ user }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [firstName, setfirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);

  function updateAccount() {
    axios
      .put(route + "/api/update/account", {
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        username,
        bio,
        location,
      })
      .then((res) => {
        localStorage.setItem("currUser", JSON.stringify(res.data.rows[0]));
        handleClose();
      })
      .catch((e) => console.error(e));
  }

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
          <div className="editProfileScrollBar">
            <div>
              <div className="editProfileHeader">
                <div className="editProfileLeftHeader">
                  <CloseIcon id="editProfileCloseIcon" onClick={handleClose} />
                  <div> Edit Profile</div>
                </div>

                <button id="editProfileSaveButton" onClick={updateAccount}>
                  Save
                </button>
              </div>

              <div id="editProfileGreyBackground">
                <CameraAltIcon
                  className="editProfileCameraIcon"
                  id="editProfileCameraIconBackgroundPic"
                  sx={{ fontSize: "30px" }}
                />
              </div>

              <div className="editProfileRemoveMargin">
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
                  className="editProfileInput"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  multiline
                  fullWidth
                />

                <TextField
                  id="outlined-textarea"
                  className="editProfileInput"
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  multiline
                  fullWidth
                />

                <TextField
                  id="outlined-textarea"
                  className="editProfileInput"
                  label="UserName"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  multiline
                  fullWidth
                />
                <TextField
                  id="outlined-textarea"
                  className="editProfileInput"
                  label="Bio"
                  value={bio ? bio : ""}
                  onChange={(e) => setBio(e.target.value)}
                  multiline
                  fullWidth
                  rows={3}
                />
                <TextField
                  id="outlined-textarea"
                  className="editProfileInput"
                  label="Location"
                  value={location ? location : ""}
                  onChange={(e) => setLocation(e.target.value)}
                  multiline
                  fullWidth
                />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
