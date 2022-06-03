import React, { useState, useEffect } from "react";
import IconNav from "../components/IconNav";
import NewsAPI from "../components/NewsAPI";
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/ProfilePage.css";
import axios from "axios";
import Logout from "../components/Logout";
import { useParams } from "react-router-dom";
const OtherUserProfile = () => {
  const [following, setFollowing] = useState(true);
  // testing with id : 628ea1b3412dd7517b01fa69
  let currUser = {
    user: {
      firstName: "reza",
      lastName: "Amraei",
      email: "amraeireza@gmail.com",
      userName: "GucciGuwop645",
      bio: "This is Reza",
      location: "CA",
    },
    _id: 1,
    followers: [2],
    following: [2],
    createdAt: "now",
    tweets: [],
  };
  const followButton = (id) => {
    console.log(id);
  };
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
            <button onClick={() => followButton(currUser._id)}>
              {following ? "Unfollow" : "Follow"}
            </button>
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

export default OtherUserProfile;
