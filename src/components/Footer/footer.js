import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../../scss/footer.scss";

export default class SiteFooter extends Component {
  render() {
    return (
      <footer>
        <Container>
          <Row>
            <Col>Footer goes here</Col>
          </Row>
        </Container>
      </footer>
    );
  }
}
