import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import TwitterIcon from "@mui/icons-material/Twitter";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonIcon from "@mui/icons-material/Person";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Logout from "./LoginAndReg/Logout";
import "../CSS/IconNav.css";
import TweetModal from "./Tweets/TweetModal";

const IconNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const displayNav =
    pathname !== "/" && pathname !== "/login" && pathname !== "/register";

  return (
    <>
      {displayNav && (
        <div className="iconNavBarContainer sticky">
          <div className="iconContainer">
            <div id="twitterButton" onClick={() => navigate("/main/feed")}>
              <TwitterIcon id="twitterIcon" className="icon" />
            </div>
            <Button
              className={"iconButton"}
              onClick={() => navigate("/main/feed")}
            >
              <HomeIcon className="icon" />
              <div className="buttonLabel">Home</div>
            </Button>
            {/* <Button className={"iconButton"}>
              <NotificationsIcon className="icon" />
              <div className="buttonLabel">Notifications</div>
            </Button> */}
            <Button
              className={"iconButton"}
              onClick={() => navigate("/messages")}
            >
              <ChatBubbleIcon className="icon" />
              <div className="buttonLabel">Messages</div>
            </Button>
            <Button
              className={"iconButton"}
              onClick={() => navigate("/profile/page")}
            >
              <PersonIcon className="icon" />
              <div className="buttonLabel">Profile</div>
            </Button>
            {/* <Button className={"iconButton"}>
              <SettingsSuggestIcon className="icon" />
              <div className="buttonLabel">Settings</div>
            </Button> */}
            <TweetModal />
          </div>

          <Logout />
        </div>
      )}
    </>
  );
};

export default IconNav;
