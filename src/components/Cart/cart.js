import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "../../scss/cart.scss";

export default class Cart extends Component {
  render() {
    return (
      <React.Fragment>
        <FontAwesomeIcon icon={faShoppingBag} />
        <span className="cart_items">{this.props.cartItems}</span>
      </React.Fragment>
    );
  }
}
