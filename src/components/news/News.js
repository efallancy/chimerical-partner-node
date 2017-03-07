import React, { Component } from "react";
import NewsHeader from "./NewsHeader";
import NewsAbstractList from "./NewsAbstractList";
import NewsAbstract from "./NewsAbstract";
import NewsDisplay from "./NewsDisplay";
import Util from "../../util/Util";

class News extends Component {
  constructor() {
    super();

    // Having to store the categories in a variable would make it easier to maintain
    let categories = [ "home", "opinion", "world", "national", "politics", "technology" ];

    this.state = {
      newsCategories: categories,
      currentNewsCategory: "",
      data: [],
      articleDisplay: false,
      articleDetails: {}
    }
  }

  componentWillMount() {
    // This will initially make a request to the NYTimes API to render the news
    Util.getNewsListFromNYTimes( this.state.newsCategories[ 0 ] )
        .then( ( response ) => {

          this.setState( {
            currentNewsCategory: response.data[ "section" ],
            data: response.data[ "results" ]
          } );
        } );
  }

  handleSelectionChange( event ) {
    const categoryName = event.target.value;

    // Make request to NYTimes using axios
    // Set the state to keep track of the category selected
    Util.getNewsListFromNYTimes( categoryName )
        .then( ( response ) => {

          this.setState( {
            articleDisplay: false,
            currentNewsCategory: response.data[ "section" ],
            data: response.data[ "results" ]
          } );
        } );
  }

  handleOnClickNewsAbstract( event ) {
    // This function will only be used and set to the title of the news abstract
    const url = event.target.getAttribute( "data-role" );

    if( window.innerWidth < 500 ) {
      // Will open in new tab because the news display section will be hidden
      //  For mobile user
      window.open( url, "_blank" );
    }


    Util.getNewsArticleFromNYTimes( url )
        .then( ( response ) => {
          if( !response.data[ "error" ] ) {
            console.log( this );

            this.setState( {
              articleDisplay: true,
              articleDetails: response.data
            } );
          }

        } );

  }

  render() {
    let newsabstract = ( <div>Rendering news</div> );

    if( this.state.data ) {
      newsabstract = this.state.data.map( ( news, key ) => {
                        return ( <NewsAbstract
                                    news={ news }
                                    onclick={ this.handleOnClickNewsAbstract.bind( this ) }
                                    key={ key } /> );
                      } );
    }

    // Only when there is article to be displayed, then render it in this way.
    // This shall make way to display the article in summary form.
    if( this.state.articleDisplay ) {
      return (
        <div className="news row">
          <div className="news-list four columns">
            <NewsHeader
              categories={ this.state.newsCategories }
              onchange={ this.handleSelectionChange.bind( this ) } />
            <div className="news-abstract-list">
              { newsabstract }
            </div>
          </div>
          <NewsDisplay article={ this.state.articleDetails }/>
        </div>
      );
    }

    return (
      <div className="news row">
        <div className="news-list four columns">
          <NewsHeader
            categories={ this.state.newsCategories }
            onchange={ this.handleSelectionChange.bind( this ) } />
          <div className="news-abstract-list">
            { newsabstract }
          </div>
        </div>
        <div className="news-display eight columns">
          <div className="unsplash">
            <img src="https://source.unsplash.com/random" />
          </div>
        </div>
      </div>
    )

  }
}

export default News;
