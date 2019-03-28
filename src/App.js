import React, { Component } from "react";
import { connect } from "react-redux";

import "./scss/App.scss";
import { ConnectedRouter } from "connected-react-router/immutable";
import routes from "./routes";
import * as Actions from "./actions";
import { getCookie } from "./services/helpers";
import { BarLoader } from "react-spinners";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { token: "null", loaded: true };
    this.handleLoad = this.handleLoad.bind(this);
  }
  componentDidMount() {
    var c = getCookie("s-atk");
    if (c) {
      this.props.checkUserLogin(c);
    }
    this.props.getToken();
    window.addEventListener("load", this.handleLoad);
  }
  handleLoad() {
    this.setState({ loaded: false });
  }
  componentWillReceiveProps(props, b, c) {
    if (props.token) {
      if (this.state.token !== props.token) {
        this.setState({ token: props.token });
        if (!this.props.categories)
          this.props.getCategories({ token: props.token });
      }
    }
    let localCart = JSON.parse(localStorage.getItem("react-shop-cart"));
    if (localCart != null) {
      if (this.state.cart === null || this.state.cart === undefined) {
        this.props.getCartProducts({
          token: props.token,
          inCartId: localCart.inCartId
        });
      } else if (props.cart.count !== this.state.cart.count) {
        this.props.getCartProducts({
          token: props.token,
          inCartId: props.cart.inCartId
        });
      }
      this.setState({ cart: props.cart });
    }
  }
  render() {
    if (
      this.state.loaded === true &&
      this.props.categories &&
      this.props.token
    ) {
      return (
        <BarLoader
          sizeUnit={"px"}
          size={150}
          color={"#36D7B7"}
          height={4}
          width={window.innerWidth}
          loaded={this.state.loaded}
        >
          {this.handleLoad}
        </BarLoader>
      );
    } else {
      if (
        this.props.categories &&
        this.props.categories.length > 0 &&
        this.props.token
      ) {
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
}

const productRequest = Actions.products.request;
const checkUserLogin = Actions.checkUserLogin.request;

const mapStateToProps = state => ({
  categories: state.get("products").categories,
  cart: state.get("products").cart,
  token: state.get("user").token
});

const mapDispatchToProps = dispatch => ({
  productRequest,
  checkUserLogin,
  getCategories: data => dispatch(Actions.getCategories.request(data)),
  getCartProducts: inCartId =>
    dispatch(Actions.getCartProducts.request(inCartId)),
  getToken: () => dispatch(Actions.getToken.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
