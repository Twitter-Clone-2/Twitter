import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import TwitterIcon from "@mui/icons-material/Twitter";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonIcon from "@mui/icons-material/Person";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import "../CSS/HomePage.css";
//import { useHistory } from "react-router-dom";
import Post from "../components/Post";

const IconNav = (props) => {
  // const history = useHistory();
  const handleHome = () => {
    //  history.push("/home/feed");
    console.log("hello");
  };

  // const [postForm, setPostForm] = useState(false);

  // const renderPost = () => {
  //   setPostForm(true);
  // };

  return (
    <div id="icons">
      <TwitterIcon sx={{ fontSize: 100 }} onClick={() => handleHome()} />
      <HomeIcon sx={{ fontSize: 100 }} onClick={() => handleHome()} />
      <NotificationsIcon sx={{ fontSize: 100 }} />
      <ChatBubbleIcon sx={{ fontSize: 100 }} />
      <PersonIcon sx={{ fontSize: 100 }} />
      <SettingsSuggestIcon sx={{ fontSize: 100 }} />
      <button className="button-15" onClick={() => props.renderPost()}>
        Create Post
      </button>
    </div>
  );
};

export default IconNav;
