import React, { Component } from "react";
import Product from "./product";

export default class ProductList extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.props.products &&
            this.props.products.map(product => <Product product={product} />)}
        </div>
      </div>
    );
  }
}
