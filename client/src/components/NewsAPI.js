import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NewsArticle from "./NewsPost";
import "../CSS/News.css";
import FindAUserModal from "./FindAUserModal";
import route from "../utils/server_router";

const NewsAPI = () => {
  const [news, setNews] = useState([]);
  const [allAccounts, setAllAccounts] = useState([]);

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

  useEffect(() => {
    axios
      .get(route + "/api/users")
      .then((res) => setAllAccounts(res.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div id="mainNewsContainer">
      {displayNews && (
        <>
          <FindAUserModal
            allAccounts={allAccounts}
            setAllAccounts={setAllAccounts}
          />
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
