import React, { Component } from "react";
import News from "../news/News";
import Display from "../display/Display";

class App extends Component {
  render() {
    return (
      <div className="row">
        <News />
      </div>
    );
  }
}

export default App;
