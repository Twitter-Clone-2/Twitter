import React from "react";

export default function NewsArticle({ article }) {
  const { title, media, url } = article;
  const image = media[0]["media-metadata"][2].url;

  return (
    <a className="articleLink" href={url}>
      <div className="articleContainer">
        <div className="articleTitle">{title}</div>
        <img className="articleImage" src={image} alt={title} />
        <div>{article.byline}</div>
      </div>
    </a>
  );
}
