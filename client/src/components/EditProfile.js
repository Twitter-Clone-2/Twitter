import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/EditProfile.css";
import route from "../utils/server_router";
import axios from "axios";
import ImageUploadButton from "./ImageUploadButton";

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

export default function EditProfile({ user, setCurrentUser, feed, setFeed }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);
  const [profilePicture, setProfilePicture] = useState(user.profile_picture);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  function updateAccount() {
    if (
      firstName.length == 0 ||
      lastName.length == 0 ||
      username.length == 0 ||
      firstName.length > 50 ||
      lastName.length > 50 ||
      username.length > 50 ||
      location.length > 50 ||
      bio.length > 150
    ) {
      setError(true);
      setErrorMessage("Please enter fields correctly");
    } else {
      axios
        .get(route + "/api/user/" + username)
        .then((res) => {
          if (res.data.rows.length === 0 || res.data.rows[0].id == user.id) {
            axios
              .put(route + "/api/update/account", {
                id: user.id,
                first_name: firstName,
                last_name: lastName,
                username,
                bio,
                location,
                profile_picture: profilePicture || null,
              })
              .then((res) => {
                localStorage.setItem(
                  "currUser",
                  JSON.stringify(res.data.rows[0])
                );
                setCurrentUser(res.data.rows[0]);
                setError(false);
                setFeed(
                  feed.map((tweet) => ({
                    accounts_id: tweet.accounts_id,
                    content: tweet.content,
                    created_at: tweet.created_at,
                    first_name: res.data.rows[0].first_name,
                    id: tweet.id,
                    last_name: res.data.rows[0].last_name,
                    reply_id: tweet.reply_id,
                    username: res.data.rows[0].username,
                  }))
                );
                handleClose();
              })
              .catch((e) => console.error(e));
          } else {
            setError(true);
            setErrorMessage("Username has already been taken");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
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
                <ImageUploadButton
                  id={"editProfileCameraIconBackgroundPic"}
                  setProfilePicture={setProfilePicture}
                  user={user}
                />
              </div>

              <div className="editProfileRemoveMargin">
                <PersonIcon
                  sx={{ fontSize: 150 }}
                  className="editProfileProfilePicture"
                />
                <ImageUploadButton
                  id={"editProfileCameraIconProfilePic"}
                  setProfilePicture={setProfilePicture}
                  user={user}
                />
              </div>

              <div className="editProfileInputs">
                {error && (
                  <div id="editProfileErrorMessage">{errorMessage}</div>
                )}
                <TextField
                  id="outlined-textarea"
                  className="editProfileInput"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  multiline
                  fullWidth
                  error={
                    firstName.length > 50 || firstName.length == 0
                      ? true
                      : false
                  }
                />

                <TextField
                  id="outlined-textarea"
                  className="editProfileInput"
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  multiline
                  fullWidth
                  error={
                    lastName.length > 50 || lastName.length == 0 ? true : false
                  }
                />

                <TextField
                  id="outlined-textarea"
                  className="editProfileInput"
                  label="UserName"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  multiline
                  fullWidth
                  error={
                    username.length > 50 || username.length == 0 ? true : false
                  }
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
                  error={username.length > 150 ? true : false}
                />
                <TextField
                  id="outlined-textarea"
                  className="editProfileInput"
                  label="Location"
                  value={location ? location : ""}
                  onChange={(e) => setLocation(e.target.value)}
                  multiline
                  fullWidth
                  error={
                    location.length > 50 || location.length == 0 ? true : false
                  }
                />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
