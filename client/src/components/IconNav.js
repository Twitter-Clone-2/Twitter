import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import TwitterIcon from "@mui/icons-material/Twitter";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonIcon from "@mui/icons-material/Person";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "../CSS/IconNav.css";

const IconNav = (props) => {
  const navigate = useNavigate();

  return (
    <div className="iconContainer">
      <div id="twitterButton" onClick={() => navigate("/main/feed")}>
        <TwitterIcon id="twitterIcon" className="icon" />
      </div>
      <Button className={"iconButton"} onClick={() => navigate("/main/feed")}>
        <HomeIcon className="icon" />
        <div className="buttonLabel">Home</div>
      </Button>
      <Button className={"iconButton"}>
        <NotificationsIcon className="icon" />
        <div className="buttonLabel">Notifications</div>
      </Button>
      <Button className={"iconButton"}>
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
      <Button className={"iconButton"}>
        <SettingsSuggestIcon className="icon" />
        <div className="buttonLabel">Settings</div>
      </Button>
      <Button
        id="tweetButton"
        variant="contained"
        onClick={() => props.renderPost()}
      >
        Tweet
      </Button>
    </div>
  );
};

export default IconNav;
