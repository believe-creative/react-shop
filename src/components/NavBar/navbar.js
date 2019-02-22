import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import { Switch, Route } from "react-router";
import Container from "react-bootstrap/Container";
import logo from "../../images/tshirtshop.png";
import Image from "react-bootstrap/Image";
import { LinkContainer, Link } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "../../scss/navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import Cart from "../Cart/cart";
export default class NavBar extends Component {
  render() {
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
                <li className="nav-item">
                  <LinkContainer to="/women">
                    <Nav.Link>Women</Nav.Link>
                  </LinkContainer>
                </li>

                <li className="nav-item">
                  <LinkContainer to="/men">
                    <Nav.Link eventKey="men">Men</Nav.Link>
                  </LinkContainer>
                </li>
                <li className="nav-item">
                  <LinkContainer to="/kids">
                    <Nav.Link eventKey="women">Women</Nav.Link>
                  </LinkContainer>
                </li>
                <li className="nav-item">
                  <LinkContainer to="/shoes">
                    <Nav.Link eventKey="shoes">Shoes</Nav.Link>
                  </LinkContainer>
                </li>
                <li className="nav-item">
                  <LinkContainer to="/brands">
                    <Nav.Link eventKey="brands">Brands</Nav.Link>
                  </LinkContainer>
                </li>
              </ul>
            </Navbar.Collapse>
          </Navbar>
          <div className="head-right">
            <ul className="list-unstyled">
              <li>
                <a href="">
                  <FontAwesomeIcon icon={faSearch} />
                </a>
              </li>
              <li>
                <a href="">
                  <FontAwesomeIcon icon={faShoppingBag} />
                </a>
                <Route exact path="/cart" component={Cart} />
              </li>
            </ul>
          </div>
          <div className="clearfix" />
        </Container>
      </header>
    );
  }
}
