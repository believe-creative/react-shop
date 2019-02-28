import React, { Component } from "react";
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
