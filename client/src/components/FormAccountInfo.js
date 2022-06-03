import React from "react";
import TextField from "@mui/material/TextField";
import "../CSS/Register.css";

const FormAccountInfo = ({
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
  return (
    <div className="accountDetails">
      <div>
        <label>First Name </label>
        <TextField
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <label>Last Name </label>
        <TextField
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <label>Email </label>
        <TextField value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        <label>Password </label>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label>Confirm Password </label>
        <TextField
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FormAccountInfo;
