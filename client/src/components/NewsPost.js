import React from "react";

export default function NewsArticle({ article }) {
  function fixTitle() {
    const { title } = article;
    let start = title?.indexOf(" - ");
    let correctTitle = title?.slice(0, start);

    return correctTitle;
  }

  return (
    <div className="articleContainer">
      <div className="articleTitle">{fixTitle()}</div>
      <img
        className="articleImage"
        src={article.urlToImage}
        alt={article.articleTitle}
      />
      <div>{article.source.name}</div>
    </div>
  );
}
