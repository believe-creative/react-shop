/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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
import AnimatedLoader from "react-native-animated-loader";
type Props = {};

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = { token: "null", loaded: true, loading: true,visible: true };

  }
  componentDidMount() {

  console.log("dfgdfgdfg0fgfgfgf000");
  this.props.getToken();
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

    if (props.token) {
      if (this.state.token !== props.token) {
        this.setState({ token: props.token });
        if (!this.props.categories)
          this.props.getCategories({ token: props.token });
      }
    }
    if(props){
      this.setState({
        visible: false
      });
    }

  }
  render() {
    const { visible } = this.state;
    const { navigation } = this.props;
     const itemId = navigation.getParam('itemId', 'NO-ID');
     const categoryName = navigation.getParam('categoryName', 'NO-ID');
      console.log("Home screenffff",categoryName);
      return (
        <View>
          <NavBar />
        <ScrollView style={styles.body}>
        <View >
        <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../../lottie-loader.json")}
        animationStyle={{width: 100, height: 100}}
        speed={2}
      />
        <Text style={{...styles.h2, ...styles.black,...styles.cart_header}}>
          {categoryName}
        </Text>
        
        {this.props.categoryProducts ? Object.entries(this.props.categoryProducts).map(([key,productsList])=>{
          console.log(key,productsList,categoryName.toLowerCase()== key);
          if(categoryName.toLowerCase()== key){
                console.log(productsList);

                return  (<ProductList key={key} products={productsList} />);

          }
        }) : <Text/>}

        </View>
          <Footer />
        </ScrollView>
        </View>
        );
      }
}

const productRequest = Actions.products.request;
const checkUserLogin = Actions.checkUserLogin.request;

const mapStateToProps = state => ({
  subCategories: state.get("products").subCategories,
  categories: state.get("products").categories,
  categoryProducts: state.get("products").categoryProducts,
  cart: state.get("products").cart,
  token: state.get("user").token
});

const mapDispatchToProps = dispatch => ({
  productRequest,
  checkUserLogin,
  getCategories: data => dispatch(Actions.getCategories.request(data)),
  getCartProducts: inCartId =>
    dispatch(Actions.getCartProducts.request(inCartId)),
  getToken: () => dispatch(Actions.getToken.request()),
  loadCategoryProducts: data =>
    dispatch(Actions.getCategoryProducts.request(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
