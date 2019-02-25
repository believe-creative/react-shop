import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "../../scss/cart.scss";
import { connect } from "react-redux";

class Items extends Component {
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <div id="main" class="mt-5 mb-5">
          <div class="container">
            <div class="bg-white cart-block">
              <div class="row">
                <div class="col-md-10 offset-md-1">
                  <h2>4 Items In Your Cart</h2>
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
                    <div class="cart-single-block">
                      <ul class="list-unstyled">
                        <li class="img-block">
                          <img
                            src="images/adoration-of-the-kings.gif"
                            alt="Image"
                            title="Image"
                          />
                          <span>
                            <h3>Green T-Shirt 2016</h3>
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
                          <span class="number-block">2</span>
                          <span>
                            <a href="#">&#43;</a>
                          </span>
                        </li>
                        <li class="price">&#163;21</li>
                      </ul>
                      <div class="clearfix" />
                    </div>
                    <div class="cart-single-block">
                      <ul class="list-unstyled">
                        <li class="img-block">
                          <img
                            src="images/adoration-of-the-kings.gif"
                            alt="Image"
                            title="Image"
                          />
                          <span>
                            <h3>Green T-Shirt 2016</h3>
                            <p>Men BK3569</p>
                            <p class="remove">
                              <a href="#">
                                <span>&#10005;</span> Remove
                              </a>
                            </p>
                          </span>
                        </li>
                        <li>XL</li>
                        <li class="quantity-block">
                          <span>
                            <a href="#">&#8722;</a>
                          </span>
                          <span class="number-block">2</span>
                          <span>
                            <a href="#">&#43;</a>
                          </span>
                        </li>
                        <li class="price">&#163;13</li>
                      </ul>
                      <div class="clearfix" />
                    </div>
                    <div class="cart-single-block">
                      <ul class="list-unstyled">
                        <li class="img-block">
                          <img
                            src="images/adoration-of-the-kings.gif"
                            alt="Image"
                            title="Image"
                          />
                          <span>
                            <h3>Green T-Shirt 2016</h3>
                            <p>Men BK3569</p>
                            <p class="remove">
                              <a href="#">
                                <span>&#10005;</span> Remove
                              </a>
                            </p>
                          </span>
                        </li>
                        <li>L</li>
                        <li class="quantity-block">
                          <span>
                            <a href="#">&#8722;</a>
                          </span>
                          <span class="number-block">2</span>
                          <span>
                            <a href="#">&#43;</a>
                          </span>
                        </li>
                        <li class="price">&#163;42</li>
                      </ul>
                      <div class="clearfix" />
                    </div>
                    <div class="cart-single-block">
                      <ul class="list-unstyled">
                        <li class="img-block">
                          <img
                            src="images/adoration-of-the-kings.gif"
                            alt="Image"
                            title="Image"
                          />
                          <span>
                            <h3>Green T-Shirt 2016</h3>
                            <p>Men BK3569</p>
                            <p class="remove">
                              <a href="#">
                                <span>&#10005;</span> Remove
                              </a>
                            </p>
                          </span>
                        </li>
                        <li>XS</li>
                        <li class="quantity-block">
                          <span>
                            <a href="#">&#8722;</a>
                          </span>
                          <span class="number-block">2</span>
                          <span>
                            <a href="#">&#43;</a>
                          </span>
                        </li>
                        <li class="price">&#163;24</li>
                      </ul>
                      <div class="clearfix" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="container cart-bottom-block">
              <div class="row">
                <div class="col-md-10 offset-md-1">
                  <button type="button" class="btn btn-md btn-white">
                    Back to Shop
                  </button>
                  <button type="button" class="btn btn-md">
                    Checkout
                  </button>
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
  console.log(state.get("products").categories);
  return {
    categories: state.get("products").categories,
    cart: state.get("products").cart
  };
};

export default connect(
  mapStateToProps,
  null
)(Items);
