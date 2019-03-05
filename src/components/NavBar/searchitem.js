import React, { Component } from "react";
import * as Actions from "../../actions";
import { connect } from "react-redux";
import ProductList from "../Product/productlist";
import "../../scss/cart.scss";

class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: props.location.pathname.replace("/search/", "")
    };
  }
  componentDidMount() {
    this.props.getSearchItems({token:this.props.token,searchTerm:this.state.searchResult});
  }
  render() {
    if (this.props.searchItems && this.props.searchItems.length > 0) {
      return (
        <React.Fragment>
          <div className="container">
            <div className="product_filter_panel">
              <div className="row">
                <div className="col-md-12 items_block">
                  <div className="pb-3">
                    <h2>Search Results For "{this.state.searchResult}"</h2>
                  </div>
                  <section>
                    {
                      <ProductList
                        products={
                          this.props.searchItems ? this.props.searchItems : []
                        }
                      />
                    }
                  </section>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div className="container">
          <div className="pt-5">
            <h2>No Search Results For "{this.state.searchResult}"</h2>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    searchItems: state.get("products").searchItem,
    location: state.get("router").location,
    token:state.get("user").token
  };
};
const mapStateToDispatch = dispatch => ({
  getSearchItems: data =>
    dispatch(Actions.getSearchItems.request(data))
});
export default connect(
  mapStateToProps,
  mapStateToDispatch
)(SearchItem);
