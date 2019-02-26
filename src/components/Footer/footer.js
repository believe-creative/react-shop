import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../../scss/footer.scss";

export default class SiteFooter extends Component {
  render() {
    return (
      <footer className="bg-white">
        <Container>
          <Row>
            <Col sm={6} lg={3}>
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
            <Col sm={6} lg={3}>
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
            <Col sm={6} lg={3}>
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
            <Col sm={6} lg={3}>
              <ul className="list-unstyled">
                <li>@2019 shopmate LTD</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}
