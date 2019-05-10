import React, { Component } from "react";

import { connect } from "react-redux";

class Conformation extends Component {
  constructor(props) {
    super(props);
    this.stage = 1;
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
    return (
      <ScrollView>
        <View>
        <Text> Conformation</Text>
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
