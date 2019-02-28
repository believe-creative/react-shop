import React, { Component } from "react";
import { connect } from "react-redux";

import "./scss/App.scss";
import { ConnectedRouter } from "connected-react-router/immutable";
import routes from "./routes";
import * as Actions from "./actions";
import { getCookie} from "./services/helpers";

class App extends Component {
  componentDidMount() {
    var c = getCookie("s-atk");
    if (c) {
      this.props.checkUserLogin(c);
    }
    this.props.loadCategories();
    let cart = localStorage.getItem("react-shop-cart");
    if (cart) {
      cart = JSON.parse(cart);
      this.props.getCartProducts(cart.inCartId);
    }
    productRequest();
  }

  render() {
    if (this.props.categories && this.props.categories.length > 0) {
      return (
        <div className="App">
          <ConnectedRouter
            history={this.props.history}
            getcategories={this.props.categories}
          >
            {routes}
          </ConnectedRouter>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const productRequest = Actions.products.request;
const checkUserLogin = Actions.checkUserLogin.request;

const mapStateToProps = state => ({
  categories: state.get("products").categories,
  cart: state.get("products").cart
});

const mapDispatchToProps = dispatch => ({
  productRequest,
  checkUserLogin,
  loadCategories: () => dispatch(Actions.getCategories.request()),
  getCartProducts: inCartId =>
    dispatch(Actions.getCartProducts.request(inCartId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
