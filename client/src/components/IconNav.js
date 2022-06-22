import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import TwitterIcon from "@mui/icons-material/Twitter";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonIcon from "@mui/icons-material/Person";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import "../CSS/HomePage.css";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";

const IconNav = (props) => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/main/feed");
  };
  const takeToProfile = () => {
    navigate("/profile/page");
  };

  return (
    <div id="icons">
      <TwitterIcon sx={{ fontSize: 100 }} onClick={() => handleHome()} />
      <HomeIcon sx={{ fontSize: 100 }} onClick={() => handleHome()} />
      <NotificationsIcon sx={{ fontSize: 100 }} />
      <ChatBubbleIcon sx={{ fontSize: 100 }} />
      <PersonIcon sx={{ fontSize: 100 }} onClick={() => takeToProfile()} />
      <SettingsSuggestIcon sx={{ fontSize: 100 }} />
      <button className="button-15" onClick={() => props.renderPost()}>
        Create Post
      </button>
    </div>
  );
};

export default IconNav;
