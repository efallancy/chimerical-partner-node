import React, { Component } from "react";

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

    const styleAbstractImage = {
      backgroundImage: `url( ${ imageDetails } )`
    };

    const imageElement = ( <div className="news-abstract-thumbnail"
                                style={ styleAbstractImage }
                           /> );

    const colourPalette = [ "#25CED1", "#87B37A", "#EF476F", "#FFD166", "#EF6461", "#30BCED" ];

    const styleColourPalette = {
      backgroundColor: `${ colourPalette[ Math.floor( Math.random() * colourPalette.length ) ] }`
    };

    return (
      <div className="news-abstract-details" style={ styleColourPalette }>
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

// Props Validation
NewsAbstract.propTypes = {
  news: React.PropTypes.object,
  imageFallback: React.PropTypes.string,
  onclick: React.PropTypes.func
};

export default NewsAbstract;
