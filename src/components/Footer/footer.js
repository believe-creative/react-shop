import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import bc_logo from "../../images/bclogo-blue.png";
import "../../scss/footer.scss";
import Image from "react-bootstrap/Image";
import { LinkContainer } from "react-router-bootstrap";

export default class SiteFooter extends Component {
  render() {
    return (
      <footer className="bg-white mt-5">
        <Container>
          <Row>
            <Col sm={6} lg={3}>
              <h3>QUESTIONS?</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="/">Help</a>
                </li>
                <li>
                  <a href="/">Track Order</a>
                </li>
                <li>
                  <a href="/">Returns</a>
                </li>
              </ul>
            </Col>
            <Col sm={6} lg={3}>
              <h3>WHAT'S IN STORE</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="/">Women</a>
                </li>
                <li>
                  <a href="/">Men</a>
                </li>
                <li>
                  <a href="/">Product A-Z</a>
                </li>
                <li>
                  <a href="/">Buy Gift Vouchers</a>
                </li>
              </ul>
            </Col>
            <Col sm={6} lg={3}>
              <h3>FOLLOW US</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="/">Facebook</a>
                </li>
                <li>
                  <a href="/">Twitter</a>
                </li>
                <li>
                  <a href="/">Youtube</a>
                </li>
              </ul>
            </Col>
            <Col sm={6} lg={3}>
              <ul className="list-unstyled developed_logo">
                <li>@Developed by</li>
                <li>
                  <a
                    className="logo"
                    href="
https://www.believecreative.com/"
                    target="_blank"
                  >
                    <Image
                      src={bc_logo}
                      className="justify-content-start nav-logo"
                      fluid
                    />
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}
