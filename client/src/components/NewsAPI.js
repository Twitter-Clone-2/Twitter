import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NewsArticle from "./NewsPost";
import "../CSS/News.css";
import FindAUserModal from "./FindAUserModal";

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
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=QiiGRmEBFONox7btatJfgvjB7aFiEc3y";
    axios
      .get(url)
      .then(({ data }) => {
        setNews(data.results.filter((article) => article.media.length));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div id="mainNewsContainer">
      {displayNews && (
        <>
          <FindAUserModal />
          <div className="newsComponentTitle">What's happening?</div>
          <div id="newsArticlesContainer">
            {news.length === 0 && (
              <div className="newsLoadingSpinner">
                <CircularProgress />
              </div>
            )}
            {news.map((article, key) => (
              <NewsArticle key={key} article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NewsAPI;
