import React, { Component } from "react";
import * as Actions from "../../actions";
import { connect } from "react-redux";
import ProductList from "../../components/Product/productlist";

import "../../scss/categories.scss";

class Category extends Component {
  componentWillReceiveProps(props) {
    //this.checkAndLoadSubCategories(categoryName);
    const categoryName = this.props.match.params.category;
    this.checkAndLoadSubCategories(categoryName, props);
  }
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
            <div className="category-list">
              <h1 className="category-header">
                {this.props.match.params.category}
              </h1>
            </div>
          </div>
        </section>
        <section>
          {<ProductList products={this.props.categoryProducts} />}
        </section>
      </div>
    );
  }
  checkAndLoadSubCategories(categoryName, props) {
    var categoryNameLoawerCase = categoryName.toLowerCase();
    if (props.categories) {
      var matchedDepartments = props.categories.filter(
        category => category.name.toLowerCase() == categoryNameLoawerCase
      );
      var departmentId;
      if (matchedDepartments.length > 0) {
        departmentId = matchedDepartments[0].department_id;
      }
      if (!props.subCategories) {
        props.loadSubCategories(departmentId);
      }
      if (!props.categoryProducts) {
        props.loadCategoryProducts({
          departmentId: departmentId,
          descriptionLength: 120
        });
      }
    }
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    subCategories: state.get("products").subCategories,
    categories: state.get("products").categories,
    categoryProducts: state.get("products").categoryProducts
  };
};

const mapStateToDispatch = dispatch => ({
  loadSubCategories: categoryId =>
    dispatch(Actions.getSubCategories.request(categoryId)),
  loadCategoryProducts: data =>
    dispatch(Actions.getCategoryProducts.request(data))
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Category);
