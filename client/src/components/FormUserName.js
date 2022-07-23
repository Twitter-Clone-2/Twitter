import React from "react";
import "../CSS/Register.css";
import TextField from "@mui/material/TextField";

const FormUserName = ({
  firstName,
  userName,
  setUserName,
  bio,
  setBio,
  location,
  setLocation
}) => {
  return (
    <form className="accountDetails">
      <h1>Hello {firstName}</h1>

      <label>User Name</label>
      <TextField
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <label>Bio (optional)</label>
      <TextField value={bio} onChange={(e) => setBio(e.target.value)} />
      <label>Location (optional)</label>
      <TextField
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </form>
  );
};

export default FormUserName;
