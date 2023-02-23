import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import TwitterIcon from "@mui/icons-material/Twitter";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Logout from "./LoginAndReg/Logout";
import "../CSS/MobileNavbar.css";
import TweetModal from "./Tweets/TweetModal";

const MobileNavbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const displayNav =
    pathname !== "/" && pathname !== "/login" && pathname !== "/register";

  return (
    <div className="mobileNavbar">
      {displayNav && (
        <>
          <Button
            className={"iconButton"}
            onClick={() => navigate("/main/feed")}
          >
            <HomeIcon className="icon" sx={{ fontSize: "35px" }} />
          </Button>

          <Button
            className={"iconButton"}
            onClick={() => navigate("/messages")}
          >
            <ChatBubbleIcon className="icon" sx={{ fontSize: "35px" }} />
          </Button>

          <Button
            className={"iconButton"}
            onClick={() => navigate("/profile/page")}
          >
            <PersonIcon className="icon" sx={{ fontSize: "35px" }} />
          </Button>
        </>
      )}
    </div>
  );
};

export default MobileNavbar;
