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
  componentDidMount() {}
  render() {
    console.log(this.props);
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
                <a href="/cart">
                  <Cart cartItems={"6"} />
                </a>
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
    categories: state.get("products").categories
  };
};

const mapStateToDispatch = dispatch => ({
  loadCategories: () => dispatch(Actions.getCategories.request())
});

export default connect(
  mapStateToProps,
  null
)(NavBar);
