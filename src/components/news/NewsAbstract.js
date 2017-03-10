import React, { Component } from "react";
import Util from "../../util/Util";

class NewsAbstract extends Component {
  render() {
    const totalImages = this.props.news.multimedia.length || 0;
    const title = this.props.news.title;
    const abstract = this.props.news.abstract;
    const author = this.props.news.byline;
    const imageDetails = totalImages ?
                         this.props.news.multimedia[ totalImages - 1 ].url :
                         this.props.imageFallback;
    const articleUrl = this.props.news.url;

    let style = {
      backgroundImage: `url( ${ imageDetails } )`
    };

    const imageElement = ( <div className="news-abstract-thumbnail"
                                style={ style }
                           /> );

    return (
      <div className="news-abstract-details" >
        { imageElement }
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
    )
  }
}

export default NewsAbstract;
