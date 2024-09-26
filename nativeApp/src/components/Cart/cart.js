import React, { Component } from "react";
import {Text, View, Image,TouchableOpacity} from 'react-native';

import NavigationService from '../../routes/NavigationService.js';
import {styles} from '../../containers/Home/home-styles';

export default class Cart extends Component {
  render() {
    return (
		 <TouchableOpacity onPress={() => { 
			 if(this.props.stage){
				this.props.stage(0);
			 }			
			 NavigationService.navigate('Items')}}>
		 	<View style={styles.cart_block}>
				<Image style={{width: 20, height: 25,}} source={require('../../images/shopping-cart-bag.png')} />
				<Text style={styles.cartcount}>{this.props.cartItems}</Text>
			</View>
		</TouchableOpacity> 
    );
  }
}
