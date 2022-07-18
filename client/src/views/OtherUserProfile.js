import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import "../CSS/ProfilePage.css";
import axios from "axios";
import Logout from "../components/Logout";
import { useParams, useNavigate } from "react-router-dom";
import route from "../utils/server_router";
import FollowersAndFollowingModal from "../components/FollowersAndFollowingModal";
import Tweet from "../components/Tweets/Tweet";

const OtherUserProfile = () => {
  const [allTweets, setAllTweets] = useState(0);
  const [currUser, setCurrUser] = useState({});
  const [followingStatus, setFollowingStatus] = useState(false);
  const [numOfFollowers , setNumOfFollowers] = useState(0);
  const [followersInfo, setFollowersInfo] = useState([])
  const [numOfFollowing , setNumOfFollowing] = useState(0);
  const [followingInfo, setFollowingInfo] = useState([]);
  const [feed, setFeed] = useState([]);
  const [likes, setLikes] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getUsersAndTweets = () => {
    axios
      .post(route + "/api/user", {
        id
      })
      .then(({ data }) => {
        setCurrUser(data[0]);
      })
      .catch((e) => {
        console.log(e);
      });

      axios.post(route + "/api/currUser/tweets", { id })
      .then(({ data }) => {
        data.tweets.sort((x, y) => x.created_at - y.created_at)
        data.tweets.reverse();
        setFeed(data.tweets);
        setLikes(data.likes);
        setAllTweets(data.tweets.length)
      })
      .catch((e) => console.log(e));
    
      axios.post(route + "/api/findAllRelationships", {
        follower : id,
        following : id
      })
      .then(res =>{
        let followerCount = 0;
        let followingCount = 0;
        for(let i = 0; i < res.data.rows.length; i++){
          if(res.data.rows[i].following == id ){
            followerCount++;
            setNumOfFollowers(followerCount);
          }else if(res.data.rows[i].follower == id){
            followingCount++;
            setNumOfFollowing(followingCount);
          }

          if((res.data.rows[i].following == id && res.data.rows[i].follower == JSON.parse(localStorage.getItem("currUser")).id) ){
            setFollowingStatus(true);
          }
        }
      })
      .catch(e=>console.log(e))
  };
  useEffect(() => {
    getUsersAndTweets();
  }, []);

  useEffect(()=>{
    axios.post(route + "/api/selectAllFollowersAndTheirAccounts",{
      following : id
    }).then(res=>{
      console.log(`SELECT ALL FOLLOWERS ${JSON.stringify(res.data.rows)}`);
      setFollowersInfo(res.data.rows)
    }).catch(e=>{
      console.log(e);
    })

    axios.post(route + "/api/selectAllFollowingAndTheirAccounts",{
      follower : id
    }).then(res=>{
      setFollowingInfo(res.data.rows)
    }).catch(e=>{
      console.log(e);
    })
  },[followingStatus])

  const followButton = () => {
    //unfollow
    if(followingStatus){
      axios.post(route + "/api/unfollow", {
        follower: JSON.parse(localStorage.getItem("currUser")).id,
        following : id
      }).then(()=> {
        setFollowingStatus(false)
        setNumOfFollowers(numOfFollowers - 1)
      }).catch(e=>{
        console.log(e)
      })
    }else{
      axios.post(route + "/api/follow", {
        follower: JSON.parse(localStorage.getItem("currUser")).id,
        following : id
      }).then(()=> {
        setFollowingStatus(true)
        setNumOfFollowers(numOfFollowers + 1)
      }).catch(e=>{
        console.log(e)
      })
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
          {feed.map((tweet, i) => <Tweet tweet={tweet} likes={likes} key={i} />)}
        </div>
      </div>
    </div>
  );
};  

export default OtherUserProfile;
