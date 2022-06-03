import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "../CSS/Login.css";
import { Link } from "react-router-dom";
//import axios from "axios";
const FormLogin = () => {
  const [emailOrUserName, setEmailOrUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
  };
  return (
    <div id="backgroundBody">
      <div id="mainBody">
        <div id="header">
          {/* PLACE HOLDER FOR AN ICON */}
          <p>X</p>
          {/* PLACEHOLDER FOR TWITTER ICON */}
          <p>X</p>
          {/* THIS IS SUPPOSED TO BE A BLANK DIV , MEANT FOR CORRECT SPACING */}
          <div></div>
        </div>
        <h1>Sign in to Twitter</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email or User Name</label>
            <TextField
              value={emailOrUserName}
              onChange={(e) => setEmailOrUserName(e.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>Next</button>
        </form>
        <button>Forgot password?</button>
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default FormLogin;
