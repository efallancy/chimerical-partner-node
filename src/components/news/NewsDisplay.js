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
        <div className="news-display-wrapper">
          <div className="article-title" dangerouslySetInnerHTML={ { __html: title } } />
          <div className="article-author">
            By { authors }
          </div>
          <div className="article-date">
            { date }
          </div>
          <div className="article-content">
            { contents }
          </div>
          <div className="article-full">
            <a href={ url } target="_blank">See original article...</a>
          </div>
        </div>
      </div>
    )
  }
}

// Props Validation
NewsDisplay.propTypes = {
  article: React.PropTypes.object
};

export default NewsDisplay;
