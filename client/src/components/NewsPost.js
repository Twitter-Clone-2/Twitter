import React from "react";

export default function NewsArticle({ article }) {
  const { title, url, image, source } = article;
  return (
    <div className="articleContainer">
      <div className="articleTitle">{article.title}</div>
      <img
        className="articleImage"
        src={article.image}
        // alt={article.title}
      />
      <div>{article.source}</div>
    </div>
  );
}
