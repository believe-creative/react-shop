import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "../../scss/cart.scss";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";

class Items extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let cart = { count: 0, products: [] };
    if (this.props.cart) cart = this.props.cart;
    console.log(cart);
    return (
      <React.Fragment>
        <div class="pt-5 mb-5">
          <div class="container">
            <div class="bg-white cart-block">
              <div class="row">
                <div class="col-md-10 offset-md-1">
                  <h2>{cart.count} Items In Your Cart</h2>
                  <div class="cart-top-block pt-2 pb-2 mb-3">
                    <ul class="list-unstyled">
                      <li>Item</li>
                      <li>Size</li>
                      <li>Quantity</li>
                      <li>Price</li>
                    </ul>
                    <div class="clearfix" />
                  </div>
                  <div class="cart-bot-block">
                    {cart.products.map(function(product) {
                      return (
                        <div class="cart-single-block">
                          <ul class="list-unstyled">
                            <li class="img-block">
                              <img
                                src={require(`../../images/product_images/${
                                  product.thumbnail
                                    ? product.thumbnail
                                    : "afghan-flower-2.gif"
                                }`)}
                              />
                              <span>
                                <h3>{product.name}</h3>
                                <p>Men BK3569</p>
                                <p class="remove">
                                  <a href="#">
                                    <span>&#10005;</span> Remove
                                  </a>
                                </p>
                              </span>
                            </li>
                            <li>XXL</li>
                            <li class="quantity-block">
                              <span>
                                <a href="#">&#8722;</a>
                              </span>
                              <span class="number-block">
                                {product.quantity}
                              </span>
                              <span>
                                <a href="#">&#43;</a>
                              </span>
                            </li>
                            <li class="price">&#163;{product.price}</li>
                          </ul>
                          <div class="clearfix" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div class="container cart-bottom-block">
              <div class="row">
                <div class="col-md-10 offset-md-1">
                  <LinkContainer to={"/"} className="btn btn-md btn-white">
                    <a>Back to Shop</a>
                  </LinkContainer>
                  <LinkContainer to={"/checkout"} className="btn btn-md">
                    <a>Checkout</a>
                  </LinkContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    cart: state.get("products").cart
  };
};

export default connect(
  mapStateToProps,
  null
)(Items);
