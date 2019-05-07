import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';
import { createDrawerNavigator,createStackNavigator, createAppContainer } from 'react-navigation';
import DropdownMenu from 'react-native-dropdown-menu';
import { connect } from "react-redux";
import * as Actions from "../../actions";
import NavigationService from '../../routes/NavigationService.js';
import Product from "./product";
export default class ProductList extends Component {

  constructor(props) {
    console.log("ProductList",props);
    super(props);
    this.state = {
      text: ''
    };
  }
  render() {
    console.log("ProductList",this.props);
    return (
        <View style={{flex: 0}}>
        {this.props.products &&
          this.props.products.map((product,index) => <Product key={index} product={product} />)}
        </View>
    );
  }
}
