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
        <div id="main" className="mt-5 mb-5">
          <div className="container">
            <div className="product-block bg-white">
              <div className="row">
                <div className="col-md-6 item-left-block">
                  <div className="top-image text-center">
                    <img
                      src="images/adoration-of-the-kings.gif"
                      alt="Image"
                      title="Image"
                    />
                  </div>
                  <div className="colors-selection-block">
                    <ul className="list-unstyled">
                      <li className="active">
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
                <div className="col-md-6 item-right-block">
                  <div className="breadcrumbs">
                    <ul className="list-unstyled">
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
                    <div className="clearfix" />
                  </div>
                  <div className="starts-block pt-3 pb-3">
                    <ul className="list-unstyled">
                      <li className="active">
                        <a href="">&#9733;</a>
                      </li>
                      <li className="active">
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
                    <div className="clearfix" />
                  </div>
                  <div className="item-title">
                    <h2>Super Oversized T-Shirt With Raw Sleeves In Brown</h2>
                  </div>
                  <div className="amount-block pt-3 pb-3">&#163;13.99</div>
                  <div className="d-md-none text-center pt-3 pb-3">
                    <img
                      src="images/adoration-of-the-kings.gif"
                      alt="Image"
                      title="Image"
                    />
                  </div>
                  <div className="color-codes pt-3 pb-2">
                    <h3 className="gray-dark pb-3">Color</h3>
                    <ul className="list-unstyled">
                      <li className="bg-blue" />
                      <li className="bg-teal" />
                      <li className="active bg-red" />
                      <li className="bg-orange" />
                      <li className="bg-yellow-dark" />
                      <li className="bg-green" />
                      <li className="bg-purple" />
                    </ul>
                    <div className="clearfix" />
                  </div>
                  <div className="button-sizes">
                    <h3 className="gray-dark pt-3 pb-2">Size</h3>
                    <ul className="list-unstyled">
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
                    <div className="clearfix" />
                  </div>
                  <div className="quantity-block">
                    <h3 className="gray-dark pt-3 pb-2">Quantity</h3>
                    <ul className="list-unstyled">
                      <li>
                        <a href="#">&#8722;</a>
                      </li>
                      <li className="number-block">2</li>
                      <li>
                        <a href="#">&#43;</a>
                      </li>
                    </ul>
                    <div className="clearfix" />
                  </div>
                  <div className="pt-5 btn-block">
                    <button type="button" className="btn btn-lg">
                      Add to cart
                    </button>
                    <div className="wish-list">
                      <a href="#">
                        <span>&#9825;</span> Add to wish list
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="review-block bg-gray pt-5 pb-5">
              <div className="row">
                <div className="col-md-10 offset-md-1">
                  <div className="review-top-block">
                    <h2 className="pb-4">Product reviews</h2>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="starts-block pb-2">
                          <ul className="list-unstyled">
                            <li className="active">
                              <a href="">&#9733;</a>
                            </li>
                            <li className="active">
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
                          <div className="clearfix" />
                        </div>
                        <div className="author-block">
                          <h6>
                            <strong>Pablo Permins</strong>
                          </h6>
                          <span>one hour ago</span>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <p>
                          Nulla in metus vitae leo lobortis faucibus ac sed mi.
                          Sed elit nisl, vehicula eu nisi id, porttitor auctor
                          ipsum.
                        </p>
                        <ul className="list-unstyled comment-block">
                          <li>
                            <span>&#9825;</span> 113
                          </li>
                          <li>
                            <span>
                              <i
                                className="fa fa-comment-o"
                                aria-hidden="true"
                              />
                            </span>{" "}
                            6
                          </li>
                        </ul>
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div>
                  <hr className="mt-5 mb-5" />
                  <div className="review-bot-block">
                    <h2 className="pb-4">Add a review</h2>
                    <form action="#" method="post">
                      <div className="form-group">
                        <label for="nickname">Choose a nickname</label>
                        <input type="text" />
                      </div>
                      <div className="form-group">
                        <label for="review">Your review</label>
                        <textarea />
                        <span>
                          Your review must be atleast 50 characters{" "}
                          <a href="#">Full review guidelines</a>
                        </span>
                      </div>
                      <div className="form-group">
                        <label for="review">Overall rating</label>
                        <div className="starts-block pb-2">
                          <ul className="list-unstyled">
                            <li className="active">
                              <a href="">&#9733;</a>
                            </li>
                            <li className="active">
                              <a href="">&#9733;</a>
                            </li>
                            <li className="active">
                              <a href="">&#9733;</a>
                            </li>
                            <li>
                              <a href="">&#9733;</a>
                            </li>
                            <li>
                              <a href="">&#9733;</a>
                            </li>
                          </ul>
                          <div className="clearfix" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label />
                        <button type="submit" className="btn btn-lg mb-2">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container related-block mt-5">
            <h2 className="pb-4">You may also like</h2>
            <div className="row">
              <div className="col-sm-6 col-lg-3">
                <a href="#">
                  <div className="product-image-block bg-white">
                    <img
                      src="images/adoration-of-the-kings.gif"
                      alt="Iamge"
                      title="Image"
                    />
                    <h3 className="pt-3">New Look T-Shirt In Gradient Fade</h3>
                    <div className="price pt-3">&#163;14.99</div>
                  </div>
                </a>
              </div>
              <div className="col-sm-6 col-lg-3">
                <a href="#">
                  <div className="product-image-block bg-white">
                    <img
                      src="images/adoration-of-the-kings.gif"
                      alt="Iamge"
                      title="Image"
                    />
                    <h3 className="pt-3">New Look T-Shirt In Gradient Fade</h3>
                    <div className="price pt-3">&#163;14.99</div>
                  </div>
                </a>
              </div>
              <div className="col-sm-6 col-lg-3">
                <a href="#">
                  <div className="product-image-block bg-white">
                    <img
                      src="images/adoration-of-the-kings.gif"
                      alt="Iamge"
                      title="Image"
                    />
                    <h3 className="pt-3">New Look T-Shirt In Gradient Fade</h3>
                    <div className="price pt-3">&#163;14.99</div>
                  </div>
                </a>
              </div>
              <div className="col-sm-6 col-lg-3">
                <a href="#">
                  <div className="product-image-block bg-white">
                    <img
                      src="images/adoration-of-the-kings.gif"
                      alt="Iamge"
                      title="Image"
                    />
                    <h3 className="pt-3">New Look T-Shirt In Gradient Fade</h3>
                    <div className="price pt-3">&#163;14.99</div>
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
