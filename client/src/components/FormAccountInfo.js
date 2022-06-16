import React from "react";
import TextField from "@mui/material/TextField";
import "../CSS/Register.css";
//VALIDATIONS STILL NEED TO BE ADDED FOR EVERYTHING
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
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    // if (firstName.length < 5) {
    //   setFirstNameError(true);
    //   console.log(firstNameError);
    // } else {
    //   setFirstNameError(false);
    // }
  };
  return (
    <div className="accountDetails">
      <div>
        <label>First Name </label>
        <TextField value={firstName} onChange={(e) => handleFirstName(e)} />
        {firstNameError && <div>First Name must be at least 2 characters!</div>}
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
