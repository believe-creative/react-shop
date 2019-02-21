import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../../images/tshirtshop.png";
import Image from "react-bootstrap/Image";
import { LinkContainer } from "react-router-bootstrap";
import "../../scss/navbar.scss";

export default class NavBar extends Component {
  render() {
    return (
      <header>
        <Container>
          <a className="nav-logo" to="/">
            <Image
              src={logo}
              className="justify-content-start nav-logo"
              fluid
            />
          </a>
          <Nav className="justify-content-start">
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
          </Nav>
          <div className="clearfix" />
        </Container>
      </header>
    );
  }
}
