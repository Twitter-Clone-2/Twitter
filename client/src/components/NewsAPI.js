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
    const url =
      "http://api.mediastack.com/v1/news?access_key=064da5aecefaeb7af36f94210f399862&countries=us&sort=popularity&sources=cnn,espn";
    axios
      .get(url)
      .then(({ data }) => {
        setNews(data.data.filter((article) => article.image));
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
          {news.length === 0 &&
            <div className="newsLoadingSpinner">
              <CircularProgress />
            </div>
          }
          {news.map((article, key) => (
            <NewsArticle key={key} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsAPI;
