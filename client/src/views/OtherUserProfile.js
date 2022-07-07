import React, { useState, useEffect } from "react";

import PersonIcon from "@mui/icons-material/Person";
import "../CSS/ProfilePage.css";
import axios from "axios";
import Logout from "../components/Logout";
import { useParams, useNavigate } from "react-router-dom";
import route from "../utils/server_router";

const OtherUserProfile = () => {
  const [allTweets, setAllTweets] = useState([]);
  const [currUser, setCurrUser] = useState({});
  const [followingStatus, setFollowingStatus] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getUsersAndTweets = () => {
    axios
      .post(route + "/api/user", {
        id: id,
      })
      .then(({ data }) => {
        setCurrUser(data[0]);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .post(route + "/api/findAllTweetsFromOneUser", {
        id: id,
      })
      .then(({ data }) => {
        const tweets = data.rows;
        setAllTweets(tweets.reverse());
      })
      .catch((e) => {
        console.log(e);
      });
    //restart
    axios
      .post(route + "/api/checkFollowStatus", {
        follower: JSON.parse(localStorage.getItem("currUser")).id,
        following : id
      })
      .then((res) => {
        const relationshipStatus = res.data;
        if(relationshipStatus) setFollowingStatus(true)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUsersAndTweets();
  }, []);

  const followButton = () => {
    //unfollow
    if(followingStatus){
      axios.post(route + "/api/unfollow", {
        follower: JSON.parse(localStorage.getItem("currUser")).id,
        following : id
      }).then(()=> setFollowingStatus(false)).catch(e=>console.log(e))
    }else{
      axios.post(route + "/api/follow", {
        follower: JSON.parse(localStorage.getItem("currUser")).id,
        following : id
      }).then(()=> setFollowingStatus(true)).catch(e=>console.log(e))
    }
  };
  //if user looks up his own profile he will be redirected to his link for his own profile page
  if (currUser.id === JSON.parse(localStorage.getItem("currUser")).id) {
    navigate("/profile/page");
  }
  return (
    <div id="profilePage">
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
            <button onClick={() => followButton()}>
              {followingStatus ? "Unfollow" : "Follow"}
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
          {allTweets.map((tweet, i) => (
            // Own component
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfile;
