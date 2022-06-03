import React, { useState, useEffect } from "react";
import "../CSS/Register.css";
import TextField from "@mui/material/TextField";
import axios from "axios";
//import { useHistory } from "react-router-dom";
const FormUserName = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  confirm,
  setConfirm,
}) => {
  //const history = useHistory();
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="accountDetails" onSubmit={handleSubmit}>
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
      <button>Welcome To Twitter!</button>
    </form>
  );
};

export default FormUserName;
