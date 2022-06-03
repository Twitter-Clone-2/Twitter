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
  const [currUser, setCurrUser] = useState({
    user: {
      firstName: "gvergrfgrghrgbrgdgrgd",
      lastName: "Account",
      userName: "drgvsgvrfg",
      email: "Test@gmail.com",
      password: "$2b$10$tP3y6EfpGL0JJ8TqR3cHB.W8WFJDDEHaiSo1SRgttp9XExMvrpW7G",
      bio: "",
      location: "",
    },
    followers: [],
    following: [],
    _id: "628ea1b3412dd7517b01fa69",
    post: [],
    likes: [],
    retweets: [],
    messages: [],
    tweets: [],
    createdAt: 2022,
    updatedAt: 2022,
  });
  let arrow = "<-";
  const [editProfile, setEditProfile] = useState(false);
  const [settings, setSettings] = useState(false);

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
              {currUser.user.firstName} {currUser.user.lastName}
            </h3>
            <p>{currUser.tweets.length} tweets</p>
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
            {currUser.user.firstName} {currUser.user.lastName}
          </h2>
          <p>{currUser.user.bio}</p>
          <p>@{currUser.user.userName}</p>
          <p>joined , {currUser.createdAt}</p>
          <div className="flex" id="follows">
            <p>{currUser.following.length} :Following</p>
            <p>{currUser.followers.length} :Followers</p>
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
          {/* {sortedTweets.map((tweet, i) => {
            return (
              <div className="tweet" key={i}>
                <div className="flex">
                  <div className="leftTweet">
                    <PersonIcon />
                  </div>
                  <div className="rightTweet">
                    <div className="rightTweetHeader">
                      <p>
                        {currUser.user.firstName} {currUser.user.lastName}
                      </p>
                      <p>@{currUser.user.userName}</p>
                      <p>{tweet.time}</p>
                    </div>
                    <h3>{tweet.tweet}</h3>
                  </div>
                </div>

                <div className="buttonsTweet">
                  <button>Like</button>
                  <button>Retweet</button>
                  <button>Comment</button>
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
      {/* NEW SIDE OF CONTENT */}
      <NewsAPI />
    </div>
  );
};

export default Profile;