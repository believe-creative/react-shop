import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import UserBlock from '../components/UserBlock/userblock';
import {Platform, StyleSheet, Text, View, Image,ImageBackground,TouchableOpacity, Animated,Easing} from 'react-native';
import { connect } from "react-redux";
import * as Actions from "../actions";
import NavigationService from './NavigationService.js';
import Cart from "../components/Cart/cart";
import SyncStorage from 'sync-storage';
import {styles} from '../components/Navbar/navbar-styles';

class drawerContentComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      menuOpen:false,
    };
  }
  componentDidMount() {
  this.props.getToken();
  var c = SyncStorage.get("s-atk");
  if (c) {
    this.props.checkUserLogin(c);
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
    let localCart = SyncStorage.get("react-shop-cart");
      if (localCart != null) {
        if (this.state.cart === null || this.state.cart === undefined) {
          this.props.getCartProducts({
            token: props.token,
            inCartId: localCart.inCartId
          });
        } else if (props.cart.count !== this.state.cart.count) {
          this.props.getCartProducts({
            token: props.token,
            inCartId: props.cart.inCartId
          });
        }
        this.setState({ cart: props.cart });
      }

  }

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);

    })

    menuItemsList(){
        console.log("Menu Items",this.props.categories);
          if(this.props.categories){
          return Object.values(this.props.categories).map((e,index)=>{
            return (<View key={index} style={[styles.screenStyle, (this.props.activeItemKey=='Login') ? styles.activeBackgroundColor : null]}>
                <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Login') ? styles.selectedTextStyle : null]} onPress={() => {
                       NavigationService.navigate('Categories', {
                     itemId: e.department_id,
                     categoryName: e.name,
                   });
                   }}>{e.name}</Text>
            </View>

          );
        })
        }
      }

  render() {
    let { cart }  = this.props;
    if (!cart) cart = { count: 0 };

    return (
        <View style={styles.container}>
            <View style={styles.screenContainer}>
                <View ><UserBlock /></View>
                <View style={styles.menu_list} >{this.menuItemsList()}</View >
            </View>
        </View>
    )
  }
}
const productRequest = Actions.products.request;
const checkUserLogin = Actions.checkUserLogin.request;

const mapStateToProps = state => ({
  user: state.get("user"),
  categories: state.get("products").categories,
  cart: state.get("products").cart,
  token: state.get("user").token
});

const mapDispatchToProps = dispatch => ({
  productRequest,
  checkUserLogin,
    setUser: user => dispatch(setUser(user)),
    checkUserLogin: token => dispatch(Actions.checkUserLogin.request(token)),
  getCategories: data => dispatch(Actions.getCategories.request(data)),
  getCartProducts: inCartId =>
    dispatch(Actions.getCartProducts.request(inCartId)),
  getToken: () => dispatch(Actions.getToken.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(drawerContentComponents);
