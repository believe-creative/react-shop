import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../../images/tshirtshop.png";
import Image from "react-bootstrap/Image";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "../../scss/navbar.scss";

export default class NavBar extends Component {
  render() {
    return (
      <header className="header bg-white">
        <Container>
          <div className="logo_block">
            <a className="logo" to="/">
              <Image
                src={logo}
                className="justify-content-start nav-logo"
                fluid
              />
            </a>
          </div>
          <Navbar className="" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="">
              <Nav.Item>
                <LinkContainer to="/women">
                  <Nav.Link>Women</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to="/men">
                  <Nav.Link eventKey="men">Men</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to="/kids">
                  <Nav.Link eventKey="kids">Kids</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to="/shoes">
                  <Nav.Link eventKey="shoes">Shoes</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              <Nav.Item>
                <LinkContainer to="/brands">
                  <Nav.Link eventKey="brands">Brands</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            </Navbar.Collapse>
          </Navbar>
          <div className="head-right">
            <ul className="list-unstyled">
              <li>
                <a href="">
                  <i className="fa fa-search" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="">
                  <i className="fa fa-shopping-bag" aria-hidden="true" />
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
