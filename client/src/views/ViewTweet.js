import axios from "axios";
import React, { useState, useEffect } from "react";
import route from "../utils/server_router";
import { useParams } from "react-router-dom";
import BigTweet from "../components/Tweets/BigTweet";

const ViewTweet = () => {
  const { id } = useParams();
  const [likes, setLikes] = useState([]);
  const [tweet, setTweet] = useState({});
  const [replies, setReplies] = useState([]);
  const [retweets, setRetweets] = useState([]);
  const [replyLikes, setReplyLikes] = useState([]);
  const [replyReplies, setReplyReplies] = useState([]);
  const [replyRetweets, setReplyRetweets] = useState([]);

  function grabTweet() {
    axios.get(route + "/api/view/tweet/" + id).then(({ data }) => {
      setTweet(data.tweet[0]);
      setLikes(data.likes);
      setReplies(data.replies);
      setRetweets(data.retweets);
      setReplyLikes(data.replyLikes);
      setReplyReplies(data.replyReplies);
      setReplyRetweets(data.replyRetweets);
    });
  }
  useEffect(() => {
    grabTweet();
  }, [id]);

  const currentUserId = JSON.parse(localStorage.getItem("currUser")).id;
  return (
    <>
      {tweet.id && (
        <BigTweet
          tweet={tweet}
          likes={likes}
          retweets={retweets}
          replies={replies}
          replyLikes={replyLikes}
          replyReplies={replyReplies}
          replyRetweets={replyRetweets}
          currentUserId={currentUserId}
          setReplies={setReplies}
          id={id}
          grabTweet={grabTweet}
        />
      )}
    </>
  );
};

export default ViewTweet;
