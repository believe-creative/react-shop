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
        <div class="topbar">
          <div class="container">
            <div class="register-block">
              Hi! <a href="#">Sign in</a> or <a href="#">Register</a>
            </div>
            <div class="topbar-menu">
              <ul class="list-unstyled">
                <li>
                  <a href="#">Daily Deals</a>
                </li>
                <li>
                  <a href="#">Sell</a>
                </li>
                <li>
                  <a href="#">Help &amp; Contact</a>
                </li>
              </ul>
            </div>
            <div class="currency-block">&#163; GBP</div>
            <div class="price-block">
              <a href="">
                <i class="fa fa-shopping-bag" aria-hidden="true" />
              </a>{" "}
              Your bag: &#163;3.99
            </div>
            <div class="clearfix" />
          </div>
        </div>
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
