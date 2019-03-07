import React, { Component } from "react";
import * as Actions from "../../actions";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import ProductList from "../../components/Product/productlist";
import "../../scss/categories.scss";
import Pagination from "react-js-pagination";
import { ClipLoader } from "react-spinners";
import { LinkContainer } from "react-router-bootstrap";

const history = createBrowserHistory();

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubCategory: false,
      activePage: 1,
      categoryId: null,
      departmentId: null,
      cart: null,
      loading: true
    };
    this.callSubCategories = this.callSubCategories.bind(this);
    this.hideSubCategory = this.hideSubCategory.bind(this);
  }
  componentDidMount() {
    this.checkAndLoadSubCategories(this.props);
    this.setState({ showSubCategory: false });
  }
  componentWillReceiveProps(props) {
    this.setState({ activePage: 1 });
    this.checkAndLoadSubCategories(props);
    const categoryName = props.match.params.category;
    this.previousCategoryName = categoryName;
  }
  callSubCategories(subcategoryName) {
    var categoryNameLowerCase = subcategoryName.target.id.toLowerCase();
    this.selectedSubCategoryName = categoryNameLowerCase;
    if (this.props.subCategories) {
      var categoryId;
      var allSubCategories = [];
      Object.values(this.props.subCategories).map(subCategory => {
        allSubCategories = [...allSubCategories, ...subCategory];
        return subCategory;
      });
      var matchedCategories = allSubCategories.filter(
        category => category.name.toLowerCase() === categoryNameLowerCase
      );
      if (matchedCategories.length > 0) {
        categoryId = matchedCategories[0].category_id;
      }
      if (
        !this.props.subCategoryProducts ||
        !this.props.subCategoryProducts[categoryNameLowerCase]
      ) {
        this.props.loadSubCategoryProducts({
          token: this.props.token,
          categoryId: categoryId,
          descriptionLength: 120,
          inStartItem: 0,
          inProductsPerPage: 10000
        });
      }
      this.props.setSubCategory(true);
    }

    this.setState({
      showSubCategory: true,
      activePage: 1,
      categoryId: categoryId
    });
  }
  hideSubCategory() {
    this.props.setSubCategory(false);
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  render() {
    // console.log(this.props);
    const categoryName = this.props.match.params.category;
    const getsubCategories = this.props.subCategories
      ? this.props.subCategories[categoryName]
      : [];

    let backgroundImageURL = require(`../../images/category_${categoryName}.jpg`);
    let heroStyle = {
      backgroundImage: `url(${backgroundImageURL})`
    };
    let categoryProducts = [];
    let subcategoryProducts = [];
    if (this.props.categoryProducts) {
      if (this.props.categoryProducts[categoryName]) {
        categoryProducts = this.props.categoryProducts[categoryName];
      }
    }
    if (this.props.subCategoryProducts) {
      if (this.props.subCategoryProducts[this.selectedSubCategoryName]) {
        subcategoryProducts = this.props.subCategoryProducts[
          this.selectedSubCategoryName
        ];
      }
    }

    let length = 50;
    let categoryProductsGot = [];
    let categorysubProductsGot = [];
    if (this.props.showSubCategory) {
      if (subcategoryProducts.length > 0) {
        length = subcategoryProducts.length;
        categorysubProductsGot = subcategoryProducts.slice(
          (this.state.activePage - 1) * 10,
          (this.state.activePage - 1) * 10 + 10
        );
      }
    } else if (categoryProducts.length > 0) {
      length = categoryProducts.length;
      categoryProductsGot = categoryProducts.slice(
        (this.state.activePage - 1) * 10,
        (this.state.activePage - 1) * 10 + 10
      );
    }
    console.log(this.props);
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
                          <a
                            className="sub_categories_submit"
                            onClick={this.callSubCategories.bind(this)}
                          >
                            {" "}
                            <h2 className="category_name" id={subCategoryName}>
                              {category.name}
                            </h2>
                          </a>
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
                {this.props.showSubCategory ? (
                  <h4 className="pb-4 breadcrumb-sub-cat-name">
                    <a onClick={this.hideSubCategory}>
                      {categoryName.charAt(0).toUpperCase() +
                        categoryName.slice(1)}
                    </a>
                    /&nbsp;
                    {this.selectedSubCategoryName
                      ? this.selectedSubCategoryName.charAt(0).toUpperCase() +
                        this.selectedSubCategoryName.slice(1)
                      : ""}
                  </h4>
                ) : (
                  ""
                )}
                <div>
                  {categoryProducts.length > 0 ? (
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={10}
                      totalItemsCount={length}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange.bind(this)}
                      hideFirstLastPages={"false"}
                      innerClass={"pagination-block pb-4"}
                      prevPageText={"<"}
                      nextPageText={">"}
                      itemClassPrev={"back"}
                      itemClassNext={"forward"}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <section className="category_products">
                  {(!this.props.showSubCategory &&
                    categoryProducts.length > 0) ||
                  (this.props.showSubCategory &&
                    subcategoryProducts.length > 0) ? (
                    <ProductList
                      products={
                        this.props.showSubCategory
                          ? categorysubProductsGot
                          : categoryProductsGot
                      }
                    />
                  ) : (
                    <div className="clip_loader">
                      <ClipLoader
                        sizeUnit={"px"}
                        size={80}
                        color={"#f62f5e"}
                        loading={this.state.loading}
                      />
                    </div>
                  )}
                </section>
                <div>
                  {categoryProducts.length > 0 ? (
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={10}
                      totalItemsCount={length}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange.bind(this)}
                      hideFirstLastPages={"false"}
                      innerClass={"pagination-block pb-4"}
                      prevPageText={"<"}
                      nextPageText={">"}
                      itemClassPrev={"back"}
                      itemClassNext={"forward"}
                    />
                  ) : (
                    ""
                  )}
                </div>
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
      </div>
    );
  }
  checkAndLoadSubCategories(props) {
    const categoryName = props.match.params.category;
    var categoryNameLowerCase = categoryName.toLowerCase();

    if (props.categories) {
      var matchedDepartments = props.categories.filter(
        category => category.name.toLowerCase() === categoryNameLowerCase
      );

      var departmentId;
      if (matchedDepartments.length > 0) {
        departmentId = matchedDepartments[0].department_id;
      }

      if (!props.subCategories || !props.subCategories[categoryNameLowerCase]) {
        props.loadSubCategories({
          token: props.token,
          inDepartmentId: departmentId
        });
      }

      if (
        !props.categoryProducts ||
        !props.categoryProducts[categoryNameLowerCase]
      ) {
        props.loadCategoryProducts({
          token: props.token,
          departmentId: departmentId,
          descriptionLength: 120,
          inStartItem: 0,
          inProductsPerPage: 10000
        });
        this.setState({ departmentId: departmentId });
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    subCategories: state.get("products").subCategories,
    categories: state.get("products").categories,
    categoryProducts: state.get("products").categoryProducts,
    subCategoryProducts: state.get("products").subCategoryProducts,
    token: state.get("user").token,
    cart: state.get("products").cart,
    showSubCategory: state.get("showSubCategory").showSubCategory
  };
};

const mapStateToDispatch = dispatch => ({
  loadSubCategories: data => dispatch(Actions.getSubCategories.request(data)),
  loadCategoryProducts: data =>
    dispatch(Actions.getCategoryProducts.request(data)),
  loadSubCategoryProducts: data =>
    dispatch(Actions.getSubCategoryProducts.request(data)),
  setSubCategory: data => dispatch(Actions.setSubCategory(data))
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Category);
