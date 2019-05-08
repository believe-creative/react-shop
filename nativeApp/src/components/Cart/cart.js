import React, { Component } from "react";
import {Text, View, Image,TouchableOpacity} from 'react-native';

import NavigationService from '../../routes/NavigationService.js';

export default class Cart extends Component {
  render() {
    return (       
        <Text onPress={() => {
          NavigationService.navigate('Items');
      }}> 
      <Image style={{width: 30, height: 32}} source={require('../../images/shopping-cart-bag.png')} /> {this.props.cartItems}
      </Text>      
    );
  }
}
