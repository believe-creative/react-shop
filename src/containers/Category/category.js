import React, { Component } from "react";
import qs from "querystringify";

export default class Category extends Component {
  componentDidMount() {}
  render() {
    const qsParams = qs.parse(this.props.location.pathname);
    return <div>Category:{this.props.match.params.category}</div>;
  }
}
