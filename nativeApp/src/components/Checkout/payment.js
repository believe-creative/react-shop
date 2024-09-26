import React, { Component } from "react";
import axios from "axios";
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import stripe from 'tipsi-stripe';
import { API_ROOT } from "../../services/constants";
import {styles} from '../../containers/Home/home-styles';
import Footer from '../../components/Footer/footer';
import AnimatedLoader from "react-native-animated-loader";
class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      errors: null,
      visible:false
    };
    this.stage = 2;
    stripe.setOptions({
      publishableKey: 'pk_test_7bmdPQNsz569HDDDKiNUn76k',
    });
  }
  backStage() {
    this.props.backStage(this.stage);
  }
  nextStage() {
    this.props.nextStage(this.stage);
  }
 
  showErrors() {
    if (this.state.errors) {
      return <View >{this.state.errors}</View>;
    } else {
      return <View />;
    }
  }
  requestPayment = () => {
    let this_ref = this;
    // We don't want to let default form submission happen here, which would refresh the page.
    let totalAmount = 0;
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
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    // console.log(this_ref.props.token);
    let getShippingAddress = {};
    if (this.props.address) {
      getShippingAddress = {
        address_name: this.props.address.address_name,
        address_1: this.props.address.address_1,
        address_2: this.props.address.address_2,
        city: this.props.address.city,
        postal_code: this.props.address.postal_code,
        country: this.props.address.country,
        day_phone: this.props.address.day_phone,
        eve_phone: this.props.address.eve_phone,
        mob_phone: this.props.address.mob_phone
      };
    }
    return stripe
      .paymentRequestWithCardForm()
      .then(stripeTokenInfo => {        
        this.setState({ visible: true });
        axios
        .post(
          API_ROOT + "payment",
          {
            email: this_ref.props.user.email.trim(),
            id: stripeTokenInfo.tokenId,
            inCartId: this_ref.props.cart.inCartId,
            inOrderAddress: JSON.stringify(getShippingAddress),
            inCustomerId: null,
            inShippingId: this_ref.props.cart.shippingoption.shipping_id,
            amount:
              totalAmount + parseInt(this_ref.props.cart.shippingoption.shipping_cost),
            inTaxId: 1
          },
          { headers: { Authorization: `Bearer ${this_ref.props.token}` } }
        )
        .then(function(res) {
          if (res.data.status === "error") {
            this_ref.setState({ errors: res.data.msg });
          } else {
            this_ref.setState({ errors: null });
            this_ref.props.nextStage(this_ref.stage);
          }
          this_ref.setState({ visible: false });
        })
        
      })
      .catch(error => {
        console.warn('Payment failed', { error });
        this.setState({ visible: false });
      });
  };
  
  render() {
    const {visible} = this.state;
    return (
      
      <View style={styles.confirmation_block}>
      <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../../lottie-loader.json")}
          animationStyle={{width: 100, height: 100}}
          speed={2}
        />
      {this.showErrors()}
      <View style={styles.back_and_next_btn_block}>
		  <TouchableOpacity onPress={this.backStage.bind(this)}><Text style={styles.button}>Back</Text></TouchableOpacity>
		  <TouchableOpacity onPress={this.requestPayment}><Text style={styles.button}>Make a Payment</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Payment;
