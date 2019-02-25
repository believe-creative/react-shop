import React, { Component } from "react";
import Product from "./product";

export default class ProductList extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="row items_list">
        {this.props.products &&
          this.props.products.map(product => <Product product={product} />)}
      </div>
    );
  }
}
