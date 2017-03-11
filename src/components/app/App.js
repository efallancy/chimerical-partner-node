import React, { Component } from "react";
import AppHeader from "./AppHeader";
import AppBody from "./AppBody";

class App extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <AppBody />
      </div>
    );
  }
}

export default App;
