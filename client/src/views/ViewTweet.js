import axios from 'axios'
import React, {useState,useEffect} from 'react'
import route from "../utils/server_router"
import { useParams, useNavigate } from "react-router-dom";
import BigTweet from '../components/Tweets/BigTweet';

const ViewTweet = () => {
  const {id} = useParams()
  const [likes, setLikes] = useState([])
  const [tweet, setTweet] = useState({})
  const [replies, setReplies] = useState([])
  useEffect(() => {
   axios.post(route + "/api/view/tweet",{
    id
   }).then(({data}) =>{
    console.log(data);
    setTweet(data.tweet[0])
    setLikes(data.likes)
    setReplies(data.replies)
   } )
  }, [])
  /*
        <div>
            <div>Profice pic</div>
            <div>Names</div>
        </div>

        
        <div>Tweet content</div>
        <div>Date of tweet</div>
        <div>number of likes retweets and comments</div>
        <div>Button for likes retweet and comment</div>

        <div>Area for a reply [Profile pic then tweet area then button]</div>

        <div>Reply area</div>
  */
  return (
    <>
      {tweet.id && <BigTweet 
      tweet = {tweet}
      likes={likes}
      replies={replies}
      />}

    </>
  )
}

export default ViewTweet