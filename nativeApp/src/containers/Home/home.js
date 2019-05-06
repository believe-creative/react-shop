/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Footer from '../../components/Footer/footer';
import {Platform, StyleSheet, Text, View,Button, Linking, TouchableOpacity, Image, ScrollView} from 'react-native';
import { connect } from "react-redux";
import * as Actions from "../../actions";
import { getCookie } from "../../services/helpers";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Immutable from "immutable";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import createReducers from "../../reducers";
import rootSaga from "../../sagas";
import {store} from "../../store";
import {styles} from './home-styles'; 

type Props = {};

function demoAsyncCall() {
  return new Promise(resolve => setTimeout(() => resolve(), 2500));
}

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { token: "null", loaded: true, loading: true };

  }
  componentDidMount() {

  

  }

  componentWillReceiveProps(props) {
    if (props.token) {
      if (this.state.token !== props.token) {
        this.setState({ token: props.token });
        if (!this.props.categories)
          this.props.getCategories({ token: props.token });
      }
    }

  }
  render() {      
      return (        
			<ScrollView style={styles.home}>               
          <View style={styles.banner}>
			 	<Text style={styles.h1}>Background and development</Text>
			 	<Text style={styles.h2}>Convergent the dictates of the consumer: background and development</Text>
          	<TouchableOpacity onPress={() => Linking.openURL('/categories')}><Text style={styles.button}>View All</Text></TouchableOpacity>
			 </View> 
            <View style={styles.shop_now_panel}>
            <View style={styles.product_panel}>
					<Text style={styles.sale}>Sale</Text>
              <View style={styles.shop_now}>
					  <Image style={{width: 100, height: 100, marginBottom: 10}}                 
                  source={require('../../images/bag.png')}                  
                />
                <Text style={{...styles.h2, ...styles.title1}}>Vera Bradley</Text>  
                <Text style={styles.shoptxt}>
                  Carry the day in the style with this extra-large tote crafted in our chic B.B. Collection textured PVC. Featuring colorful faux leather trim,this tote offers a roomy interior plus just enough perfectly placed. 
                </Text>                
                <TouchableOpacity onPress={() => Linking.openURL('/categories')}><Text style={styles.button}>Shop Now</Text></TouchableOpacity>                 
              </View>
            </View>
          </View>
			 
			  <View style={styles.wow_block}>
                  <Text h1>WOW</Text>
                  <Text h2 style={{"color":"red"}}>Check</Text>                  
                  <Text h2 style={{"color":"red"}}>WHAT!</Text>
           </View>			 
				<View style={styles.wow_block}>
            	<Text h1>Men</Text>
            </View>
          <View style={styles.register_panel}>
            <View style={styles.shop_now_panel}>              
              <View>
                <View style={styles.game_begin_block}>
                <Image
                  style={{width: 50, height: 50}}                 
                  source={require('../../images/pop_image.png')}                  
                />
                  <View style={styles.game_sub_block}>
                    <Text h1>Let The Game begin</Text>
                    <Text h2>Registration is on - get ready for the Open</Text>
                    <TouchableOpacity onPress={() => Linking.openURL('/login')}>
                      <Text style={styles.button}>
                        Register
                      </Text>
                    </TouchableOpacity> 
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Footer />           
      </ScrollView>
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
  mapDispatchToProps
)(HomeScreen);
