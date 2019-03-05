import React, { Component } from "react";
import "../../scss/productdetails.scss";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import * as Actions from "../../actions";
import "react-confirm-alert/src/react-confirm-alert.css";
import AliceCarousel from "react-alice-carousel";

const handleOnDragStart = e => e.preventDefault();

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: "",
      buttonStyles: { cursor: "pointer" },
      cart: {},
      productImageName: "",
      activeClass: "active"
    };
  }
  addtoCart(e) {
    let cart = localStorage.getItem("react-shop-cart");
    let props = this.props;
    if (cart) {
      cart = JSON.parse(cart);
      props.AddToCart({
        token: props.token,
        inCartId: cart.inCartId,
        inProductId: this.props.productdetails[0].product_id,
        inAttributes: null
      });
    } else {
      props.AddToCart({
        token: props.token,
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
    this.props.loadProduct({
      token: this.props.token,
      inProductId: this.props.match.params.productid
    });
    this.props.getProductRecommendations({
      token: this.props.token,
      inProductId: this.props.match.params.productid
    });
    this.props.getProductLocations({
      token: this.props.token,
      inProductId: this.props.match.params.productid
    });
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
    console.log(props);
    state["buttonStyles"] = { pointerEvents: "auto", cursor: "pointer" };
    if (props.cart != undefined) {
      if (props.cart.count !== undefined && props.cart.count !== null) {
        if (
          this.state.cart.count === undefined ||
          this.state.cart.count === null
        ) {
          this.props.getCartProducts({
            token: props.token,
            inCartId: props.cart.inCartId
          });
        } else if (props.cart.count !== this.state.cart.count) {
          this.props.getCartProducts({
            token: props.token,
            inCartId: props.cart.inCartId
          });
        }
        if (props.cart.count <= 0) {
          state["buttonStyles"] = { pointerEvents: "none" };
        }
        state["cart"] = props.cart;
      }
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
        token: this.props.token,
        inItemId: e.currentTarget.getAttribute("data-item"),
        inQuantity: count
      });
    }
  }
  handleClick(name) {
    console.log("imageName:", name);
    this.setState({ productImageName: name, activeClass: "" });
  }
  render() {
    let productImg1 = this.props.productdetails[0]
      ? this.props.productdetails[0].image
      : "";
    let productImg2 = this.props.productdetails[0]
      ? this.props.productdetails[0].image_2
      : "";
    let productlocations = this.props.productlocations[0]
      ? this.props.productlocations[0].department_name.toLowerCase()
      : "";
    console.log(this.props.productdetails[0]);
    let cart = { count: 0, products: [] };
    if (this.props.cart) cart = this.props.cart;
    let hasItems = cart.count > 0 ? true : false;
    let this_ref = this;
    console.log(this.props);
    return (
      <React.Fragment>
        <div id="main" className="mt-5 mb-5">
          <div className="container">
            <div className="product-block bg-white">
              <div className="row">
                <div className="col-md-12 mb-3 breadcrumbs">
                  <ul className="list-unstyled">
                    <li>
                      <LinkContainer to="/">
                        <a>Home</a>
                      </LinkContainer>
                    </li>
                    <li>
                      <LinkContainer to={"/categories/" + productlocations}>
                        <a>
                          {this.props.productlocations[0]
                            ? this.props.productlocations[0].department_name
                            : ""}
                        </a>
                      </LinkContainer>/<LinkContainer
                        to={"/categories/" + productlocations}
                      >
                        <a>
                          {this.props.productlocations[0]
                            ? this.props.productlocations[0].category_name
                            : ""}
                        </a>
                      </LinkContainer>
                    </li>
                  </ul>
                  <div className="clearfix" />
                </div>
                <div className="col-md-6 item-left-block">
                  <div className="top-image text-center">
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
                  <div className="colors-selection-block">
                    <ul className="list-unstyled">
                      <li
                        className={
                          this.state.productImageName == productImg1
                            ? "active"
                            : this.state.activeClass
                        }
                      >
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

                      <li
                        className={
                          this.state.productImageName == productImg2
                            ? "active"
                            : ""
                        }
                      >
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
                <div className="col-md-6 item-right-block ">
                  <div className="item-title">
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
                  <div className="amount-block pt-3">
                    <h6 className="pricetag"> Price:</h6> &#163;{" "}
                    {this.props.productdetails[0]
                      ? this.props.productdetails[0].price
                      : ""}
                    {this.props.productdetails[0] ? <p> {""}</p> : ""}
                  </div>
                  {this.props.productdetails[0] ? (
                    <div className="amount-block pt-3 pb-3">
                      <h6 className="pricetag"> Discounted Price:</h6> &#163;{" "}
                      {this.props.productdetails[0]
                        ? this.props.productdetails[0].discounted_price
                        : ""}
                    </div>
                  ) : (
                    ""
                  )}
                  {cart.products.map(function(product, key) {
                    return (
                      <div className="quantity-block display_none">
                        <h3 className="gray-dark pt-3 pb-2">Quantity</h3>
                        <ul className="list-unstyled">
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
                        <div className="clearfix" />
                      </div>
                    );
                  })}
                  <div className="product_images_block">
                    <AliceCarousel mouseDragEnabled>
                      <img
                        src={require(`../../images/product_images/${
                          this.props.productdetails[0]
                            ? this.props.productdetails[0].image
                            : "a-partridge-in-a-pear-tree-2.gif"
                        }`)}
                        onDragStart={handleOnDragStart}
                        className="yours-custom-class"
                      />
                      <img
                        src={require(`../../images/product_images/${
                          this.props.productdetails[0]
                            ? this.props.productdetails[0].image_2
                            : "a-partridge-in-a-pear-tree-2.gif"
                        }`)}
                        onDragStart={handleOnDragStart}
                        className="yours-custom-class"
                      />
                    </AliceCarousel>
                  </div>
                  <div className="pt-5 btn-block">
                    <button
                      type="button"
                      className="btn btn-lg"
                      onClick={this.addtoCart.bind(this)}
                    >
                      Add to cart
                    </button>
                    <span className={"add_to_cart mt-2"}>
                      <h3
                        className={
                          "addcart" + this.state.show ? this.state.show : ""
                        }
                      >
                        {"Added to cart"}
                      </h3>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container display_none">
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
          {this.props.productrecommendations.length > 0 ? (
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
                      <h3 className="pt-3">
                        New Look T-Shirt In Gradient Fade
                      </h3>
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
                      <h3 className="pt-3">
                        New Look T-Shirt In Gradient Fade
                      </h3>
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
                      <h3 className="pt-3">
                        New Look T-Shirt In Gradient Fade
                      </h3>
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
                      <h3 className="pt-3">
                        New Look T-Shirt In Gradient Fade
                      </h3>
                      <div className="price pt-3">&#163;14.99</div>
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
    productrecommendations: state.get("products").productrecommendations,
    productlocations: state.get("products").productLocations,
    token: state.get("user").token
  };
};

const mapStateToDispatch = dispatch => ({
  loadProduct: data => dispatch(Actions.product.request(data)),
  AddToCart: data => dispatch(Actions.AddToCart.request(data)),
  updateProductQuantity: data =>
    dispatch(Actions.updateProductQuantity.request(data)),
  getCartProducts: data => dispatch(Actions.getCartProducts.request(data)),
  getProductRecommendations: data =>
    dispatch(Actions.getProductRecommendations.request(data)),
  getProductLocations: data => dispatch(Actions.productLocations.request(data))
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(ProductDetails);
