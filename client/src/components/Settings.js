import React, { useState } from "react";
import { BorderStyle } from "@mui/icons-material";
import "../CSS/EditProfile.css";
import { Link } from "react-router-dom";

const Settings = (props) => {
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  return (
    <body className="center">
      <h1 className="title">User Settings</h1>
      {editEmail ? (
        <div>
          <input type="text" className="input" placeholder="New email to use" />
          <input
            type="text"
            className="input"
            placeholder="Confirm new email"
          />
        </div>
      ) : (
        ""
      )}
      {editPassword ? (
        <div>
          <input
            type="text"
            className="input"
            placeholder="Enter old password"
          />
          <input
            type="text"
            className="input"
            placeholder="Enter new password"
          />
          <input
            type="text"
            className="input"
            placeholder="Confirm new password"
          />
        </div>
      ) : (
        ""
      )}
      <div className="align-center">
        <button
          className="edit-btn"
          onClick={() => {
            setEditEmail(true);
            setEditPassword(false);
          }}
        >
          Edit Email
        </button>
        <button
          className="edit-btn"
          onClick={() => {
            setEditEmail(false);
            setEditPassword(true);
          }}
        >
          Change Password
        </button>
        <br />
      </div>
      <button className="cancel" onClick={() => props.setSettings(false)}>
        Cancel
      </button>
    </body>
  );
};
export default Settings;
