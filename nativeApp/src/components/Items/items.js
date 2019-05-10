import React, { Component } from "react";
//import "../../scss/cart.scss";
import { connect } from "react-redux";
//import { LinkContainer } from "react-router-bootstrap";
//import { confirmAlert } from "react-confirm-alert";
import * as Actions from "../../actions";
//import "react-confirm-alert/src/react-confirm-alert.css";

import {Alert, Text, View,Button, TouchableOpacity, Image, ScrollView} from 'react-native';
import NavigationService from '../../routes/NavigationService.js';

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonStyles: {},
      cart: {}
    };
  }
  componentDidMount() {
    const props = this.props;
    let state = this.state;
    state["buttonStyles"] = {};
    if (props.cart) {
      if (props.cart.count !== undefined && props.cart.count != null) {
        if (props.cart.count <= 0) {
          state["buttonStyles"] = {};
        }
        state["cart"] = props.cart;
      }
    }
   
    if(props.cart){
      if (props.cart.count !== undefined && props.cart.count !== null) {
        if (
          this.state.cart.count === undefined ||
          this.state.cart.count === null
        ) {
          this.props.getCartProducts({
            token: props.token,
            inCartId: props.cart.inCartId
          });
        } else if (props.cart.count >0 && props.cart.products.length<=0) {
          this.props.getCartProducts({
            token: props.token,
            inCartId: props.cart.inCartId
          });
        }
        if (props.cart.count <= 0) {
          state["buttonStyles"] = {};
        }
        state["cart"] = props.cart;
      }
    }
    this.setState(state);
  }
  componentWillReceiveProps(props) {
    let state = this.state;
    state["buttonStyles"] = {};    
    if(props.cart){
      if (props.cart.count !== undefined && props.cart.count !== null) {
        if (
          this.state.cart.count === undefined ||
          this.state.cart.count === null
        ) {
          this.props.getCartProducts({
            token: props.token,
            inCartId: props.cart.inCartId
          });
        } else if (props.cart.count !== this.state.cart.count) {
          this.props.getCartProducts({
            token: props.token,
            inCartId: props.cart.inCartId
          });
        }
        if (props.cart.count <= 0) {
          state["buttonStyles"] = {};
        }
        state["cart"] = props.cart;
      }
    }
    this.setState(state);
  }
  remove(e) {
    // let props = this.props;
    // let this_ref = this;
    // let item = e.currentTarget.getAttribute("data-item");
    // confirmAlert({
    //   title: e.currentTarget.getAttribute("data-name"),
    //   message: "remove this product?",
    //   buttons: [
    //     {
    //       label: "Yes",
    //       onClick: () => {
    //         let state = this_ref.state;
    //         state["buttonStyles"] = { pointerEvents: "none" };
    //         this_ref.setState(state);
    //         return props.removeFromCart({ token: props.token, inItemId: item });
    //       }
    //     },
    //     {
    //       label: "No",
    //       onClick: () => {}
    //     }
    //   ]
    // });
  }
  update(e) {
    let state = this.state;
    console.log("updatebuttonclick",e);
    state["buttonStyles"] = {};
    this.setState(state);
    let count = parseInt(e.currentTarget.getAttribute("data-quantity"));
    let param = parseInt(e.currentTarget.getAttribute("data-param"));
    count = count + param;
    if (count < 0) {
      let state = this.state;
      state["buttonStyles"] = {};
      this.setState(state);
    } else {
      this.props.updateProductQuantity({
        token: this.props.token,
        inItemId: e.currentTarget.getAttribute("data-item"),
        inQuantity: count
      });
    }
  }
  render() {
    let cart = { count: 0, products: [] };
    if (this.props.cart) cart = this.props.cart;
    let hasItems = cart.count > 0 ? true : false;
    let this_ref = this;
    return (
      <ScrollView>
        <View>
        {hasItems ? (
          <View>            
              <View>                
                    <Text>{cart.count} Items In Your Cart</Text>                    
                      <View>
                        <Text>Item</Text>
                        <Text>Size</Text>
                        <Text>Quantity</Text>
                        <Text>Price</Text>
                      </View>                    
                    <View>
                      {cart.products.map(function(product, key) {
                        return (
                          <View key={key}>
                            <View>
                              <Text>
                                <Image
                                  source={require("../../images/product_images/afghan-flower-2.gif")}
                                />                                  
                                  <Text>{product.name}</Text>
                                  <Text>Men BK3569</Text>                                  
                                    <Text
                                      data-item={product.item_id}
                                      data-name={product.name}                                      
                                      onPress={this_ref.remove.bind(this_ref)}
                                    >&#10005; Remove
                                    </Text>                                
                              </Text>
                              <Text>XXL</Text>
                              <Text>
                                  <Text
                                    data-param="-1"
                                    data-item={product.item_id}
                                    data-quantity={product.quantity}                                    
                                    onPress={this_ref.update.bind(this_ref)}
                                  >
                                    &#8722;
                                  </Text>                                
                                <Text>
                                  {product.quantity}
                                </Text>                                
                                  <Text
                                    data-param="1"
                                    data-item={product.item_id}                                    
                                    data-quantity={product.quantity}
                                    onPress={this_ref.update.bind(this_ref)}
                                  >
                                    &#43;
                                  </Text>
                              </Text>
                              <Text>
                                ${(product.quantity * product.price).toFixed(2)}
                              </Text>
                            </View>                           
                          </View>
                        );
                      })}
                    </View>                  
              </View>
              <View>                              
                    <Text style={{padding: 10, fontSize: 14}} onPress={() => {
                      NavigationService.navigate('Categories', {
                        itemId: 1,
                        categoryName: "Regional",
                      });
                      }}>
                      Back to shop
                    </Text>
                    <Text style={{padding: 10, fontSize: 14}} onPress={() => {
                      NavigationService.navigate('Checkout');
                      }}>
                    Checkout
                  </Text>
              </View>            
          </View>
        ) : (
          <View>            
              <View>                
                  <Text>There no items in the cart.</Text>                
              </View>
              <View>                              
                  <Text style={{padding: 10, fontSize: 14}} onPress={() => {
                    NavigationService.navigate('Categories', {
                      itemId: 1,
                      categoryName: "Regional",
                    });
                    }}>
                    Back to shop
                  </Text>  
              </View>            
          </View>
        )}
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {    
    cart: state.get("products").cart,
    token: state.get("user").token
  };
};

const mapStateToDispatch = dispatch => ({  
  updateProductQuantity: data =>
    dispatch(Actions.updateProductQuantity.request(data)),
  removeFromCart: data => dispatch(Actions.removeFromCart.request(data)),
  getCartProducts: data => dispatch(Actions.getCartProducts.request(data))
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Items);
