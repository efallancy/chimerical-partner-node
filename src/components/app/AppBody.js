import React, { Component } from "react";
import News from "../news/News";

class AppBody extends Component {
  render() {
    return (
      <div className="row">
        <News />
      </div>
    );
  }
}

export default AppBody;
