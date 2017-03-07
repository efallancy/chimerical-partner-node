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
  }
};

module.exports = util;
