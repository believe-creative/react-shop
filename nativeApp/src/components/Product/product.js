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
import {SERVER_ROOT} from '../../services/constants';


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
        cart = cart;
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
  componentDidMount(){
  
  }
  componentWillReceiveProps(props){

  }
  render() {
    let productImage,productId = '';

    if(this.props.product.thumbnail){
        productImage = SERVER_ROOT + "images/product_images/" +this.props.product.thumbnail;
        productId= this.props.product.product_id;
    }else{
        productImage = "";
        productId="";
    }
    return (
          <View style={styles.item}>
           <TouchableOpacity
            onPress={() => {
            this.props.setCurrentProduct(productId);
             NavigationService.navigate('ProductDetails', {productid: productId});
            }}

            style={styles.center} >
            <Image style={{width: 320, height: 250, marginBottom: 10}}
              source={{uri:productImage}}
            />
            </TouchableOpacity>
            <Text style={{...styles.h2, ...styles.black}}>{this.props.product.name && this.props.product.name}</Text>
				        <Text style={{...styles.price, ...styles.red}}>{this.props.product.price && this.props.product.price}</Text>
            <TouchableOpacity onPress={this.addtoCart.bind(this)}><Text style={styles.button}>Add to cart</Text></TouchableOpacity>
        </View>
        );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.get("products").cart,
    token: state.get("user").token,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    AddToCart: (data) =>
      dispatch(Actions.AddToCart.request(data)),
    setCurrentProduct: (product_id) =>
        dispatch(Actions.setCurrentProduct(product_id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure:false}
)(Product);
