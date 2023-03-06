import React from "react";
import TextField from "@mui/material/TextField";
import "../../CSS/Register.css";

const FormAccountInfo = ({
  firstName,
  setFirstName,
  firstNameError,
  setFirstNameError,
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
      <div className="registerInputMobile">
        <label>First Name </label>
        <TextField
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="registerInputMobile">
        <label>Last Name </label>
        <TextField
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="registerInputMobile">
        <label>Email </label>
        <TextField value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="registerInputMobile">
        <label>Password </label>
        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="registerInputMobile">
        <label>Confirm Password </label>
        <TextField
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FormAccountInfo;
