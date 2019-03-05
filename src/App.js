import React, { Component } from "react";
import { connect } from "react-redux";

import "./scss/App.scss";
import { ConnectedRouter } from "connected-react-router/immutable";
import routes from "./routes";
import * as Actions from "./actions";
import { getCookie} from "./services/helpers";

class App extends Component {
  constructor(props)
  {
      super(props);
      this.state={token:"null"}
  }
  componentDidMount() {
    // var c = getCookie("s-atk");
    // if (c) {
    //   this.props.checkUserLogin(c);
    // }
    //this.props.loadCategories({token});
    // let cart = localStorage.getItem("react-shop-cart");
    // if (cart) {
    //   cart = JSON.parse(cart);
    //   this.props.getCartProducts(cart.inCartId);
    // }
    // productRequest();
    var c = getCookie("s-atk");
    if (c) {
      this.props.checkUserLogin(c);
    }
    this.props.getToken();
  }
  componentWillReceiveProps(props, b, c) {
    if (props.token) {
      if(this.state.token!=props.token)
      {
        this.setState({token:props.token});
        console.log(props);
        if(!this.props.categories)
          this.props.getCategories({token:props.token});
        // let cart = localStorage.getItem("react-shop-cart");
        // if (cart) {
        //   cart = JSON.parse(cart);
        //   this.props.getCartProducts(cart.inCartId);
        // }
        // productRequest();
      }
      
    }
  }
  render() {
    if (this.props.categories && this.props.categories.length > 0 && this.props.token) {
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
  cart: state.get("products").cart,
  token: state.get("user").token
});

const mapDispatchToProps = dispatch => ({
  productRequest,
  checkUserLogin,
  getCategories: (data) => dispatch(Actions.getCategories.request(data)),
  getCartProducts: inCartId =>
    dispatch(Actions.getCartProducts.request(inCartId)),
    getToken:() => dispatch(Actions.getToken.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
