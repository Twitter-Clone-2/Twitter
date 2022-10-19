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
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Profile = () => {
  let { id } = useParams();
  const [userProfileCheck, setUserProfileCheck] = useState(id ? false : true);
  const [followingStatus, setFollowingStatus] = useState(false);
  let user = JSON.parse(localStorage.getItem("currUser"));

  const [currentUser, setCurrentUser] = useState();

  const [editProfile, setEditProfile] = useState(false);
  const [numOfFollowers, setNumOfFollowers] = useState(0);
  const [followersInfo, setFollowersInfo] = useState([]);
  const [numOfFollowing, setNumOfFollowing] = useState(0);
  const [followingInfo, setFollowingInfo] = useState([]);

  const [allTweets, setAllTweets] = useState(0);
  const [feed, setFeed] = useState([]);
  const [likes, setLikes] = useState([]);
  const [replies, setReplies] = useState([]);
  const [retweets, setRetweets] = useState([]);
  const [retweetLikes, setRetweetLikes] = useState([]);
  const [retweetReplies, setRetweetReplies] = useState([]);
  const [retweetRetweets, setRetweetRetweets] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      if (user.id == id) {
        navigate("/profile/page");
      }
      grabRelationships(id);
      grabUserDetails(id);
      setUserProfileCheck(false);
      grabTweets(id);
    } else {
      grabRelationships(user.id);
      setUserProfileCheck(true);
      setCurrentUser(user);
      grabTweets(user.id);
    }
  }, [id]);

  const grabTweets = function () {
    axios
      .get(route + "/api/currUser/tweets/" + (id || user.id))
      .then(({ data }) => {
        let tempFeed = [
          ...data.tweets.filter((tweet) => !tweet.reply_id),
          ...data.retweets,
        ];
        setFeed(tempFeed);

        tempFeed
          .sort((x, y) => {
            if (x.retweet_created_at && y.retweet_created_at) {
              return (
                new Date(x.retweet_created_at) - new Date(y.retweet_created_at)
              );
            } else if (x.retweet_created_at) {
              return new Date(x.retweet_created_at) - new Date(y.created_at);
            } else if (y.retweet_created_at) {
              return new Date(x.created_at) - new Date(y.retweet_created_at);
            } else {
              return new Date(x.created_at) - new Date(y.created_at);
            }
          })
          .reverse();
        setAllTweets(tempFeed.length);
        setLikes(data.likes);
        setReplies(data.tweets.filter((tweet) => tweet.reply_id));
        setRetweets(data.retweets);
        setRetweetLikes(data.retweetsData ? data.retweetsData.likes : []);
        setRetweetReplies(data.retweetsData ? data.retweetsData.replies : []);
        setRetweetRetweets(data.retweetsData ? data.retweetsData.retweets : []);
      })
      .catch((e) => console.error(e));
  };
  const grabRelationships = function (curr_id) {
    axios
      .get(route + "/api/selectAllFollowersAndTheirAccounts/" + curr_id)
      .then((res) => {
        setFollowersInfo(res.data.rows);
        setFollowingStatus(
          res.data.rows.filter((account) => account.id == user.id).length
        );
        setNumOfFollowers(res.data.rows.length);
      })
      .catch((e) => {
        console.error(e);
      });

    axios
      .get(route + "/api/selectAllFollowingAndTheirAccounts/" + curr_id)
      .then((res) => {
        setFollowingInfo(res.data.rows);
        setNumOfFollowing(res.data.rows.length);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const grabUserDetails = function (id) {
    axios
      .get(route + "/api/user/details/" + id)
      .then(({ data }) => {
        setCurrentUser(data[0]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

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
            <KeyboardBackspaceIcon
              className="backButton  cursorPointer"
              sx={{ fontSize: 40 }}
              onClick={() => navigate(-1)}
            />
          </div>
          <div className="profilePageHeaderNameAndTweets">
            <h3>
              {currentUser && currentUser.first_name}{" "}
              {currentUser && currentUser.last_name}
            </h3>
            <p>{allTweets} tweets</p>
          </div>
        </div>
        <div>
          {currentUser && currentUser.background_picture ? (
            <img
              src={currentUser.background_picture}
              id="profilePageRealBackgroundImage"
            />
          ) : (
            <div id="tempImage"></div>
          )}
          <div id="bottomOfPicture">
            {currentUser && currentUser.profile_picture ? (
              <img src={currentUser.profile_picture} className="userPic" />
            ) : (
              <PersonIcon sx={{ fontSize: 100 }} className="userPic" />
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
            {currentUser && currentUser.first_name}{" "}
            {currentUser && currentUser.last_name}
          </h2>
          <p>{currentUser && currentUser.bio}</p>
          <p>@{currentUser && currentUser.username}</p>
          <p>
            Joined ,{" "}
            {currentUser && format(new Date(currentUser.created_at), "PPpp")}
          </p>
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
          {currentUser &&
            feed.map((tweet, i) => (
              <Tweet
                tweet={tweet}
                likes={tweet.retweet ? retweetLikes : likes}
                replies={tweet.retweet ? retweetReplies : replies}
                key={i}
                id={currentUser.id}
                picture={tweet.profile_picture}
                currentUserId={user.id}
                fetchAllTweetsForFeed={grabTweets}
                retweets={
                  tweet.retweet
                    ? retweetRetweets.filter(
                        (retweet) => retweet.tweets_id === tweet.tweets_id
                      )
                    : retweets.filter(
                        (retweet) => retweet.tweets_id === tweet.id
                      )
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
