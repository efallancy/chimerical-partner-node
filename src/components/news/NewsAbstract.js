import React, { Component } from "react";

class NewsAbstract extends Component {
  render() {
    let title = this.props.news.title;
    let abstract = this.props.news.abstract;
    let author = this.props.news.byline;
    let imageDetails = this.props.news.multimedia.length ? this.props.news.multimedia[ 1 ].url : "";
    let imageElement = ( <div>No image</div> );
    let articleUrl = this.props.news.url;


    if( imageDetails ) {
      imageElement = ( <img src={ imageDetails } /> );
    }

    return (
      <div className="news-abstract row">
        <div className="news-abstract-thumbnail two columns">
          { imageElement }
        </div>
        <div className="news-abstract-details ten columns">
          <div className="news-abstract-title" data-role={ articleUrl } onClick={ this.props.onclick }>
            { title }
          </div>
          <div className="news-abstract-abstract">
            { abstract }
          </div>
          <div className="news-abstract-author">
            { author }
          </div>
        </div>
      </div>
    )
  }
}

export default NewsAbstract;
