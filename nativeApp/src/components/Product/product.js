import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';
import { createDrawerNavigator,createStackNavigator, createAppContainer } from 'react-navigation';
import DropdownMenu from 'react-native-dropdown-menu';
import { connect } from "react-redux";
import * as Actions from "../../actions";
import NavigationService from '../../routes/NavigationService.js';
import {styles} from '../../containers/Home/home-styles';

export default class Product extends Component {

  constructor(props) {
    console.log("ProductList",props);
    super(props);
    this.state = {
      text: '',
    };
  }
  render() {
    console.log("ProductList",this.props);
    let productImage='../../images/product_images/a-partridge-in-a-pear-tree-2.gif';
    if(this.props.product){
      productImage='../../images/product_images/'+this.props.product.thumbnail;
    }
    console.log(productImage);
    return (
          <View style={styles.shop_now}>
            <Image style={{width: 100, height: 100, marginBottom: 10}}
              source={require('../../images/product_images/a-partridge-in-a-pear-tree-2.gif')}
            />
            <Text style={{...styles.h2, ...styles.title1}}>{this.props.product && this.props.product.name}</Text>
            <Text style={styles.shoptxt}>
              {this.props.product && this.props.product.description}
            </Text>
        </View>
        );
  }
}
