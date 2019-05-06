/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import { connect } from "react-redux";
import * as Actions from "../../actions";
import { getCookie } from "../../services/helpers";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Immutable from "immutable";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import createReducers from "../../reducers";
import rootSaga from "../../sagas";
import {store} from "../../store";


type Props = {};

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = { token: "null", loaded: true, loading: true };

  }
  componentDidMount() {

  console.log("dfgdfgdfg0fgfgfgf000");
  this.props.getToken();

  }

  componentWillReceiveProps(props) {

    if (props.token) {
      if (this.state.token !== props.token) {
        this.setState({ token: props.token });
        if (!this.props.categories)
          this.props.getCategories({ token: props.token });
      }
    }

  }
  render() {
    console.log("Home screenffff",this.props);
    const { navigation } = this.props;
     const itemId = navigation.getParam('itemId', 'NO-ID');
     const categoryName = navigation.getParam('categoryName', 'NO-ID');
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

          <Text>CATEGORIES Screen {categoryName} : {JSON.stringify(itemId)}</Text>

        </View>
        );
      }
}

const productRequest = Actions.products.request;
const checkUserLogin = Actions.checkUserLogin.request;

const mapStateToProps = state => ({
  categories: state.get("products").categories,
  cart: state.get("products").cart,
  token: state.get("user").token
});

const mapDispatchToProps = dispatch => ({
  productRequest,
  checkUserLogin,
  getCategories: data => dispatch(Actions.getCategories.request(data)),
  getCartProducts: inCartId =>
    dispatch(Actions.getCartProducts.request(inCartId)),
  getToken: () => dispatch(Actions.getToken.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
