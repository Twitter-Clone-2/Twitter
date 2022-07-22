import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../CSS/Feed.css";
const NewsAPI = () => {
  const [news, setNews] = useState([]);
  const { pathname } = useLocation();
  const displayNews =
    pathname !== "/" && pathname !== "/login" && pathname !== "/register" && pathname !== "/messages";

  // Retrieving NY times news from api
  const axiosNews = () => {
    const newsCatcher = [];
    axios
      .get(
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=Uh8kclNaPnGtLJAhGbU5hTStY36qZz8z"
      )
      .then((res) => {
        for (let i = 0, count = 0; count < 8; i++) {
          if (res.data.response.docs[i].headline.print_headline.length < 200) {
            newsCatcher.push(res.data.response.docs[i]);
            count++;
          }
        }
        setNews(newsCatcher);
      })
      .catch((err) => console.log(err));
  };

  // useEffect
  useEffect(() => {
    axiosNews();
  }, []);

  return (
    <>
      {displayNews && (
        <div id="news">
          {news.map((headline, idx) => {
            return (
              <div className="news-box" key={idx}>
                <h2 className="news-title">
                  {" "}
                  {news[idx].headline.print_headline}{" "}
                </h2>
                <h5 className="news-feed"> {news[idx].headline.main} </h5>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default NewsAPI;
