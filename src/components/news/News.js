import React, { Component } from "react";
import NewsHeader from "./NewsHeader";
import NewsAbstract from "./NewsAbstract";
import NewsDisplay from "./NewsDisplay";
import Util from "../../util/Util";

class News extends Component {
  constructor() {
    super();

    // Having to store the categories in a variable would make it easier to maintain
    let categories = [
                        { "home": "Home" },
                        { "opinion": "Opinion" },
                        { "world": "World" },
                        { "national": "National" },
                        { "politics": "Politics" },
                        { "upshot": "Up shot" },
                        { "nyregion": "NY Region" },
                        { "business": "Business" },
                        { "technology": "Technology" },
                        { "science": "Science" },
                        { "health": "Health" },
                        { "sports": "Sports" },
                        { "arts": "Arts" },
                        { "books": "Books" },
                        { "movies": "Movies" },
                        { "theater": "Theater" },
                        { "sundayreview": "Sunday Review" },
                        { "fashion": "Fashion" },
                        { "tmagazine": "Times Magazine" },
                        { "food": "Food" },
                        { "travel": "Travel" },
                        { "magazine": "Magazine" },
                        { "realestate": "Real Estate" },
                        { "automobiles": "Automobiles" },
                        { "obituaries": "Obituaries" },
                        { "insider": "Insider" }
                      ];

    // Initialise the state
    this.state = {
      newsCategories: categories,
      currentNewsCategory: "",
      data: [],
      articleDisplay: false,
      articleDetails: {},
      imageFallback : ""
    }
  }

  componentDidMount() {
    // Getting the key identifier to be used for NYTimes API endpoint
    let initial = "";

    for( var identifier in this.state.newsCategories[ 0 ] ) {
      initial = identifier;
    }

    // This will initially make a request to the NYTimes API to render the news
    Util.getNewsListFromNYTimes( initial )
        .then( ( response ) => {

          this.setState( {
            currentNewsCategory: response.data[ "section" ],
            data: response.data[ "results" ]
          } );
        } );

    // This shall get the image fallback for the thumbnail
    Util.getGiphyFallbackImage()
        .then( ( response ) => {

          this.setState( {
            imageFallback: response.data.data[ "image_original_url" ]
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

            this.setState( {
              articleDisplay: true,
              articleDetails: response.data
            } );
          }

        } );

  }

  componentDidUpdate() {
    // This is being used to scroll to the top of the news list after every rendering
    document.querySelector( ".news-abstract-list" ).scrollTop = 0;
  }

  render() {
    const unsplashStyle = {
      backgroundImage: 'url( "https://source.unsplash.com/random" )'
    };

    let newsAbstract = ( <div className="news-message">Fetching news...</div> );

    if( this.state.data.length ) {
      newsAbstract = this.state.data.map( ( news, key ) => {
                        return ( <NewsAbstract
                                    news={ news }
                                    imageFallback={ this.state.imageFallback }
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
              { newsAbstract }
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
            { newsAbstract }
          </div>
        </div>
        <div className="news-display eight columns" style={ unsplashStyle } />
      </div>
    )

  }
}

export default News;
