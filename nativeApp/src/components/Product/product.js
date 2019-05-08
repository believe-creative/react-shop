import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';
import { createDrawerNavigator,createStackNavigator, createAppContainer } from 'react-navigation';
import DropdownMenu from 'react-native-dropdown-menu';
import { connect } from "react-redux";
import * as Actions from "../../actions";
import NavigationService from '../../routes/NavigationService.js';
import {styles} from '../../containers/Home/home-styles';
import AsyncStorage from '@react-native-community/async-storage';
import SyncStorage from 'sync-storage';

 class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  addtoCart(e) {
    let cart = SyncStorage.get("react-shop-cart");    
    let props = this.props;
    if (cart) {
      if(cart.count){

      }
      else{
        cart = JSON.parse(cart);
      }
      
      props.AddToCart({
        token: props.token,
        inCartId: cart.inCartId,
        inProductId: this.props.product.product_id,
        inAttributes: null
      });
    } else {
      props.AddToCart({
        token: props.token,
        inCartId: null,
        inProductId: this.props.product.product_id,
        inAttributes: null
      });
    }

    this.setState({ show: "show", adding: true });
    setTimeout(() => {
      this.setState({
        show: ""
      });
    }, 1000);
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
				<Text style={{...styles.price, ...styles.red}}>{this.props.product && this.props.product.price}</Text>
            <TouchableOpacity onPress={this.addtoCart.bind(this)}><Text style={styles.button}>Add to cart</Text></TouchableOpacity>
        </View>
        );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.get("products").cart,
    token: state.get("user").token
  };
};

function mapDispatchToProps(dispatch) {
  return {
    AddToCart: (data) =>
      dispatch(Actions.AddToCart.request(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
