import React, { Component } from "react";
import * as Actions from "../../actions";
import { connect } from "react-redux";
import ProductList from "../../components/Product/productlist";
import "../../scss/categories.scss";
import Pagination from "react-js-pagination";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      cart: null
    };
  }
  componentDidMount() {
    console.log(this.props);
    if (this.props.categories) {
      Object.values(this.props.categories).map((category, index) => {
        this.props.loadCategoryProducts({
          token: this.props.token,
          departmentId: category.department_id,
          descriptionLength: 120,
          inStartItem: 0,
          inProductsPerPage: 10000
        });
        return category;
      });
    }
  }
  componentWillReceiveProps(props) {
    let localCart = JSON.parse(localStorage.getItem("react-shop-cart"));
    if (localCart != null) {
      if (this.state.cart === null || this.state.cart === undefined) {
        this.props.getCartProducts({
          token: props.token,
          inCartId: localCart.inCartId
        });
      } else if (props.cart.count !== this.state.cart.count) {
        this.props.getCartProducts({
          token: props.token,
          inCartId: props.cart.inCartId
        });
      }
      this.setState({ cart: props.cart });
    }
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    console.log(pageNumber);
  }
  render() {
    let productsList = [];
    let productCategoriesList = this.props.categoryProducts
      ? Object.values(this.props.categoryProducts)
      : [];
    productCategoriesList.map((category, index) => {
      category.map((item, ind) => {
        productsList.push(item);
        return item;
      });
      return category;
    });
    let totalItemsCount = productsList.length;
    productsList = productsList.sort(function(a, b) {
      if (a.createdAt < b.createdAt) {
        return -1;
      } else if (a.createdAt > b.createdAt) {
        return 1;
      }
      return 0;
    });
    productsList = productsList.splice((this.state.activePage - 1) * 10, 10);
    return (
      <div className="container">
        <div className="product_filter_panel">
          <div className="row">
            <div className="col-md-12 items_block">
              <div className="pb-3">
                <h2>ALL PRODUCTS</h2>
              </div>
              <div>
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={10}
                  totalItemsCount={totalItemsCount}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
                  innerClass={"pagination-block pb-4"}
                  prevPageText={"Back"}
                  nextPageText={"Forward"}
                  itemClassPrev={"back"}
                  itemClassNext={"forward"}
                  itemClassFirst={"first_page"}
                  itemClassLast={"last_page"}
                />
              </div>
              <section>
                {<ProductList products={productsList ? productsList : []} />}
              </section>
              <div>
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={10}
                  totalItemsCount={totalItemsCount}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
                  innerClass={"pagination-block pb-4"}
                  prevPageText={"Back"}
                  nextPageText={"Forward"}
                  itemClassPrev={"back"}
                  itemClassNext={"forward"}
                  itemClassFirst={"first_page"}
                  itemClassLast={"last_page"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    subCategories: state.get("products").subCategories,
    categories: state.get("products").categories,
    categoryProducts: state.get("products").categoryProducts,
    searchitem: state.get("products").searchItem,
    token: state.get("user").token,
    cart: state.get("products").cart
  };
};

const mapStateToDispatch = dispatch => ({
  loadCategoryProducts: data =>
    dispatch(Actions.getCategoryProducts.request(data)),
  getCartProducts: inCartId =>
    dispatch(Actions.getCartProducts.request(inCartId))
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Categories);
