import React, { Component } from "react";
import Footer from '../../components/Footer/footer';
import { connect } from "react-redux";
import { StyleSheet, View, Text, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import {styles} from '../../containers/Home/home-styles';

class Conformation extends Component {
  constructor(props) {
    super(props);
    this.stage = 1;
    this.state = {
      tableHead: ['Item', 'Qty', 'Price']      
    }
  }

  componentDidMount() {}
  backStage() {
    this.props.backStage(this.stage);
  }
  nextStage() {
    this.props.nextStage(this.stage);
  }
  render() {
    let cart = { count: 0, products: [] };
    let customer = {};
    let shippingoption = { shipping_type: "", shipping_cost: "" };
    if (this.props.cart) {
      cart = this.props.cart;
      if (cart.shippingoption) {
        shippingoption = cart.shippingoption;
      }
    }
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
    if (this.props.customer) customer = this.props.customer;

    const state = this.state;
    const tableData = [];    
    {cart.products.map(function(product, index) {     
      tableData.push([product.name,product.quantity,product.price]);        
    })}
    
    return (
      <ScrollView style={styles.confirmation_block}>
        <View>
          <Text style={{...styles.h3, ...styles.black}}>{"Order Summary"}</Text>
          <View>
              <Table borderStyle={{borderWidth: 0, borderColor: 'transparent'}}>
                <Row data={state.tableHead} style={styles.head} textStyle={styles.headtxt}/>
                <Rows data={tableData} textStyle={styles.ordertxt}/>
            </Table>
          </View>
        </View>
        <View>
        <Text style={{...styles.h3, ...styles.black, ...styles.space_top}}>{"Delivery Address"}</Text>
        {Object.keys(customer).map(function(key, index) {
                        if (
                          key === "address_1" ||
                          key === "address_2" ||
                          key === "city" ||
                          key === "country"
                        ) {
                          return <Text key={index}>{customer[key]}</Text>;
                        }
                      })}
        </View>
        <View>
            <Text style={{...styles.h3, ...styles.black, ...styles.space_top}}>{"Delivery Options"}</Text>
            <Text>{shippingoption.shipping_type}</Text>
        </View>
        <View>
            <View>
              <Text style={{...styles.h3, ...styles.black}}>{"Subtotal"} {totalAmount.toFixed(2)}</Text>
            </View>
            <View>
              <Text style={{...styles.h3, ...styles.black}}>{"Shipping"} {shippingoption.shipping_cost}</Text>
            </View>
            <View>
              <Text style={{...styles.h3, ...styles.black}}>{"Grand Total"} {(totalAmount + parseInt(shippingoption.shipping_cost)).toFixed(2)} </Text>
            </View>
        </View>
      <View style={{...styles.back_and_next_btn_block, ...styles.space_top}}>
			 <TouchableOpacity onPress={this.backStage.bind(this)}><Text style={styles.button}>Back</Text></TouchableOpacity>
			 <TouchableOpacity onPress={this.nextStage.bind(this)}><Text style={styles.button}>Next Step</Text></TouchableOpacity>
      </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    cart: state.get("products").cart,
    customer: state.get("user").customer,
    token: state.get("user").token
  };
};

export default connect(
  mapStateToProps,
  null
)(Conformation);
