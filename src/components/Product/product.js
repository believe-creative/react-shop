import React, { Component } from "react";
import * as Actions from "../../actions";
import { connect } from "react-redux";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { show: "", items: "" };
  }
  componentDidMount() {}
  addtoCart(e) {
    let cart = localStorage.getItem("react-shop-cart");
    let props = this.props;
    if (cart) {
      cart = JSON.parse(cart);
      props.AddToCart({
        inCartId: cart.inCartId,
        inProductId: this.props.product.product_id,
        inAttributes: null
      });
    } else {
      props.AddToCart({
        inCartId: null,
        inProductId: this.props.product.product_id,
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

  render() {

    return (
      <div className="col-md-3 item">
        <div className="hot_block">
          <img
            src={require(`../../images/product_images/${
              this.props.product.thumbnail
            }`)}
            alt={require(`../../images/product_images/${
              this.props.product.thumbnail
            }`)}
          />
          <h3 className="black pt-3">{this.props.product.name}</h3>
          <h3 className="red">{"$" + this.props.product.price}</h3>
          <button className="btn btn-sm" onClick={this.addtoCart.bind(this)}>
            Add to cart
          </button>
          <span className={"add_to_cart mt-2"}>
            <h3 className={"addcart" + this.state.show ? this.state.show : ""}>
              {"Added to cart"}
            </h3>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.get("products").cart
  };
};

function mapDispatchToProps(dispatch) {
  return {
    AddToCart: (inCartId, inProductId, inAttributes) =>
      dispatch(Actions.AddToCart.request(inCartId, inProductId, inAttributes))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
