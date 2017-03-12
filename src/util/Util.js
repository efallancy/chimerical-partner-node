import axios from "axios";

const util = {
  getNewsListFromNYTimes: ( categories = "home" ) => {
    const endpoint = "/news/categories";
    const query = `?categories=${ categories }`;

    return axios( endpoint + query );
  },
  getNewsArticleFromNYTimes: ( url ) => {
    const endpoint = "/news/result";
    const query = `?url=${ url }`;

    return axios( endpoint + query );
  },
  getGiphyFallbackImage: () => {

    // Make a request to the Giphy API Endpoint
    return axios( "https://api.giphy.com/v1/stickers/random?api_key=dc6zaTOxFJmzC" );
  },
  getWeatherForecast: ( lat, lng ) => {

    const latitude = lat;
    const longitude = lng;
    const endpoint = "/weather_forecast";
    const query = `?lat=${ latitude }&lng=${ longitude }`;

    return axios( endpoint + query )
  },
  getLocation: ( lat, lng ) => {
    const latitude = lat;
    const longitude = lng;
    const endpoint = "/location";
    const query = `?lat=${ latitude }&lng=${ longitude }`;

    return axios( endpoint + query )
  }
};

module.exports = util;
