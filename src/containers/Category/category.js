import React, { Component } from "react";
import * as Actions from "../../actions";
import { connect } from "react-redux";
import ProductList from "../../components/Product/productlist";
import "../../scss/categories.scss";
import Pagination from "react-js-pagination";
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubCategory: false,
      activePage: 1,
      categoryId: null,
      departmentId: null
    };
    this.callSubCategories = this.callSubCategories.bind(this);
    this.hideSubCategory = this.hideSubCategory.bind(this);
  }
  componentDidMount() {
    this.checkAndLoadSubCategories(this.props);
    this.setState({ showSubCategory: false });
  }
  componentWillReceiveProps(props) {
    this.checkAndLoadSubCategories(props);
    const categoryName = props.match.params.category;
    if (categoryName !== this.previousCategoryName) {
      this.setState({ showSubCategory: false });
      this.previousCategoryName = categoryName;
    }
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
          inStartItem: 0
        });
      }
    }
    this.setState({
      showSubCategory: true,
      activePage: 1,
      categoryId: categoryId
    });
  }
  hideSubCategory() {
    this.setState({ showSubCategory: false });
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    if (this.state.showSubCategory) {
      this.props.loadSubCategoryProducts({
        token: this.props.token,
        categoryId: this.state.categoryId,
        descriptionLength: 120,
        inStartItem: (pageNumber - 1) * 10
      });
    } else {
      this.props.loadCategoryProducts({
        token: this.props.token,
        departmentId: this.state.departmentId,
        descriptionLength: 120,
        inStartItem: (pageNumber - 1) * 10
      });
    }
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
      ? this.props.subCategoryProducts[this.selectedSubCategoryName]
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
                {this.state.showSubCategory ? (
                  <h4 className="pb-4 breadcrumb-sub-cat-name">
                    <a onClick={this.hideSubCategory}>
                      {categoryName.charAt(0).toUpperCase() +
                        categoryName.slice(1)}
                    </a>{" "}
                    /&nbsp;
                    {this.selectedSubCategoryName.charAt(0).toUpperCase() +
                      this.selectedSubCategoryName.slice(1)}
                  </h4>
                ) : (
                  ""
                )}
                <div className="pagination-block">
                  <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={100}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                    prevPageText={"Back"}
                    nextPageText={"Forward"}
                    itemClassFirst={"first_page"}
                    itemClassLast={"last_page"}
                  />
                </div>
                <section>
                  {
                    <ProductList
                      products={
                        this.state.showSubCategory
                          ? subcategoryProducts
                          : categoryProducts
                      }
                    />
                  }
                </section>
                <div className="pagination-block">
                  <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={100}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                    prevPageText={"Back"}
                    nextPageText={"Forward"}
                    itemClassFirst={"first_page"}
                    itemClassLast={"last_page"}
                  />
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
          inStartItem: 0
        });
        this.setState({ departmentId: departmentId });
      }
    }
  }
}

const mapStateToProps = state => {
  // console.log(state.get("products"));
  return {
    subCategories: state.get("products").subCategories,
    categories: state.get("products").categories,
    categoryProducts: state.get("products").categoryProducts,
    subCategoryProducts: state.get("products").subCategoryProducts,
    token: state.get("user").token
  };
};

const mapStateToDispatch = dispatch => ({
  loadSubCategories: data => dispatch(Actions.getSubCategories.request(data)),
  loadCategoryProducts: data =>
    dispatch(Actions.getCategoryProducts.request(data)),
  loadSubCategoryProducts: data =>
    dispatch(Actions.getSubCategoryProducts.request(data))
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Category);
