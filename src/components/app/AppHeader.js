import React, { Component } from "react";
import Title from "../title/Title";
import Weather from "../weather/Weather";

class AppHeader extends Component {
  render() {
    return (
      <div className="row">
        <Title />
        <Weather />
      </div>
    );
  }
}

export default AppHeader;
