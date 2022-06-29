import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "../CSS/Main.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Main = () => {
  return (
    <div id="leftCol">
      <img
        id="leftImg"
        src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"
      />
      <div id="rightCol">
        <h1>Happening now</h1>

        <h2>Join "Twitter" today.</h2>
        <Link to="/register">
          <button>Sign up with an email</button>
        </Link>
        <p>
          By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use.
        </p>

        <h3>Already have an account?</h3>
        <Link to="/login">
          <button>Sign in</button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
