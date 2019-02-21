import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { connect } from "react-redux";

import "./scss/App.scss";
import { ConnectedRouter } from "connected-react-router/immutable";
import routes from "./routes";
import * as Actions from "./actions";

class App extends Component {
  componentDidMount() {
    this.props.productRequest();
  }
  render() {
    return (
      <div className="App">
        <ConnectedRouter history={this.props.history}>{routes}</ConnectedRouter>
      </div>
    );
  }
}

const productRequest = Actions.products.request;

const mapStateToProps = state => ({
  isProductsLoading: state.products.isLoading,
  products: state.products.products
});

const mapDispatchToProps = {
  productRequest
};

export default connect(
  null,
  mapDispatchToProps
)(App);
