import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "../CSS/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//import axios from "axios";
const FormLogin = () => {
  const navigate = useNavigate();
  const route = require("../utils/server_router");
  const [emailOrUserName, setEmailOrUserName] = useState("");
  const [password, setPassword] = useState("");
  console.log(route);
  //Needs Validations
  //Forgot password button will hopefully be a later feature added
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(route + "/api/login", {
        email: emailOrUserName,
        password,
      })
      .then((res) => {
        if (res.data) {
          navigate("/main/feed");
          console.log(res.data.user);
          localStorage.setItem("currUser", JSON.stringify(res.data.user));
          console.log(localStorage.getItem("currUser"));
        }
      })
      .catch((err) => console.log(err));
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
