import React, { Component } from "react";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import {Platform, StyleSheet, Text, View, Image,TouchableOpacity,Button} from 'react-native';
import { getCookie, deleteCookie } from "../../services/helpers";
import { setUser } from "../../actions";
import NavigationService from '../../routes/NavigationService.js';
import SyncStorage from 'sync-storage';
import {styles} from '../../containers/Home/home-styles'; 


class UserBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      cart: {}
    };
  }
  componentDidMount() {
    var c = SyncStorage.get("s-atk");
    if (c) {
      this.props.checkUserLogin(c);
    } 
  }
  componentWillReceiveProps(props, b, c) {
    console.log("props.cart",props.cart,this.state.cart);
    
    
    if (props.cart) {
      let productsCounts=0;
      if(props.cart.products)
      {

        for(var i=0;i<props.cart.products.length;i++)
        {
          productsCounts+=props.cart.products[i].quantity;
        }
      }
      if (
        props.cart.count !== null &&
        props.cart.count !== undefined &&
        props.cart.inCartId
      ) {
        if (
          this.state.cart.count === null ||
          this.state.cart.count === undefined
        ) {
          this.props.getCartProducts({token:props.token,inCartId:props.cart.inCartId});
        } else if (props.cart.count !== productsCounts) {
          this.props.getCartProducts({token:props.token,inCartId:props.cart.inCartId});
        }
        this.setState({ cart: props.cart });
      }
    }
  }
  logout() {
    SyncStorage.remove('s-atk');
    this.props.setUser({ email: null, name: null, photo: null });
  }
  render() {
    let name = null;
    let totalAmount = 0;
    if (this.props.user) {
      name = this.props.user.name;
    }
    if (this.props.cart) {
      let cart = this.props.cart;
      if (cart.products) {
        for (var i = 0; i < cart.products.length; i++) {
          totalAmount =
            totalAmount + cart.products[i].price * cart.products[i].quantity;
        }
      }
    }
    totalAmount = Math.round(totalAmount * 100) / 100;

    return (
        <View style={styles.topbar}>
            <View style={styles.topleft}>
                <Text style={{...styles.hiblock, ...styles.toptext}}>Hi! </Text>
              {name ? (
                <Text style={{...styles.login_name_block, ...styles.toptext}}>{name}</Text>
              ) : (
		 				<TouchableOpacity  onPress={() => {NavigationService.navigate('Login');}}><Text style={{...styles.signin}}>Sign in</Text></TouchableOpacity>
              )}
				  
            </View>
            <View style={styles.toprightblock}>
                <Text style={styles.toptext}>Your bag: ${totalAmount}</Text>
              {name ? (
				  	 <TouchableOpacity  onPress={this.logout.bind(this)}><Text style={{...styles.logout, ...styles.toptext}}>Logout</Text></TouchableOpacity>
            ) : (
              <View/>
            )}
            </View>
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.get("user"),
    cart: state.get("products").cart,
    token:state.get("user").token
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setUser: user => dispatch(setUser(user)),
    checkUserLogin: token => dispatch(Actions.checkUserLogin.request(token)),
    getCartProducts: data => dispatch(Actions.getCartProducts.request(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure:false}
)(UserBlock);
