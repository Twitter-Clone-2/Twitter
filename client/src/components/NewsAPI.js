import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NewsArticle from "./NewsPost";
import "../CSS/News.css";

const NewsAPI = () => {
  const [news, setNews] = useState([]);
  const { pathname } = useLocation();
  const displayNews =
    pathname !== "/" &&
    pathname !== "/login" &&
    pathname !== "/register" &&
    pathname !== "/messages";

  const fetchNews = () => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=b8f02497506e4c19a569bd0487e8ace0"
      )
      .then(({ data }) => {
        setNews(data.articles.slice(0, 7));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <div className="newsComponentTitle">What's happening?</div>
      {displayNews && (
        <div id="newsContainer">
          {news.length === 0 && <CircularProgress />}
          {news.map((article, key) => (
            <NewsArticle key={key} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsAPI;
