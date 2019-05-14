import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,ScrollView} from 'react-native';
import { connect } from "react-redux";
import * as Actions from "../../actions";
import { getCookie } from "../../services/helpers";
import NavBar from '../../components/Navbar/navbar';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Immutable from "immutable";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import createReducers from "../../reducers";
import rootSaga from "../../sagas";
import {store} from "../../store";
import ProductList from '../../components/Product/productlist';
import Footer from '../../components/Footer/footer';
import {styles} from '../Home/home-styles';

class allCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
  }
  componentDidMount() {
    // console.log(this.props);
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

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
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
      <View>
        <NavBar />
      <ScrollView style={styles.body}>
     <Text>All Categories</Text>
      <View>

      {this.props.categoryProducts ? Object.values(this.props.categoryProducts).map((productsList,index)=>{
        console.log(productsList);
          return  (<ProductList products={productsList} />);
      }) : <Text/>}

      </View>
        <Footer />
      </ScrollView>
      </View>
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
    dispatch(Actions.getCategoryProducts.request(data))
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(allCategories);
