import React, { Component } from "react";

import { connect } from "react-redux";
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

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
      <ScrollView>
        <View>
          <Text>{"Order Summary"}</Text>
          <View>
              <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                <Rows data={tableData} textStyle={styles.text}/>
            </Table>
          </View>
        </View>
        <View>
        <Text>{"Delivery Address"}</Text>
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
            <Text>{"Delivery Options"}</Text>
            <Text>{shippingoption.shipping_type}</Text>
        </View>
        <View>
            <View>
              <Text>{"Subtotal"} {totalAmount.toFixed(2)}</Text>
            </View>
            <View>
              <Text>{"Shipping"} {shippingoption.shipping_cost}</Text>
            </View>
            <View>
              <Text>{"Grand Total"} {(totalAmount + parseInt(shippingoption.shipping_cost)).toFixed(2)} </Text>
            </View>
        </View>
      <View>
          <Button
          onPress={this.backStage.bind(this)}
          title="Back"
          color="#841584"
          accessibilityLabel="Back"
          />
          <Button
          onPress={this.nextStage.bind(this)}
          title="Next Step"
          color="#841584"
          accessibilityLabel="Next Step"
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
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
