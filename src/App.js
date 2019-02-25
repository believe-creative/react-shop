import React, { Component } from "react";
import { connect } from "react-redux";

import "./scss/App.scss";
import { ConnectedRouter } from "connected-react-router/immutable";
import routes from "./routes";
import * as Actions from "./actions";
import { setCookie, getCookie, deleteCookie } from "./services/helpers";

class App extends Component {
  componentDidMount() {
    var c = getCookie("s-atk");
    if (c) {
      this.props.checkUserLogin(c);
    }
    this.props.loadCategories();
  }

  render() {
    console.log("getCategories", this.props);
    return (
      <div className="App">
        <ConnectedRouter history={this.props.history}>{routes}</ConnectedRouter>
      </div>
    );
  }
}

const productRequest = Actions.products.request;
const checkUserLogin = Actions.checkUserLogin.request;

const mapStateToProps = state => ({
  isProductsLoading: state.products.isLoading,
  products: state.products.products
});

const mapDispatchToProps = dispatch => ({
  productRequest,
  checkUserLogin,
  loadCategories: () => dispatch(Actions.getCategories.request())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
