import axios from "axios";

const util = {
  getNewsListFromNYTimes: ( categories = "home" ) => {
    let endpoint = "/news/categories";
    let query = `?categories=${ categories }`;

    return axios( endpoint + query );
  },
  getNewsArticleFromNYTimes: ( url ) => {
    let endpoint = "/news/result";
    let query = `?url=${ url }`;

    return axios( endpoint + query );
  },
  getGiphyFallbackImage: () => {

    // Make a request to the Giphy API Endpoint
    return axios( "http://api.giphy.com/v1/stickers/random?api_key=dc6zaTOxFJmzC&tag=oops" );
  }
};

module.exports = util;
