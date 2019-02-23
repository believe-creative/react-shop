import React, { Component } from "react";

export default class Category extends Component {
  componentDidMount() {}
  render() {
    return <div>Category:{this.props.match.params.category}</div>;
  }
}
