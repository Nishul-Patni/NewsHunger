import { getByTitle } from "@testing-library/react";
import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, url, urlToImage, author, publishedAt, source} =
      this.props.data;
    return (
      <div className="card my-3 w-30">
        <span className="position-absolute translate-middle badge rounded-pill bg-danger" style={{zIndex:1, color:"white"}}>
          {source.name}
        </span>
        <img src={urlToImage} className="card-img-top" alt="news img" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {author} {publishedAt}
            </small>
          </p>
          <a href={url} className="btn btn-primary">
            Read More
          </a>
        </div>
      </div>
    );
  }
}
