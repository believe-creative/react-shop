import React, { Component } from "react";

export default class Product extends Component {
  render() {
    return (
      <div>
        <img src={this.props.image} />
        <h2>{this.props.productTitle}</h2>
      </div>
    );
  }
}
