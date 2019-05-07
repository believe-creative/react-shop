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
    super(props);
    this.state = {
      text: '',
    };
  }
  render() {
    let productImage='../../images/product_images/a-partridge-in-a-pear-tree-2.gif';
    if(this.props.product){
      productImage='../../images/product_images/'+this.props.product.thumbnail;
    }
    return (
          <View style={styles.item}>
            <Image style={{width: 320, height: 250, marginBottom: 10}}
              source={require('../../images/product_images/a-partridge-in-a-pear-tree-2.gif')}
            />
            <Text style={{...styles.h2, ...styles.black}}>{this.props.product && this.props.product.name}</Text>
				<Text style={{...styles.price, ...styles.red}}>$16.99</Text>
            <TouchableOpacity onPress={() => Linking.openURL('/categories')}><Text style={styles.button}>Add to cart</Text></TouchableOpacity>
        </View>
        );
  }
}
