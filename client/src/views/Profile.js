import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/ProfilePage.css";
import axios from "axios";
import FollowersAndFollowingModal from "../components/FollowersAndFollowingModal";
import Tweet from "../components/Tweets/Tweet";
import route from "../utils/server_router";
import { format } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import EditProfile from "../components/EditProfile";

const Profile = () => {
  let { id } = useParams();
  const [userProfileCheck, setUserProfileCheck] = useState(id ? false : true);
  const [followingStatus, setFollowingStatus] = useState(false);
  let user = JSON.parse(localStorage.getItem("currUser"));

  const [currentUser, setCurrentUser] = useState(user);

  const [editProfile, setEditProfile] = useState(false);
  const [numOfFollowers, setNumOfFollowers] = useState(0);
  const [followersInfo, setFollowersInfo] = useState([]);
  const [numOfFollowing, setNumOfFollowing] = useState(0);
  const [followingInfo, setFollowingInfo] = useState([]);

  const [allTweets, setAllTweets] = useState(0);
  const [feed, setFeed] = useState([]);
  const [likes, setLikes] = useState([]);
  const [replies, setReplies] = useState([]);

  const navigate = useNavigate();

  const grabRelationshipsAndTweets = function (curr_id) {
    axios
      .post(route + "/api/selectAllFollowersAndTheirAccounts", {
        following: curr_id,
      })
      .then((res) => {
        setFollowersInfo(res.data.rows);
        setFollowingStatus(
          res.data.rows.filter((account) => account.id == user.id).length
        );
        setNumOfFollowers(res.data.rows.length);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .post(route + "/api/selectAllFollowingAndTheirAccounts", {
        follower: curr_id,
      })
      .then((res) => {
        setFollowingInfo(res.data.rows);
        setNumOfFollowing(res.data.rows.length);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .post(route + "/api/currUser/tweets", { id: curr_id })
      .then(({ data }) => {
        data.tweets.sort((x, y) => x.created_at - y.created_at);
        data.tweets.reverse();
        setFeed(data.tweets.filter((tweet) => !tweet.reply_id));
        setAllTweets(data.tweets.filter((tweet) => !tweet.reply_id).length);
        setLikes(data.likes);
        setReplies(data.tweets.filter((tweet) => tweet.reply_id));
      })
      .catch((e) => console.log(e));
  };

  const grabUserDetails = function (id) {
    axios
      .post(route + "/api/user", {
        id,
      })
      .then(({ data }) => {
        setCurrentUser(data[0]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (id) {
      if (user.id == id) {
        navigate("/profile/page");
      }
      grabRelationshipsAndTweets(id);
      grabUserDetails(id);
      setUserProfileCheck(false);
    } else {
      grabRelationshipsAndTweets(user.id);
      setUserProfileCheck(true);
    }
  }, [id]);

  const followButton = () => {
    //unfollow
    if (followingStatus) {
      axios
        .post(route + "/api/unfollow", {
          follower: user.id,
          following: id,
        })
        .then(() => {
          setFollowingStatus(false);
          setNumOfFollowers(numOfFollowers - 1);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      axios
        .post(route + "/api/follow", {
          follower: user.id,
          following: id,
        })
        .then(() => {
          setFollowingStatus(true);
          setNumOfFollowers(numOfFollowers + 1);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  return (
    <div id="profilePage">
      <div id="profilePageUser">
        <div id="profilePageHeader">
          <div>
            <h3>
              {currentUser.first_name} {currentUser.last_name}
            </h3>
            <p>{allTweets} tweets</p>
          </div>
        </div>
        <div>
          {/* BIG IMAGE HERE */}
          {/* DELETE THIS DIV WHEN IMAGE IS READY */}
          <div id="tempImage"></div>
          {/* SMALL IMAGE HERE */}
          <div id="bottomOfPicture">
            {currentUser.profile_picture == null ? (
              <PersonIcon sx={{ fontSize: 100 }} className="userPic" />
            ) : (
              <img src={currentUser.profile_picture} className="userPic" />
            )}
            {userProfileCheck ? (
              <div onClick={() => setEditProfile(true)}>
                <EditProfile
                  user={user}
                  setCurrentUser={setCurrentUser}
                  feed={feed}
                  setFeed={setFeed}
                />
              </div>
            ) : (
              <button
                onClick={() => followButton()}
                className={`status ${followingStatus ? "following" : "follow"}`}
              >
                <span id="statusText">
                  {followingStatus ? "Following" : "Follow"}
                </span>
              </button>
            )}
          </div>
          <h2>
            {currentUser.first_name} {currentUser.last_name}
          </h2>
          <p>{currentUser.bio}</p>
          <p>@{currentUser.username}</p>
          <p>Joined , {format(new Date(currentUser.created_at), "PPpp")}</p>
          <div className="flex" id="follows">
            <div>
              <FollowersAndFollowingModal
                num={`${numOfFollowing} Following`}
                relationship={followingInfo}
              />
            </div>
            <div>
              <FollowersAndFollowingModal
                num={`${numOfFollowers} Followers`}
                relationship={followersInfo}
              />
            </div>
          </div>

          <h1>Tweets</h1>
          <hr />
          {feed.map((tweet, i) => (
            <Tweet
              tweet={tweet}
              likes={likes}
              replies={replies}
              key={i}
              id={currentUser.id}
              picture={tweet.profile_picture}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
