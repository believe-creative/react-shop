import React, { Component } from "react";
import "../../scss/productdetails.scss";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import * as Actions from "../../actions";
import "react-confirm-alert/src/react-confirm-alert.css";
import AliceCarousel from "react-alice-carousel";
import { BeatLoader } from "react-spinners";

const handleOnDragStart = e => e.preventDefault();

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: "",
      buttonStyles: { cursor: "pointer" },
      cart: null,
      productImageName: "",
      activeClass: "active",
      adding: false
    };
  }

  addtoCart(e) {
    let cart = localStorage.getItem("react-shop-cart");
    let props = this.props;
    console.log(props, "=0___", cart);
    if (cart) {
      cart = JSON.parse(cart);
      props.AddToCart({
        token: props.token,
        inCartId: cart.inCartId,
        inProductId: this.props.productdetails[0].product_id,
        inAttributes: null
      });
    } else {
      console.log(props, "here");
      props.AddToCart({
        token: props.token,
        inCartId: null,
        inProductId: this.props.productdetails[0].product_id,
        inAttributes: null
      });
    }

    this.setState({ show: "show", adding: true });
    setTimeout(() => {
      this.setState({
        show: ""
      });
    }, 1000);
  }
  componentDidMount() {
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
  }

  componentWillReceiveProps(props) {
    let localCart = JSON.parse(localStorage.getItem("react-shop-cart"));
    if (localCart != null) {
      if (this.state.cart === null || this.state.cart === undefined) {
        this.props.getCartProducts({
          token: props.token,
          inCartId: localCart.inCartId
        });
      } else if (props.cart.count !== this.state.cart.count) {
        this.props.getCartProducts({
          token: props.token,
          inCartId: props.cart.inCartId
        });
      }

      this.setState({ cart: props.cart, adding: false });
    }
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
    // console.log(this.props.productdetails[0]);
    let cart = { count: 0, products: [] };
    if (this.props.cart) cart = this.props.cart;
    let hasItems = cart.count > 0 ? true : false;
    let this_ref = this;
    // console.log(this.props);
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
                    <li className="productlocations_breadcrumb">
                      <div className="arrow">{" > "}</div>
                      <LinkContainer to={"/categories/" + productlocations}>
                        <a>
                          {this.props.productlocations[0]
                            ? this.props.productlocations[0].department_name
                            : ""}
                        </a>
                      </LinkContainer>
                    </li>
                    <li className="productlocations_breadcrumb">
                      <div className="arrow">{" > "}</div>

                      {this.props.productlocations[0]
                        ? this.props.productlocations[0].category_name
                        : ""}
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
                          this.state.productImageName === productImg1
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
                          this.state.productImageName === productImg2
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
                    <h6 className="pricetag"> Price:</h6>
                    {this.props.productdetails[0]
                      ? "$" + this.props.productdetails[0].price
                      : ""}
                    {this.props.productdetails[0] ? <p> {""}</p> : ""}
                  </div>
                  {this.props.productdetails[0] ? (
                    <div className="amount-block pt-3 pb-3">
                      <h6 className="pricetag"> Discounted Price:</h6>
                      {this.props.productdetails[0]
                        ? "$" + this.props.productdetails[0].discounted_price
                        : ""}
                    </div>
                  ) : (
                    ""
                  )}

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
                      {this.state.adding ? (
                        <BeatLoader color={"#f62f5e"} />
                      ) : (
                        ""
                      )}
                    </button>
                    <span className={"add_to_cart mt-2"}>
                      <h3
                        className={
                          "addcart" + this.state.show ? this.state.show : ""
                        }
                      >
                        {"Adding to cart"}
                      </h3>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {this.props.productrecommendations.length > 0 ? (
            <div className="container related-block mt-5">
              <h2 className="pb-4">You may also like</h2>
              <div className="row">
                {this.props.productrecommendations.map((item, index) => {
                  return (
                    <div className="col-sm-6 col-lg-3" key={index}>
                      <a
                        href={
                          "/product/" +
                          item.product_id +
                          "/" +
                          item.product_name
                        }
                      >
                        <div className="product-image-block bg-white">
                          <h3 className="pt-3">{item.product_name}</h3>
                          <p className="pt-3">{item.description}</p>
                          <div className="price pt-3">&#163;14.99</div>
                        </div>
                      </a>
                    </div>
                  );
                })}
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
  AddToCart: (inCartId, inProductId, inAttributes) =>
    dispatch(Actions.AddToCart.request(inCartId, inProductId, inAttributes)),
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
