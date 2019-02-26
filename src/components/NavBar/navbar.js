import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../../images/tshirtshop.png";
import Image from "react-bootstrap/Image";
import * as Actions from "../../actions";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Cart from "../Cart/cart";
import { connect } from "react-redux";

import "../../scss/navbar.scss";
class NavBar extends Component {
  componentDidMount() {
    // let cart = localStorage.getItem("react-shop-cart");
    // if (cart) {
    //   cart = JSON.parse(cart);
    //   console.log(cart.inCartId);
    //   this.props.getCartProducts(cart.inCartId);
    // }
  }
  render() {
    let { cart } = this.props;
    if (!cart) cart = { count: 0 };
    return (
      <header className="header bg-white">
        <Container className="head-inner">
          <div className="logo_block">
            <LinkContainer className="logo" to="/">
              <Image
                src={logo}
                className="justify-content-start nav-logo"
                fluid
              />
            </LinkContainer>
          </div>
          <Navbar className="" expand="lg">
            <Navbar.Toggle
              data-toggle="collapse"
              data-target="#basic-navbar-nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              aria-controls="basic-navbar-nav"
            />
            <Navbar.Collapse id="basic-navbar-nav" className="">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0 list-unstyled">
                {this.props.categories &&
                  this.props.categories.map(category => {
                    var link = "/categories/" + category.name.toLowerCase();
                    return (
                      <li className="nav-item" key={category.name}>
                        <LinkContainer to={link}>
                          <Nav.Link>{category.name}</Nav.Link>
                        </LinkContainer>
                      </li>
                    );
                  })}
              </ul>
            </Navbar.Collapse>
          </Navbar>
          <div className="head-right">
            <ul className="list-unstyled">
              <li>
                <span className="search_input">
                  <form id="search_icon">
                    <input type="search" placeholder="" className="search" />
                  </form>
                </span>
              </li>
              <li>
                <LinkContainer to={"/cart"} className="">
                  <a>
                    <Cart cartItems={cart.count} />
                  </a>
                </LinkContainer>
              </li>
            </ul>
          </div>
          <div className="clearfix" />
        </Container>
      </header>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.get("products").categories);
  return {
    categories: state.get("products").categories,
    cart: state.get("products").cart
  };
};

const mapStateToDispatch = dispatch => ({
  getCartProducts: inCartId =>
    dispatch(Actions.getCartProducts.request(inCartId))
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(NavBar);
