import React, { Component } from "react";
import { Route, Switch } from "react-router";

import "./scss/App.scss";
import { ConnectedRouter } from "connected-react-router/immutable";
import routes from "./routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ConnectedRouter history={this.props.history}>
          <Switch>{routes}</Switch>
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
