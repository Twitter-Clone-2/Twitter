import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import "../CSS/MobileNavbar.css";
import EditIcon from "@mui/icons-material/Edit";
import MobileCreateTweetModel from "./Tweets/MobileCreateTweetModel";

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

          <Button>
            <MobileCreateTweetModel />
          </Button>
        </>
      )}
    </div>
  );
};

export default MobileNavbar;
