import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../scss/cart.scss";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = { cartItems: [1, 2, 3, 4, 5, 6, 7, 8] };
  }
  render() {
    return (
      <Container>
        <Row>
          <Col sm={6} md={3}>
            <h3>QEUSTIONS?</h3>
            <ul className="list-unstyled">
              <li>
                <a href="#">Help</a>
              </li>
              <li>
                <a href="#">Track Order</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
            </ul>
          </Col>
          <Col sm={6} md={3}>
            <h3>WHAT'S IN STORE</h3>
            <ul className="list-unstyled">
              <li>
                <a href="#">Women</a>
              </li>
              <li>
                <a href="#">Men</a>
              </li>
              <li>
                <a href="#">Product A-Z</a>
              </li>
              <li>
                <a href="#">Buy Gift Vouchers</a>
              </li>
            </ul>
          </Col>
          <Col sm={6} md={3}>
            <h3>FOLLOW US</h3>
            <ul className="list-unstyled">
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Youtube</a>
              </li>
            </ul>
          </Col>
          <Col sm={6} md={3}>
            <ul className="list-unstyled">
              <li>@2019 shopmate LTD</li>
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}
