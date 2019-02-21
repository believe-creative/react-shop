import React, { Component } from "react";
import "./scss/App.scss";
import Home from "./components/Home/home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
