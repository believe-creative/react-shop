import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "../../scss/cart.scss";
import { connect } from "react-redux";
import paypal from "../../images/paypal.png";
import {
  StripeProvider,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from "react-stripe-elements";
import axios from "axios";
import { API_ROOT } from "../../services/constants";
import { setUser } from "../../actions";
import * as Actions from "../../actions";
import { setCookie, getCookie, deleteCookie } from "../../services/helpers";
import {injectStripe} from 'react-stripe-elements';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:"",
      errors:null
    }
  }
  chnagedText(e)
  {
      let state=this.state;
      state[e.currentTarget.name]=e.currentTarget.value;
      this.setState(state);
  }
  handleSubmit(ev) {
    ev.preventDefault();
    let this_ref = this;
    let props = this.props;
    // We don't want to let default form submission happen here, which would refresh the page.
    let totalAmount = 0;
    if (this.props.cart) {
      let cart = this.props.cart;
      if(cart.products)
      { 
        for (var i = 0; i < cart.products.length; i++) {
          totalAmount =
            totalAmount + cart.products[i].price * cart.products[i].quantity;
        }
      }
      
    }
    totalAmount=Math.round(totalAmount * 100) / 100;
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    
    this.props.stripe
      .createToken({ name: this.props.user.name })
      .then(({ token }) => {
        if(token)
        {
          this_ref.setState({errors:null});

          axios
          .get(API_ROOT + "get_token")
          .then(function(response) {

            axios
            .post(API_ROOT + "payment", {
              email: this_ref.props.user.email,
              id: token.id,
              inCartId:this_ref.props.cart.inCartId,
              inCustomerId:null,
              inShippingId:this_ref.props.cart.shippingoption.shipping_id,
              amount:totalAmount+parseInt(this_ref.props.cart.shippingoption.shipping_cost),
              inTaxId:0
            },{Authorization: `Bearer ${response.data.token}`})
            .then(function(res) {
              if (res.data.status == "error") {
                this_ref.setState({ errors: res.data.msg });
              } else {
                this_ref.setState({ errors: null });
                this_ref.props.nextStage();
              }
            })
            .catch(function(error) {
            });

          })
          .catch(function(error) {
          });



          
        }
        else
        {
          this_ref.setState({errors:"Please fill all the feilds."});
        }
        
      });
  }
  showErrors()
  {
      if(this.state.errors)
      {
        return(<div className="alert alert-danger">{this.state.errors}</div>)
      }
      else
      {
        return(<div></div>)
      }
  }
  render() {
    return (
      <React.Fragment>
            {this.showErrors()}
            <div className="payment_block">

              <Col md={12}>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="">Card holders name*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={this.state.name}
                        onChange={this.chnagedText.bind(this)}
                        name="name"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="">Card number*</label>
                      <CardNumberElement />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="">validthru *</label>
                      <CardExpiryElement />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="">CVV/CVC *</label>
                      <CardCVCElement />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group cvv_text">
                      <p className="">
                        *CVV or CVC is the card security code, unique three
                        digits number on the back of your card separate from its
                        number.*
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                    onClick={this.props.backStage}
                    type="button"
                    className="btn btn-md btn-white back"
                  >
                    {this.props.back}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-md next_step"
                  >
                    {this.props.next}
                  </button>
                </form>
              </Col>
            </div>
          </React.Fragment>
    );
  }
}

export default injectStripe(Payment);
