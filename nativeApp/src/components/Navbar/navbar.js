import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TouchableOpacity, Animated,Easing} from 'react-native';
import { createDrawerNavigator,createStackNavigator, createAppContainer } from 'react-navigation';
import DropdownMenu from 'react-native-dropdown-menu';
import { connect } from "react-redux";
import * as Actions from "../../actions";
import NavigationService from '../../routes/NavigationService.js';
import Cart from "../Cart/cart";
import SyncStorage from 'sync-storage';
import UserBlock from '../UserBlock/userblock';
import {styles} from './navbar-styles';

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  componentDidMount() {
  this.props.getToken();
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
 
  render() {    
    let { cart }  = this.props;
    if (!cart) cart = { count: 0 };
    return (
      <View style={styles.header}>
		    <View style={styles.headtop}>
		      <View style={styles.burgermenu}>
          <TouchableOpacity  onPress={()=>NavigationService.openDrawer()}>
          <Image
            source={require('../../images/menu_icon.png')}
            style={{ width: 40, height: 25, marginTop: 5, }}
          />
        </TouchableOpacity  >
			 </View>
        <View style={styles.logo}>
        <TouchableOpacity  onPress={() => {
              if(this.props.stage){
                this.props.stage(0);
              }
              if(this.state.menuOpen == true ){
                 this.setState({menuOpen:!this.state.menuOpen})
              }
               NavigationService.navigate('Home');
           }}>
		         <Image
             style={{width: 84, height: 38 }}
             source={require('../../images/proof-of-concept.png')}
             />
          </TouchableOpacity  >
		  </View>
      <View>
          <TouchableOpacity onPress={() => {
            if(this.props.stage){
              this.props.stage(0);
            }
					      NavigationService.navigate('SearchItem');
					 }}>
          <Image
			  		source={require('../../images/search-icon.png')}
					  style={{ width: 32, height: 32, marginTop:5, marginRight:10}} />
          </TouchableOpacity>
      </View>
		  <View style={{ width: 20, height: 25, marginLeft: 5, marginTop: 10, }}><Cart stage={this.props.stage} cartItems={cart.count} /></View>
			</View>
   </View>
    );
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
)(NavBar);
