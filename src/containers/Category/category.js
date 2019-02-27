import React, { Component } from "react";
import * as Actions from "../../actions";
import { connect } from "react-redux";
import ProductList from "../../components/Product/productlist";
import bag from "../../images/bag.png";
import "../../scss/categories.scss";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubCategory: false
    };
    this.callSubCategories = this.callSubCategories.bind(this);
  }
  componentDidMount() {
    this.checkAndLoadSubCategories(this.props);
    this.setState({ showSubCategory: false });
  }
  componentWillReceiveProps(props) {
    this.checkAndLoadSubCategories(props);
    const categoryName = props.match.params.category;
    const getsubCategories = props.subCategories
      ? props.subCategories[categoryName]
      : [];
  }
  callSubCategories(subcategoryName) {
    var categoryNameLowerCase = subcategoryName.target.id.toLowerCase();
    if (this.props.subCategories) {
      var categoryId;
      var allSubCategories = [];
      Object.values(this.props.subCategories).map(subCategory => {
        allSubCategories = [...allSubCategories, ...subCategory];
      });
      var matchedCategories = allSubCategories.filter(
        category => category.name.toLowerCase() == categoryNameLowerCase
      );
      if (matchedCategories.length > 0) {
        categoryId = matchedCategories[0].category_id;
      }
      if (!this.props.subCategoryProducts) {
        this.props.loadSubCategoryProducts({
          categoryId: categoryId,
          descriptionLength: 120
        });
      }
    }
    this.setState({ showSubCategory: true });
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
    let categoryProducts = this.props.categoryProducts
      ? this.props.categoryProducts[categoryName]
      : [];
    let subcategoryProducts = this.props.subCategoryProducts
      ? this.props.subCategoryProducts[categoryName]
      : [];
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
                      var subCategoryName = category.name.toLowerCase();
                      return (
                        <li key={index}>
                          <form action={"/categories/" + subCategoryName}>
                            <a
                              className="sub_categories_submit"
                              onClick={this.callSubCategories.bind(this)}
                            >
                              {" "}
                              <h2
                                className="category_name"
                                id={subCategoryName}
                              >
                                {category.name}
                              </h2>
                            </a>
                          </form>
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
                        categoryProducts == undefined
                          ? subcategoryProducts
                          : categoryProducts
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
    categoryProducts: state.get("products").categoryProducts,
    subCategoryProducts: state.get("products").subCategoryProducts
  };
};

const mapStateToDispatch = dispatch => ({
  loadSubCategories: categoryId =>
    dispatch(Actions.getSubCategories.request(categoryId)),
  loadCategoryProducts: data =>
    dispatch(Actions.getCategoryProducts.request(data)),
  loadSubCategoryProducts: data =>
    dispatch(Actions.getSubCategoryProducts.request(data))
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Category);
