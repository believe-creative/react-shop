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
        <div id="main" class="mt-5 mb-5">
          <div class="container">
            <div class="product-block bg-white">
              <div class="row">
                <div class="col-md-6 item-left-block">
                  <div class="top-image text-center">
                    <img
                      src="images/adoration-of-the-kings.gif"
                      alt="Image"
                      title="Image"
                    />
                  </div>
                  <div class="colors-selection-block">
                    <ul class="list-unstyled">
                      <li class="active">
                        <a href="#">
                          <img
                            src="images/adoration-of-the-kings.gif"
                            alt="Image"
                            title="Image"
                          />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img
                            src="images/albania-flower.gif"
                            alt="Image"
                            title="Image"
                          />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img
                            src="images/altar-piece.gif"
                            alt="Image"
                            title="Image"
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-6 item-right-block">
                  <div class="breadcrumbs">
                    <ul class="list-unstyled">
                      <li>
                        <a href="#">Home</a>
                      </li>
                      <li>
                        <a href="#">All Categories</a>
                      </li>
                      <li>
                        <a href="#">Men's Clothing &amp; Accessories</a>
                      </li>
                    </ul>
                    <div class="clearfix" />
                  </div>
                  <div class="starts-block pt-3 pb-3">
                    <ul class="list-unstyled">
                      <li class="active">
                        <a href="">&#9733;</a>
                      </li>
                      <li class="active">
                        <a href="">&#9733;</a>
                      </li>
                      <li>
                        <a href="">&#9733;</a>
                      </li>
                      <li>
                        <a href="">&#9733;</a>
                      </li>
                      <li>
                        <a href="">&#9733;</a>
                      </li>
                    </ul>
                    <div class="clearfix" />
                  </div>
                  <div class="item-title">
                    <h2>Super Oversized T-Shirt With Raw Sleeves In Brown</h2>
                  </div>
                  <div class="amount-block pt-3 pb-3">&#163;13.99</div>
                  <div class="d-md-none text-center pt-3 pb-3">
                    <img
                      src="images/adoration-of-the-kings.gif"
                      alt="Image"
                      title="Image"
                    />
                  </div>
                  <div class="color-codes pt-3 pb-2">
                    <h3 class="gray-dark pb-3">Color</h3>
                    <ul class="list-unstyled">
                      <li class="bg-blue" />
                      <li class="bg-teal" />
                      <li class="active bg-red" />
                      <li class="bg-orange" />
                      <li class="bg-yellow-dark" />
                      <li class="bg-green" />
                      <li class="bg-purple" />
                    </ul>
                    <div class="clearfix" />
                  </div>
                  <div class="button-sizes">
                    <h3 class="gray-dark pt-3 pb-2">Size</h3>
                    <ul class="list-unstyled">
                      <li>
                        <a href="">XS</a>
                      </li>
                      <li>
                        <a href="">S</a>
                      </li>
                      <li>
                        <a href="">M</a>
                      </li>
                      <li>
                        <a href="">L</a>
                      </li>
                      <li>
                        <a href="">XL</a>
                      </li>
                      <li>
                        <a href="">XXL</a>
                      </li>
                      <li>
                        <a href="">XXXL</a>
                      </li>
                    </ul>
                    <div class="clearfix" />
                  </div>
                  <div class="quantity-block">
                    <h3 class="gray-dark pt-3 pb-2">Quantity</h3>
                    <ul class="list-unstyled">
                      <li>
                        <a href="#">&#8722;</a>
                      </li>
                      <li class="number-block">2</li>
                      <li>
                        <a href="#">&#43;</a>
                      </li>
                    </ul>
                    <div class="clearfix" />
                  </div>
                  <div class="pt-5 btn-block">
                    <button type="button" class="btn btn-lg">
                      Add to cart
                    </button>
                    <div class="wish-list">
                      <a href="#">
                        <span>&#9825;</span> Add to wish list
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="review-block bg-gray pt-5 pb-5">
              <div class="row">
                <div class="col-md-10 offset-md-1">
                  <div class="review-top-block">
                    <h2 class="pb-4">Product reviews</h2>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="starts-block pb-2">
                          <ul class="list-unstyled">
                            <li class="active">
                              <a href="">&#9733;</a>
                            </li>
                            <li class="active">
                              <a href="">&#9733;</a>
                            </li>
                            <li>
                              <a href="">&#9733;</a>
                            </li>
                            <li>
                              <a href="">&#9733;</a>
                            </li>
                            <li>
                              <a href="">&#9733;</a>
                            </li>
                          </ul>
                          <div class="clearfix" />
                        </div>
                        <div class="author-block">
                          <h6>
                            <strong>Pablo Permins</strong>
                          </h6>
                          <span>one hour ago</span>
                        </div>
                      </div>
                      <div class="col-md-9">
                        <p>
                          Nulla in metus vitae leo lobortis faucibus ac sed mi.
                          Sed elit nisl, vehicula eu nisi id, porttitor auctor
                          ipsum.
                        </p>
                        <ul class="list-unstyled comment-block">
                          <li>
                            <span>&#9825;</span> 113
                          </li>
                          <li>
                            <span>
                              <i class="fa fa-comment-o" aria-hidden="true" />
                            </span>{" "}
                            6
                          </li>
                        </ul>
                        <div class="clearfix" />
                      </div>
                    </div>
                  </div>
                  <hr class="mt-5 mb-5" />
                  <div class="review-bot-block">
                    <h2 class="pb-4">Add a review</h2>
                    <form action="#" method="post">
                      <div class="form-group">
                        <label for="nickname">Choose a nickname</label>
                        <input type="text" />
                      </div>
                      <div class="form-group">
                        <label for="review">Your review</label>
                        <textarea />
                        <span>
                          Your review must be atleast 50 characters{" "}
                          <a href="#">Full review guidelines</a>
                        </span>
                      </div>
                      <div class="form-group">
                        <label for="review">Overall rating</label>
                        <div class="starts-block pb-2">
                          <ul class="list-unstyled">
                            <li class="active">
                              <a href="">&#9733;</a>
                            </li>
                            <li class="active">
                              <a href="">&#9733;</a>
                            </li>
                            <li class="active">
                              <a href="">&#9733;</a>
                            </li>
                            <li>
                              <a href="">&#9733;</a>
                            </li>
                            <li>
                              <a href="">&#9733;</a>
                            </li>
                          </ul>
                          <div class="clearfix" />
                        </div>
                      </div>
                      <div class="form-group">
                        <label />
                        <button type="submit" class="btn btn-lg mb-2">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container related-block mt-5">
            <h2 class="pb-4">You may also like</h2>
            <div class="row">
              <div class="col-sm-6 col-lg-3">
                <a href="#">
                  <div class="product-image-block bg-white">
                    <img
                      src="images/adoration-of-the-kings.gif"
                      alt="Iamge"
                      title="Image"
                    />
                    <h3 class="pt-3">New Look T-Shirt In Gradient Fade</h3>
                    <div class="price pt-3">&#163;14.99</div>
                  </div>
                </a>
              </div>
              <div class="col-sm-6 col-lg-3">
                <a href="#">
                  <div class="product-image-block bg-white">
                    <img
                      src="images/adoration-of-the-kings.gif"
                      alt="Iamge"
                      title="Image"
                    />
                    <h3 class="pt-3">New Look T-Shirt In Gradient Fade</h3>
                    <div class="price pt-3">&#163;14.99</div>
                  </div>
                </a>
              </div>
              <div class="col-sm-6 col-lg-3">
                <a href="#">
                  <div class="product-image-block bg-white">
                    <img
                      src="images/adoration-of-the-kings.gif"
                      alt="Iamge"
                      title="Image"
                    />
                    <h3 class="pt-3">New Look T-Shirt In Gradient Fade</h3>
                    <div class="price pt-3">&#163;14.99</div>
                  </div>
                </a>
              </div>
              <div class="col-sm-6 col-lg-3">
                <a href="#">
                  <div class="product-image-block bg-white">
                    <img
                      src="images/adoration-of-the-kings.gif"
                      alt="Iamge"
                      title="Image"
                    />
                    <h3 class="pt-3">New Look T-Shirt In Gradient Fade</h3>
                    <div class="price pt-3">&#163;14.99</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
