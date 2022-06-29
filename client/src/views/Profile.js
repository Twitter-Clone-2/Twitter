import React, { useState, useEffect } from "react";
import IconNav from "../components/IconNav";
import NewsAPI from "../components/NewsAPI";
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/ProfilePage.css";
import axios from "axios";
import Logout from "../components/Logout";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import EditProfile from "../components/EditProfile";
import Settings from "../components/Settings";
const Profile = () => {
  const route = require("../utils/server_router");
  const user = JSON.parse(localStorage.getItem("currUser"));
  const [currUser, setCurrUser] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    userName: user.username,
    email: user.email,
    password: user.password,
    bio: user.bio,
    location: user.location,
    id: user.id,
    createdAt: user.created_at,
  });
  let arrow = "<-";

  useEffect(() => {
    axios
      .post(route + "/api/findAllTweetsFromOneUser", {
        id: user.id,
      })
      .then((res) => {
        const tweets = res.data.rows;
        setAllTweets(tweets.reverse());
      });
  }, []);

  const [editProfile, setEditProfile] = useState(false);
  const [settings, setSettings] = useState(false);
  const [allTweets, setAllTweets] = useState([]);

  return (
    <div id="profilePage">
      {/* ICON NAV BAR */}
      <IconNav />
      {/* MAIN CONTENT OF PROFILE PAGE */}
      <div id="profilePageUser">
        {/* HEADER OF USER PROFILE */}
        <div id="profilePageHeader">
          <div>
            <h3>
              {currUser.firstName} {currUser.lastName}
            </h3>
            <p>{allTweets.length} tweets</p>
            <Logout />
          </div>
        </div>

        {/* USERS BACKGROUND AND PROFILE PIC WILL BE DISPLAYED HERE */}
        <div>
          {/* BIG IMAGE HERE */}
          {/* DELETE THIS DIV WHEN IMAGE IS READY */}
          <div id="tempImage"></div>
          {/* SMALL IMAGE HERE */}
          <div id="bottomOfPicture">
            <PersonIcon sx={{ fontSize: 100 }} id="userPic" />
            <p onClick={() => setEditProfile(true)}>
              <SettingsSuggestIcon sx={{ fontSize: 100 }} />
            </p>
          </div>
          <h2>
            {currUser.firstName} {currUser.lastName}
          </h2>
          <p>{currUser.bio}</p>
          <p>@{currUser.userName}</p>
          <p>joined , {currUser.createdAt}</p>
          <div className="flex" id="follows">
            <p>0 :Following</p>
            <p>0 :Followers</p>
          </div>
          {editProfile ? (
            <EditProfile
              setEditProfile={setEditProfile}
              setSettings={setSettings}
            />
          ) : (
            ""
          )}
          {settings ? <Settings setSettings={setSettings} /> : ""}
          <h1>Tweets</h1>
          <hr />
          {allTweets.map((tweet, i) => {
            return (
              <div className="tweet" key={i}>
                <div className="flex">
                  <div className="leftTweet">
                    <PersonIcon />
                  </div>
                  <div className="rightTweet">
                    <div className="rightTweetHeader">
                      <p>
                        {currUser.firstName} {currUser.lastName}
                      </p>
                      <p>@{currUser.userName}</p>
                      <p>{tweet.created_at}</p>
                    </div>
                    <h3>{tweet.content}</h3>
                  </div>
                </div>

                <div className="buttonsTweet">
                  <button>Like</button>
                  <button>Retweet</button>
                  <button>Comment</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* NEW SIDE OF CONTENT */}
      <NewsAPI />
    </div>
  );
};

export default Profile;
