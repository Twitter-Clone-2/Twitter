import React, { useState, useEffect, useRef } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "../CSS/EditProfile.css";
import { Storage } from "aws-amplify";

const ImageUploadButton = ({ id, setProfilePicture, user }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  async function handleChange(e) {
    const file = e.target.files[0];
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    let fileName = `${user.id}_${timestamp}_${file.name}`;
    fileName = fileName.replace(/ /g, "_");
    await Storage.put(fileName, file);
    let imageKeys = await Storage.list(fileName);
    imageKeys = await Promise.all(
      imageKeys.map(async (k) => {
        const signedUrl = await Storage.get(k.key);
        return signedUrl;
      })
    );
    setProfilePicture(imageKeys[0]);
    console.log(imageKeys[0]);
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
