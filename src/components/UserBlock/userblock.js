import React, { Component } from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { LinkContainer } from "react-router-bootstrap";
import "../../scss/navbar.scss";
import * as Actions from "../../actions";
import { setCookie, getCookie, deleteCookie } from "../../services/helpers";
import { setUser } from "../../actions";
import Nav from "react-bootstrap/Nav";

class UserBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      cart: {}
    };
  }
  componentDidMount() {
    var c = getCookie("s-atk");
    var state = this.state;
    if (c) {
      this.props.checkUserLogin(c);
    }
  }
  componentWillReceiveProps(props, b, c) {
    if (props.cart) {
      if (props.cart.count) {
        if (!this.state.cart.count) {
          this.props.getCartProducts(props.cart.inCartId);
        } else if (props.cart.count != this.state.cart.count) {
          this.props.getCartProducts(props.cart.inCartId);
        }
        this.setState({ cart: props.cart });
      }
    }
  }
  logout() {
    deleteCookie("s-atk");
    this.props.setUser({ name: null, photo: null });
  }
  render() {
    let name = null;
    let photo = null;
    let totalAmount = 0;
    if (this.props.user) {
      name = this.props.user.name;
    }
    if (this.props.cart) {
      let cart = this.props.cart;
      if (cart.products) {
        for (var i = 0; i < cart.products.length; i++) {
          totalAmount =
            totalAmount + cart.products[i].price * cart.products[i].quantity;
        }
      }
    }
    totalAmount = Math.round(totalAmount * 100) / 100;

    return (
      <div className="topbar">
        <div className="container">
          <div className="register-block">
            Hi!
            {name ? (
              <h6 className="login-name-block">{name}</h6>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>Sign in</Nav.Link>
              </LinkContainer>
            )}
          </div>
          {/* <div className="topbar-menu">
            <ul className="list-unstyled">
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
          <div className="currency-block">&#163; GBP</div> */}

          <div className="price-block">
            <a href="">
              <i className="fa fa-shopping-bag" aria-hidden="true" />
            </a>{" "}
            <span>Your bag: &#163;{totalAmount}</span>
            {name ? (
              <div className="signout-block">
                <LinkContainer to="">
                  <Nav.Link onClick={this.logout.bind(this)}>Logout</Nav.Link>
                </LinkContainer>
              </div>
            ) : (
              <div className="signout-block" />
            )}
          </div>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.get("user"),
    cart: state.get("products").cart
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setUser: user => dispatch(setUser(user)),
    checkUserLogin: token => dispatch(Actions.checkUserLogin.request(token)),
    getCartProducts: token => dispatch(Actions.getCartProducts.request(token))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBlock);
