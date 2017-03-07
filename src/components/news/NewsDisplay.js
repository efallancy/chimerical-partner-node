import React, { Component } from "react";

class NewsDisplay extends Component {
  render() {
    const title = this.props.article.title;

    // Join the author name since it is in array form
    const authors = this.props.article.authors.join( ", " );
    const date = this.props.article.date;

    // Transform all the content to be inside <p> element
    const contents = this.props.article.contents.map( ( content, key ) => {
      const html = { __html: content }
      return (
        <p dangerouslySetInnerHTML={ html } key={ key } />
      );
    } );

    const url = this.props.article.url;

    return (
      <div className="news-display eight columns">
        <div className="article-title">
          { title }
        </div>
        <div className="article-date">
          { date }
        </div>
        <div className="article-author">
          { authors }
        </div>
        <div className="article-content">
          { contents }
        </div>
        <div className="article-full">
          <a href={ url } target="_blank">See full article...</a>
        </div>
      </div>
    )
  }
}

export default NewsDisplay;
