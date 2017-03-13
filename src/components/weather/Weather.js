import React, { Component } from "react";
import Util from "../../util/Util";

class Weather extends Component {
  constructor() {
    super();

    this.state = {
      data: {},
      allowRequest: true,
      supported: true
    }
  }

  componentDidMount() {
    // Get the weather updates
    this.getWeatherRequest();

    // Then, update it every 15 mins
    setInterval( this.getWeatherRequest, 1000 * 60 * 15 );
  }

  getWeatherRequest() {
    // To check if the the browser or device supports geolocation
    if( !navigator.geolocation ) {
      this.setState( {
        supported: false
      } )
    } else {
      navigator.geolocation.getCurrentPosition( ( position ) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        Util.getLocation( latitude, longitude )
            .then( ( locationResponse ) => {
              // Since the first result will return the full approximate address,
              //   we then use the second result.
              // The second result would return the general location.
              const location = locationResponse.data.results[ 1 ][ "formatted_address" ];

              // Get the weather forcast
              Util.getWeatherForecast( latitude, longitude )
                  .then( ( weatherResponse ) => {

                    const weatherDetails = {
                      location: location,
                      details: weatherResponse.data.currently
                    };

                    this.setState( {
                      data: weatherDetails
                    } );

                  } );
            } );

      }, () => {
        this.setState( {
          allowRequest: false
        } );
      } );
    }
  }

  render() {

    const icons = {
      "clear-day": "assets/weather_icons/Sun.svg",
      "clear-night": "assets/weather_icons/Moon.svg",
      "rain": "assets/weather_icons/Cloud-Rain.svg",
      "snow": "assets/weather_icons/Snowflake.svg",
      "sleet": "assets/weather_icons/Cloud-Snow.svg",
      "wind": "assets/weather_icons/Wind.svg",
      "fog": "assets/weather_icons/Cloud-Fog.svg",
      "cloudy": "assets/weather_icons/Cloud.svg",
      "partly-cloudy-day": "assets/weather_icons/Cloud-Sun.svg",
      "partly-cloudy-night": "assets/weather_icons/Cloud-Moon.svg",
      "hail": "assets/weather_icons/Cloud-Hail.svg",
      "thunderstorm": "assets/weather_icons/Cloud-Lightning.svg",
      "tornado": "assets/weather_icons/Tornado.svg"
    };

    if( JSON.stringify( this.state.data ) === JSON.stringify( {} )
        && this.state.allowRequest ) {
      return (
        <div className="weather eight columns">
          <div className="weather-message">
            Fetching weather updates...
          </div>
        </div>
      );
    }

    if( !this.state.allowRequest ) {
      return (
        <div className="weather eight columns">
          <div className="weather-message">
            Please enable geolocation to display weather.
          </div>
        </div>
      );
    }

    if( !this.state.supported ) {
      return (
        <div className="weather eight columns">
          Your device does not support geolocation. Therefore, weather details could not be displayed.
        </div>
      )
    }

    return (
      <div className="weather eight columns">
        <div className="weather-details row">
          <div className="weather-icon-wrapper four columns">
            <img className="weather-icon"
                 src={ icons[ this.state.data.details.icon ] || "assets/weather_icons/Umbrella.svg" } />
          </div>
          <div className="weather-location-summary eight columns">
            <span className="weather-location">
              { this.state.data.location }
            </span>
            <span className="weather-summary">
              { this.state.data.details.summary } with { Math.round( this.state.data.details.temperature ) }&#8451;
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
