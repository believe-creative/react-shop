import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../../images/tshirtshop.png";
import Image from "react-bootstrap/Image";
import "../../scss/navbar.scss";

export default class NavBar extends Component {
  render() {
    return (
      <Container>
        <a className="nav-logo" href="/">
          <Image src={logo} className="justify-content-start nav-logo" fluid />
        </a>
        <Nav className="justify-content-start" activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/women">Women</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="men" href="/men">
              Men
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="kids" href="Kids">
              Kids
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="shoes" href="shoes">
              Shoes
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="brands" href="brands">
              Brands
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    );
  }
}
