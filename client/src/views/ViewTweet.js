import axios from "axios";
import React, { useState, useEffect } from "react";
import route from "../utils/server_router";
import { useParams, useNavigate } from "react-router-dom";
import BigTweet from "../components/Tweets/BigTweet";

const ViewTweet = () => {
  const { id } = useParams();
  const [likes, setLikes] = useState([]);
  const [tweet, setTweet] = useState({});
  const [replies, setReplies] = useState([]);
  const [replyLikes, setReplyLikes] = useState([]);
  const [replyReplies, setReplyReplies] = useState([]);

  useEffect(() => {
    axios.get(route + "/api/view/tweet/" + id).then(({ data }) => {
      setTweet(data.tweet[0]);
      setLikes(data.likes);
      setReplies(data.replies);
      setReplyLikes(data.replyLikes);
      setReplyReplies(data.replyReplies);
    });
  }, [id]);
  return (
    <>
      {tweet.id && (
        <BigTweet
          tweet={tweet}
          likes={likes}
          replies={replies}
          replyLikes={replyLikes}
          replyReplies={replyReplies}
        />
      )}
    </>
  );
};

export default ViewTweet;
