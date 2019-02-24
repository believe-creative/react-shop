import React, { Component } from "react";
import "../../scss/categories.scss";

export default class Category extends Component {
  componentDidMount() {}
  render() {
    const categoryName = this.props.match.params.category;

    let backgroundImageURL = require(`../../images/category_${categoryName}.jpg`);
    let heroStyle = {
      backgroundImage: `url(${backgroundImageURL})`
    };
    return (
      <div>
        <section className="hero-section categories" style={heroStyle}>
          <div className="container">
            Category:{this.props.match.params.category}
          </div>
        </section>
      </div>
    );
  }
}
