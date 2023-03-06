import React, { useState } from "react";
import "../CSS/Main.css";
import LoginModal from "../components/LoginAndReg/LoginModal";
import RegisterModal from "../components/LoginAndReg/RegisterModal";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [openRegister, setOpenRegister] = useState(false);

  alert(
    "If you want to view this website without making an account use the guest account, itll already be filled out when logging in!"
  );

  return (
    <div id="leftColMainPage">
      <img
        id="leftImg"
        src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"
      />
      <div id="rightColMainPage">
        <img
          id="mainPageTwitterLogo"
          src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png"
        />
        <div id="mainPageHeader" className="mainPageHeaderFont">
          Happening now
        </div>
        <div id="mainPageSubHeader" className="mainPageHeaderFont">
          Join "Twitter" today.
        </div>
        <RegisterModal
          openRegister={openRegister}
          setOpenRegister={setOpenRegister}
        />

        <div id="agreement">
          By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use.
        </div>

        <div className="mainPageFont" id="mainPageQuestion">
          Already have an account?
        </div>
        <LoginModal setOpenRegister={setOpenRegister} />
      </div>
    </div>
  );
};

export default Main;
