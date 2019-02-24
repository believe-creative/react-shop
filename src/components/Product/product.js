import React, { Component } from "react";

export default class Product extends Component {
  render() {
    return (
      <div className="col-lg-3 col-md-4 col-sm-6">
        <img
          src={require(`../../images/product_images/${
            this.props.product.thumbnail
          }`)}
        />
        <h2>{this.props.product.name}</h2>
      </div>
    );
  }
}
