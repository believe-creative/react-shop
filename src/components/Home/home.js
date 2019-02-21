import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "../../scss/home.scss";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <Container>
          <h1>Home Page</h1>
        </Container>
      </div>
    );
  }
}
