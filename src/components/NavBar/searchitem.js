import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import * as Actions from "../../actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
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
    this.props.getSearchItems(this.state.searchResult);
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
                    <h2>SEARCH RESULTS FOR "{this.state.searchResult}"</h2>
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
            <h2>NO SEARCH RESULTS FOR "{this.state.searchResult}"</h2>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    searchItems: state.get("products").searchItem,
    location: state.get("router").location
  };
};
const mapStateToDispatch = dispatch => ({
  getSearchItems: searchitem =>
    dispatch(Actions.getSearchItems.request(searchitem))
});
export default connect(
  mapStateToProps,
  mapStateToDispatch
)(SearchItem);
