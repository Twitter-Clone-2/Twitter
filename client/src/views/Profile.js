import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/ProfilePage.css";
import axios from "axios";
import Logout from "../components/Logout";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import EditProfile from "../components/EditProfile";
import Settings from "../components/Settings";
import FollowersAndFollowingModal from "../components/FollowersAndFollowingModal";
import Tweet from "../components/Tweets/Tweet";
import route from "../utils/server_router";

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [settings, setSettings] = useState(false);
  const [allTweets, setAllTweets] = useState(0);
  const user = JSON.parse(localStorage.getItem("currUser"));
  const [numOfFollowers , setNumOfFollowers] = useState(0);
  const [followersInfo, setFollowersInfo] = useState([])
  const [numOfFollowing , setNumOfFollowing] = useState(0);
  const [followingInfo, setFollowingInfo] = useState([])

  const [feed, setFeed] = useState([]);
  const [likes, setLikes] = useState([]);
// hi
  useEffect(() => {

      axios.post(route + "/api/selectAllFollowersAndTheirAccounts",{
        following : user.id
      }).then(res=>{
        setFollowersInfo(res.data.rows)
      }).catch(e=>{
        console.log(e);
      })

      axios.post(route + "/api/selectAllFollowingAndTheirAccounts",{
        follower : user.id
      }).then(res=>{
        setFollowingInfo(res.data.rows)
      }).catch(e=>{
        console.log(e);
      })

      axios.post(route + "/api/findAllRelationships", {
        follower : user.id,
        following : user.id
      })
      .then(res =>{
        let followerCount = 0;
        let followingCount = 0;
        for(let i = 0; i < res.data.rows.length; i++){
          if(res.data.rows[i].following == user.id ){
            followerCount++;
            setNumOfFollowers(followerCount);
          }else if(res.data.rows[i].follower == user.id){
            followingCount++;
            setNumOfFollowing(followingCount);
          }
        }
      })
      .catch(e=>console.log(e))

      axios.post(route + "/api/currUser/tweets", { id : user.id })
      .then(({ data }) => {
        data.tweets.sort((x, y) => x.created_at - y.created_at)
        data.tweets.reverse();
        setFeed(data.tweets.filter((tweet) => !tweet.reply_id));
        setAllTweets(data.tweets.filter((tweet) => !tweet.reply_id).length)
        setLikes(data.likes);
        console.log(feed);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div id="profilePage">
      <div id="profilePageUser">
        {/* HEADER OF USER PROFILE */}
        <div id="profilePageHeader">
          <div>
            <h3>
              {user.first_name} {user.last_name}
            </h3>
            <p>{allTweets} tweets</p>
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
            {user.first_name} {user.last_name}
          </h2>
          <p>{user.bio}</p>
          <p>@{user.username}</p>
          <p>joined , {user.created_at}</p>
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
          {feed.map((tweet, i) => <Tweet tweet={tweet} likes={likes} key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
