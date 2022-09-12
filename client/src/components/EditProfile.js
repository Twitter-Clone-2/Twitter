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
import AWS from "aws-sdk";

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

export default function EditProfile({
  user,
  setCurrentUser,
  feed,
  setFeed,
  setProgress,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);

  const [profilePicture, setProfilePicture] = useState(user.profile_picture);
  const [profilePictureSubmitted, setProfilePictureSubmitted] = useState(false);
  const [backgroundPictureSubmitted, setBackgroundPictureSubmitted] =
    useState(false);
  const [backgroundPicture, setBackgroundPicture] = useState(
    user.background_picture
  );

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  async function updateProfilePicture(file) {
    const myBucket = new AWS.S3({
      params: { Bucket: process.env.REACT_APP_S3_BUCKET },
      region: process.env.REACT_APP_REGION,
    });
    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    let fileName = `${user.id}_${timestamp}_${file.name}`;
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: fileName,
    };
    try {
      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
        })
        .send((err) => {
          if (err) console.log(err);
        });
    } catch (e) {
      console.error(e);
    }
    return fileName;
  }

  async function updateAccount() {
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
      try {
        const responseForUser = await axios.get(
          route + "/api/user/" + username
        );

        if (
          responseForUser.data.rows.length === 0 ||
          responseForUser.data.rows[0].id == user.id
        ) {
          let fileName;
          let backgroundFileName;
          if (profilePictureSubmitted) {
            fileName = await updateProfilePicture(profilePicture);
          }
          if (backgroundPictureSubmitted) {
            backgroundFileName = await updateProfilePicture(backgroundPicture);
          }
          try {
            const responseForEditProfile = await axios.put(
              route + "/api/update/account",
              {
                id: user.id,
                first_name: firstName,
                last_name: lastName,
                username,
                bio,
                location,
                profile_picture: profilePictureSubmitted
                  ? `${process.env.REACT_APP_BUCKET_LINK}${fileName}`
                  : user.profile_picture,
                background_picture: backgroundPictureSubmitted
                  ? `${process.env.REACT_APP_BUCKET_LINK}${backgroundFileName}`
                  : user.background_picture,
              }
            );

            localStorage.setItem(
              "currUser",
              JSON.stringify(responseForEditProfile.data.rows[0])
            );

            setCurrentUser(responseForEditProfile.data.rows[0]);
            setError(false);
            setFeed(
              feed.map((tweet) => ({
                accounts_id: tweet.accounts_id,
                content: tweet.content,
                created_at: tweet.created_at,
                first_name: responseForEditProfile.data.rows[0].first_name,
                id: tweet.id,
                last_name: responseForEditProfile.data.rows[0].last_name,
                reply_id: tweet.reply_id,
                username: responseForEditProfile.data.rows[0].username,
                profile_picture:
                  responseForEditProfile.data.rows[0].profile_picture,
              }))
            );
            handleClose();
          } catch (e) {
            console.error(e);
          }
        } else {
          setError(true);
          setErrorMessage("Username has already been taken");
        }
      } catch (e) {
        console.error(e);
      }
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

              {user.background_picture ? (
                <div>
                  <img
                    src={user.background_picture}
                    className="editProfileRealBackgroundPicture"
                    id="editProfileGreyBackground"
                  />
                  <ImageUploadButton
                    id={"editProfileCameraIconWithRealBackgroundPic"}
                    setPicture={setBackgroundPicture}
                    user={user}
                    pictureSubmitCheck={setBackgroundPictureSubmitted}
                  />
                </div>
              ) : (
                <div id="editProfileGreyBackground">
                  <ImageUploadButton
                    id={"editProfileCameraIconBackgroundPic"}
                    setPicture={setBackgroundPicture}
                    user={user}
                    pictureSubmitCheck={setBackgroundPictureSubmitted}
                  />
                </div>
              )}

              <div className="editProfileRemoveMargin">
                {user.profile_picture ? (
                  <img
                    src={user.profile_picture}
                    className="editProfileRealProfilePicture editProfileProfilePicture"
                  />
                ) : (
                  <PersonIcon
                    sx={{ fontSize: 150 }}
                    className="editProfileProfilePicture"
                  />
                )}
                <ImageUploadButton
                  id={"editProfileCameraIconProfilePic"}
                  setPicture={setProfilePicture}
                  user={user}
                  pictureSubmitCheck={setProfilePictureSubmitted}
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
