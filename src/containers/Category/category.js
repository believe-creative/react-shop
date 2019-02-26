import React, { Component } from "react";
import * as Actions from "../../actions";
import { connect } from "react-redux";
import ProductList from "../../components/Product/productlist";
import bag from "../../images/bag.png";
import "../../scss/categories.scss";

class Category extends Component {
  componentDidMount() {
    this.checkAndLoadSubCategories(this.props);
  }
  componentWillReceiveProps(props) {
    this.checkAndLoadSubCategories(props);
    const categoryName = props.match.params.category;
    const getsubCategories = props.subCategories
      ? props.subCategories[categoryName]
      : [];
  }
  render() {
    const categoryName = this.props.match.params.category;
    const getsubCategories = this.props.subCategories
      ? this.props.subCategories[categoryName]
      : [];


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
              <ul className="sub_categories list-unstyled">
                {getsubCategories
                  ? getsubCategories.map((category, index) => {
                      return (
                        <li>
                          <h2 className="category_name">{category.name}</h2>
                        </li>
                      );
                    })
                  : ""}
              </ul>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="product_filter_panel">
            <div className="row">
              <div className="col-md-12 items_block">
                <section>
                  {
                    <ProductList
                      products={
                        this.props.categoryProducts
                          ? this.props.categoryProducts[categoryName]
                          : []
                      }
                    />
                  }
                </section>
              </div>
            </div>
          </div>

          <div className="shop_brand_panel">
            <div className="row">
              <div className="col-md-6">
                <div className="shop_brand_block">
                  <h1 className="white">Converse</h1>
                  <h2 className="white">
                    Explore styles tough enough to handle all your workouts
                  </h2>
                  <p>
                    <a href="#" className="btn btn-lg">
                      Shop Now
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="subscribe_panel category_subscribe">
          <div className="container">
            <div className="row">
              <div className="col-md-12 subscribe_for_shop">
                <h3>SUBSCRIBE FOR SHOP NEWS,UPDATES AND SPECIAL OFFERS</h3>
                <div className="input_search">
                  {" "}
                  <form action="#" method="post">
                    {" "}
                    <i className="fas fa-envelope" />
                    <input
                      type="text"
                      value=""
                      placeholder="your email here"
                      className="search"
                    />
                    <a href="#" className="btn btn-md">
                      Subscribe
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
  checkAndLoadSubCategories(props) {
    const categoryName = props.match.params.category;
    var categoryNameLowerCase = categoryName.toLowerCase();

    if (props.categories) {
      var matchedDepartments = props.categories.filter(
        category => category.name.toLowerCase() == categoryNameLowerCase
      );
      var departmentId;
      if (matchedDepartments.length > 0) {
        departmentId = matchedDepartments[0].department_id;
      }

      if (!props.subCategories || !props.subCategories[categoryNameLowerCase]) {
        props.loadSubCategories(departmentId);
      }
      if (
        !props.categoryProducts ||
        !props.categoryProducts[categoryNameLowerCase]
      ) {
        props.loadCategoryProducts({
          departmentId: departmentId,
          descriptionLength: 120
        });
      }
    }
  }
}

const mapStateToProps = state => {
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
