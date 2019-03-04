import React, { Component } from "react";
import "../../scss/productdetails.scss";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import * as Actions from "../../actions";
import "react-confirm-alert/src/react-confirm-alert.css";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "",
      buttonStyles: { cursor: "pointer" },
      cart: {},
      productImageName: ""
    };
  }
  addtoCart(e) {
    let cart = localStorage.getItem("react-shop-cart");
    let props = this.props;
    if (cart) {
      cart = JSON.parse(cart);
      props.AddToCart({
        inCartId: cart.inCartId,
        inProductId: this.props.productdetails[0].product_id,
        inAttributes: null
      });
    } else {
      props.AddToCart({
        inCartId: null,
        inProductId: this.props.productdetails[0].product_id,
        inAttributes: null
      });
    }

    this.setState({ show: "show" });
    setTimeout(() => {
      this.setState({
        show: ""
      });
    }, 1000);
  }
  componentDidMount() {
    console.log(this.props.match.params.productid);
    this.props.loadProduct(this.props.match.params.productid);
    this.props.getProductRecommendations(this.props.match.params.productid);
    const props = this.props;
    let state = this.state;
    state["buttonStyles"] = { pointerEvents: "auto", cursor: "pointer" };
    if (props.cart) {
      if (props.cart.count !== undefined && props.cart.count != null) {
        if (props.cart.count <= 0) {
          state["buttonStyles"] = { pointerEvents: "none" };
        }
        state["cart"] = props.cart;
      }
    }

    this.setState(state);
  }
  componentWillReceiveProps(props) {
    let state = this.state;
    state["buttonStyles"] = { pointerEvents: "auto", cursor: "pointer" };
    if (props.cart.count !== undefined && props.cart.count !== null) {
      if (
        this.state.cart.count === undefined ||
        this.state.cart.count === null
      ) {
        this.props.getCartProducts(props.cart.inCartId);
      } else if (props.cart.count !== this.state.cart.count) {
        this.props.getCartProducts(props.cart.inCartId);
      }
      if (props.cart.count <= 0) {
        state["buttonStyles"] = { pointerEvents: "none" };
      }
      state["cart"] = props.cart;
    }
    this.setState(state);
  }
  update(e) {
    let state = this.state;
    state["buttonStyles"] = { pointerEvents: "none" };
    this.setState(state);
    let count = parseInt(e.currentTarget.getAttribute("data-quantity"));
    let param = parseInt(e.currentTarget.getAttribute("data-param"));
    count = count + param;
    if (count < 0) {
      let state = this.state;
      state["buttonStyles"] = { pointerEvents: "auto", cursor: "pointer" };
      this.setState(state);
    } else {
      this.props.updateProductQuantity({
        inItemId: e.currentTarget.getAttribute("data-item"),
        inQuantity: count
      });
    }
  }
  handleClick(name) {
    console.log("imageName:", name);
    this.setState({ productImageName: name });
  }
  render() {
    let productDetails = this.props.productdetails[0]
      ? this.props.productdetails[0]
      : "";
    console.log(this.props.productdetails[0]);
    let cart = { count: 0, products: [] };
    if (this.props.cart) cart = this.props.cart;
    let hasItems = cart.count > 0 ? true : false;
    let this_ref = this;
    console.log(this.props);
    return (
      <React.Fragment>
        <div id="main" class="mt-5 mb-5">
          <div class="container">
            <div class="product-block bg-white">
              <div class="row">
                <div class="col-md-6 item-left-block">
                  <div class="top-image text-center">
                    <img
                      src={require(`../../images/product_images/${
                        this.state.productImageName
                          ? this.state.productImageName
                          : this.props.productdetails[0]
                            ? this.props.productdetails[0].image
                            : "a-partridge-in-a-pear-tree-2.gif"
                      }`)}
                      alt="Image"
                      title="Image"
                    />
                  </div>
                  <div class="colors-selection-block">
                    <ul class="list-unstyled">
                      <li class="active">
                        <a
                          onClick={() => {
                            this.handleClick(
                              this.props.productdetails[0]
                                ? this.props.productdetails[0].image
                                : "a-partridge-in-a-pear-tree-2.gif"
                            );
                          }}
                        >
                          <img
                            src={require(`../../images/product_images/${
                              this.props.productdetails[0]
                                ? this.props.productdetails[0].image
                                : "a-partridge-in-a-pear-tree-2.gif"
                            }`)}
                            alt="Image"
                            title="Image1"
                          />
                        </a>
                      </li>

                      <li>
                        <a
                          onClick={() => {
                            this.handleClick(
                              this.props.productdetails[0]
                                ? this.props.productdetails[0].image_2
                                : "a-partridge-in-a-pear-tree-2.gif"
                            );
                          }}
                        >
                          <img
                            src={require(`../../images/product_images/${
                              this.props.productdetails[0]
                                ? this.props.productdetails[0].image_2
                                : "a-partridge-in-a-pear-tree-2.gif"
                            }`)}
                            alt="Image"
                            title="Image3"
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
                        <LinkContainer to="/">
                          <a>Home</a>
                        </LinkContainer>
                      </li>
                      <li>
                        <LinkContainer to="/categories">
                          <a>All Categories</a>
                        </LinkContainer>
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
                    <h2>
                      {this.props.productdetails[0]
                        ? this.props.productdetails[0].name
                        : ""}
                    </h2>
                    <p>
                      {this.props.productdetails[0]
                        ? this.props.productdetails[0].description
                        : ""}
                    </p>
                  </div>
                  <div class="amount-block pt-3 pb-3">
                    &#163;{" "}
                    {this.props.productdetails[0]
                      ? this.props.productdetails[0].price
                      : ""}
                    {this.props.productdetails[0] ? <p> &#10072;</p> : ""}
                  </div>
                  {this.props.productdetails[0] ? (
                    <div class="amount-block pt-3 pb-3">
                      &#163;{" "}
                      {this.props.productdetails[0]
                        ? this.props.productdetails[0].discounted_price
                        : ""}
                    </div>
                  ) : (
                    ""
                  )}
                  {cart.products.map(function(product, key) {
                    return (
                      <div class="quantity-block display_none">
                        <h3 class="gray-dark pt-3 pb-2">Quantity</h3>
                        <ul class="list-unstyled">
                          <li className="quantity-block">
                            <span>
                              <a
                                data-param="-1"
                                data-item={product.item_id}
                                data-quantity={product.quantity}
                                style={this_ref.state.buttonStyles}
                                onClick={this_ref.update.bind(this_ref)}
                              >
                                &#8722;
                              </a>
                            </span>
                            <span className="number-block">
                              {product.quantity}
                            </span>
                            <span>
                              <a
                                data-param="1"
                                data-item={product.item_id}
                                style={this_ref.state.buttonStyles}
                                data-quantity={product.quantity}
                                onClick={this_ref.update.bind(this_ref)}
                              >
                                &#43;
                              </a>
                            </span>
                          </li>
                        </ul>
                        <div class="clearfix" />
                      </div>
                    );
                  })}
                  <div class="pt-5 btn-block">
                    <button
                      type="button"
                      class="btn btn-lg"
                      onClick={this.addtoCart.bind(this)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container display_none">
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
          {this.props.productrecommendations.length > 0 ? (
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
          ) : (
            ""
          )}
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    cart: state.get("products").cart,
    productdetails: state.get("products").product,
    productrecommendations: state.get("products").productrecommendations
  };
};

const mapStateToDispatch = dispatch => ({
  loadProduct: data => dispatch(Actions.product.request(data)),
  AddToCart: (inCartId, inProductId, inAttributes) =>
    dispatch(Actions.AddToCart.request(inCartId, inProductId, inAttributes)),
  updateProductQuantity: data =>
    dispatch(Actions.updateProductQuantity.request(data)),
  getCartProducts: token => dispatch(Actions.getCartProducts.request(token)),
  getProductRecommendations: data =>
    dispatch(Actions.getProductRecommendations.request(data))
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(ProductDetails);
