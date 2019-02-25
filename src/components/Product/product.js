import React, { Component } from "react";

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = { active: false };
  }
  onPress() {
    this.setState({ active: true });
    if (this.state.active) {
      return <p class="red">added to cart</p>;
    }
  }
  render() {
    return (
      <div class="col-md-3 item">
        <div class="hot_block">
          <img
            src={require(`../../images/product_images/${
              this.props.product.thumbnail
            }`)}
          />
          <h3 class="black">{this.props.product.name}</h3>
          <p class="red">{"$" + this.props.product.price}</p>
          <button type="button" class="btn btn-sm" onClick={this.onPress()}>
            Add to cart
          </button>
        </div>
      </div>
    );
  }
}
