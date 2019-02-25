import React, { Component } from "react";
import * as Actions from "../../actions";

import { connect } from "react-redux";

class Product extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  addtoCart(e) {
    let cart = localStorage.getItem("react-shop-cart");
    let props = this.props;
    console.log(this.props.product);
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
    console.log("got in");
  }
  render() {
    return (
      <div className="col-md-4 item">
        <div className="hot_block">
          <img
            src={require(`../../images/product_images/${
              this.props.product.thumbnail
            }`)}
          />
          <h3 className="black">{this.props.product.name}</h3>
          <p className="red">{"$" + this.props.product.price}</p>
          <button className="btn btn-sm" onClick={this.addtoCart.bind(this)}>
            Add to cart
          </button>
          {}
          <span className="green">
            <i class="fas fa-check" />
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.get("cart")
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
