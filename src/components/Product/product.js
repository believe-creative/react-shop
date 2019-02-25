import React, { Component } from "react";

export default class Product extends Component {
  render() {
    return (
      <div class="col-md-4 item">
        <div class="hot_block">
          <img
            src={require(`../../images/product_images/${
              this.props.product.thumbnail
            }`)}
          />
          <h3 class="black">{this.props.product.name}</h3>
          <p class="red">14.99</p>
        </div>
      </div>
    );
  }
}
