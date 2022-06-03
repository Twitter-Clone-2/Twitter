import React from "react";
import { Link } from "react-router-dom";
import "../CSS/EditProfile.css";

const EditProfile = (props) => {
  return (
    <body class="center">
      <p class="pic">PROFILE IMAGE </p>

      <form class="">
        <div class="input ">
          <input type="text" className="text" placeholder="Name" />
        </div>

        <div class="input ">
          <input type="text" className="text" placeholder="Bio:" />
        </div>

        <div class="input ">
          <input type="text" className="text" placeholder="Location:" />
        </div>

        <button className="edit-btn">Submit</button>
      </form>

      <button
        className="edit-btn btm"
        onClick={() => {
          props.setEditProfile(false);
          props.setSettings(true);
        }}
      >
        Adjust Your Settings!
      </button>
      <br />
      <button className="cancel" onClick={() => props.setEditProfile(false)}>
        Cancel
      </button>
    </body>
  );
};
export default EditProfile;
