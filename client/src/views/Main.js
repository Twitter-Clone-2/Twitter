import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "../CSS/Main.css";
import axios from "axios";
import LoginModal from "../components/LoginModal"
import { useNavigate} from "react-router-dom";


const Main = () => {
  const navigate = useNavigate();

  return (
    <div id="leftColMainPage">
      <img
        id="leftImg"
        src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"
      />
      <div id="rightColMainPage">
        <img id="mainPageTwitterLogo" src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png"/>
        <div id="mainPageHeader" className="mainPageHeaderFont">Happening now</div>
        <div id="mainPageSubHeader" className="mainPageHeaderFont">Join "Twitter" today.</div>
          <button 
          id="signUpButton" 
          className="mainPageFont mainPageButtonShape"
          onClick={()=> navigate("/register")}
          >Sign up with an email</button>
        <div id="agreement">
          By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use.
        </div>

        <div className="mainPageFont" id="mainPageQuestion">Already have an account?</div>
        <LoginModal/>
      </div>
    </div>
  );
};

export default Main;
