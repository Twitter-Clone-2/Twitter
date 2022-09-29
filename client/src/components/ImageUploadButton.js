import React, { useState, useEffect, useRef } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "../CSS/EditProfile.css";
import AWS from "aws-sdk";

const ImageUploadButton = ({ id, setPicture, user, pictureSubmitCheck }) => {
  useEffect(() => {
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_accessKeyId,
      secretAccessKey: process.env.REACT_APP_secretAccessKey,
    });
  }, []);

  const hiddenFileInput = useRef(null);

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  function handleChange(e) {
    setPicture(e.target.files[0]);
    pictureSubmitCheck(true);
  }

  return (
    <>
      <CameraAltIcon
        className="editProfileCameraIcon"
        id={id}
        sx={{ fontSize: "30px" }}
        onClick={handleClick}
      />
      <input
        type="file"
        style={{ display: "none" }}
        ref={hiddenFileInput}
        onChange={handleChange}
      />
    </>
  );
};

export default ImageUploadButton;
