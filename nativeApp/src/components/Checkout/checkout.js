import React, { Component } from "react";
import {Alert, Text, View,Button, TouchableOpacity, Image, ScrollView, StyleSheet} from 'react-native';
import NavigationService from '../../routes/NavigationService.js';
import successimage from "../../images/success-image.png";
import { clearCart } from "../../actions";
import Delivery from "./delivery";
import Conformation from "./conformation";
import Payment from "./payment";
import Home from "../../containers/Home/home";
import NavBar from '../Navbar/navbar';
import Login from "../../containers/Login/login";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import SyncStorage from 'sync-storage';
import { StripeProvider, Elements } from "react-stripe-elements";
import {styles} from '../../containers/Home/home-styles';
import Footer from '../../components/Footer/footer';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      stages: [
        {
          next: "Next step",
          back: "Back",
          name: "delivery"
        },
        {
          next: "Next step",
          back: "Back",
          name: "conformation"
        },
        {
          next: "Pay",
          back: "Back",
          name: "payment"
        },
        {
          next: "Back to Shop",
          name: "finish"
        }
      ],
      delivery: {},
      conformation: {},
      payment: {},
      finish: {},
      errors: []
    };
  }
  setDelivarydetails(e, child) {
    let state = this.state;
    state["delivery"] = child;
    state["delivery"]["errors"] = [];

    this.setState(state);
  }

  componentDidMount() {
    if (!this.props.user.email) {

        NavigationService.navigate('Login');
        SyncStorage.set("nextRoute", "Checkout");

    }
    if (!this.props.cart) {
      NavigationService.navigate('Home');
    } else if (this.props.cart.count <= 0) {
      NavigationService.navigate('Home');
    }
  }

  showstages() {
    if (this.state.stage === 0) {
      return (
        <Delivery
          backStage={this.backStage.bind(this)}
          nextStage={this.nextStage.bind(this)}
          setDelivarydetails={this.setDelivarydetails.bind(this)}
        />
      );
    } else if (this.state.stage === 1) {
      return (
        <Conformation
          backStage={this.backStage.bind(this)}
          nextStage={this.nextStage.bind(this)}
        />
      );
    } else if (this.state.stage === 2) {
      return (
            <Payment
              {...this.props}
              user={this.props.user}
              cart={this.props.cart}
              customer={this.props.customer}
              address={this.props.address}
              backStage={this.backStage.bind(this)}
              nextStage={this.nextStage.bind(this)}
              back={"back"}
              next={"pay"}
            />
      );
    } else {
      return (
        <View style={styles.success_block}>
        <Image
          source={require('../../images/success-image.png')}
          style={{ width: 50, height: 50, marginLeft: 5, marginTop: 20, }}

        />

              <Text style={{...styles.h2, ...styles.black}}>Success!</Text>
              <Text style={styles.success_txt}>
                Your items will be shipped shortly, you will get email with
                details.
              </Text>
				 <TouchableOpacity onPress={() => {
                  NavigationService.navigate('allCategories');
              }}><Text style={styles.button}>Back to Shop</Text></TouchableOpacity>
             </View>
      );
    }
  }
  backStage(stage) {
    if (stage > 0) {
      let state = this.state;
      state["stage"] = stage - 1;
      this.setState(state);
    } else {

      NavigationService.navigate('Items');
    }
  }
  nextStage(stage) {
    if (stage >= 2) {
      SyncStorage.remove("react-shop-cart");
      SyncStorage.remove("nextRoute");

      this.props.clearCart();
    }
    let state = this.state;
    state["stage"] = stage + 1;
    this.setState(state);
  }

  render() {
    let finalstage = false;
    if (this.state.stage >= 2) finalstage = true;
    return (
      <View>
      <NavBar />
        <ScrollView style={styles.gray_bg}>
          <View>

              {this.showstages()}
          </View>
			 <Footer/>
        </ScrollView>
        </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.get("products").cart,
    user: state.get("user"),
    token: state.get("user").token,
    address: state.get("order").address
  };
};

const mapStateToDispatch = dispatch => ({
  clearCart: () => dispatch(clearCart())
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Checkout);
