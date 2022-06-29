import React, { useState, useEffect } from "react";
import IconNav from "../components/IconNav";
import NewsAPI from "../components/NewsAPI";
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/ProfilePage.css";
import axios from "axios";
import Logout from "../components/Logout";
import { useParams, useNavigate } from "react-router-dom";
const OtherUserProfile = () => {
  const [following, setFollowing] = useState(false);
  const route = require("../utils/server_router");
  const { id } = useParams();
  const navigate = useNavigate();
  const [allTweets, setAllTweets] = useState([]);

  let user = {
    firstName: "loading",
    lastName: "loading",
    userName: "loading",
    email: "loading",
    password: "loading",
    bio: "loading",
    location: "loading",
    id: "loading",
    createdAt: "loading",
  };
  useEffect(() => {
    axios
      .post(route + "/api/user", {
        id: id,
      })
      .then((res) => {
        setCurrUser(res.data[0]);
      });
  }, []);

  useEffect(() => {
    axios
      .post(route + "/api/findAllTweetsFromOneUser", {
        id: id,
      })
      .then((res) => {
        const tweets = res.data.rows;
        setAllTweets(tweets.reverse());
      });
  }, []);

  console.log(allTweets);

  const [currUser, setCurrUser] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    location: user.location,
    id: user.id,
    created_at: user.created_at,
  });
  const followButton = (id) => {
    console.log(id);
  };
  //if user looks up his own profile he will be redirected to his link for his own profile page
  if (currUser.id === JSON.parse(localStorage.getItem("currUser")).id) {
    navigate("/profile/page");
  }
  return (
    <div id="profilePage">
      {/* ICON NAV BAR */}
      <IconNav />
      {/* MAIN CONTENT OF PROFILE PAGE */}
      <div id="profilePageUser">
        {/* HEADER OF USER PROFILE */}
        <div id="profilePageHeader">
          <button> Back </button>
          <div>
            <h3>
              {currUser.first_name} {currUser.last_name}
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
            <button onClick={() => followButton(currUser._id)}>
              {following ? "Unfollow" : "Follow"}
            </button>
          </div>
          <h2>
            {currUser.first_name} {currUser.last_name}
          </h2>
          <p>{currUser.bio}</p>
          <p>@{currUser.username}</p>
          <p>joined , {currUser.created_at}</p>
          <div className="flex" id="follows">
            <p>0 :Following</p>
            <p>0 :Followers</p>
          </div>
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
                        {currUser.first_name} {currUser.last_name}
                      </p>
                      <p>@{currUser.username}</p>
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

export default OtherUserProfile;
