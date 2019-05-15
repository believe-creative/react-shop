import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import UserBlock from '../components/UserBlock/userblock';
import { white } from 'ansi-colors';
import {Platform, StyleSheet, Text, View, Image,ImageBackground,TouchableOpacity, Animated,Easing} from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import { connect } from "react-redux";
import * as Actions from "../actions";
import NavigationService from './NavigationService.js';
import Cart from "../components/Cart/cart";
import SyncStorage from 'sync-storage';
class drawerContentComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      menuOpen:false,
    };
    this.spinValue = new Animated.Value(0);
  }
  componentDidMount() {
  this.props.getToken();
  this.spin();
  }

  spin () {
  this.spinValue.setValue(0)
  Animated.timing(
    this.spinValue,
    {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear
    }
  ).start(() => this.spin())
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
    console.log(this);
    return (
        <View style={styles.container}>
            <View style={styles.screenContainer}>
                <View ><UserBlock/></View>
                <View >{this.menuItemsList()}</View >
                <View style={[styles.screenStyle, (this.props.activeItemKey=='Login') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Login') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Login')}>Logout</Text>
                </View>
            </View>
        </View>
    )
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
  mapDispatchToProps,
  null,
  { pure: false }
)(drawerContentComponents);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerContainer: {
        height: 150,
    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: {
        paddingTop: 0,
        width: '100%',
    },
    screenStyle: {
        paddingTop: 50,
        height: 30,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20,
        textAlign: 'center'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: '#00adff'
    },
    activeBackgroundColor: {
        backgroundColor: 'grey'
    }
});
