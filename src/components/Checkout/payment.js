import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import "../../scss/cart.scss";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from "react-stripe-elements";
import axios from "axios";
import { API_ROOT } from "../../services/constants";
import { injectStripe } from "react-stripe-elements";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      errors: null
    };
    this.stage = 2;
  }
  chnagedText(e) {
    let state = this.state;
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  }
  backStage() {
    this.props.backStage(this.stage);
  }
  nextStage() {
    this.props.nextStage(this.stage);
  }
  handleSubmit(ev) {
    ev.preventDefault();
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

    this.props.stripe
      .createToken({ name: this.props.user.name })
      .then(({ token }) => {
        if (token) {
          this_ref.setState({ errors: null });

          axios
            .get(API_ROOT + "get_token")
            .then(function(response) {
              axios
                .post(
                  API_ROOT + "payment",
                  {
                    email: this_ref.props.user.email,
                    id: token.id,
                    inCartId: this_ref.props.cart.inCartId,
                    inCustomerId: null,
                    inShippingId:
                      this_ref.props.cart.shippingoption.shipping_id,
                    amount:
                      totalAmount +
                      parseInt(
                        this_ref.props.cart.shippingoption.shipping_cost
                      ),
                    inTaxId: 0
                  },
                  { Authorization: `Bearer ${this_ref.props.token}` }
                )
                .then(function(res) {
                  if (res.data.status === "error") {
                    this_ref.setState({ errors: res.data.msg });
                  } else {
                    this_ref.setState({ errors: null });
                    this_ref.props.nextStage(this_ref.stage);
                  }
                })
                .catch(function(error) {});
            })
            .catch(function(error) {
              this_ref.setState({ errors: error.message });
            });
        } else {
          this_ref.setState({ errors: "Please fill all the feilds." });
        }
      })
      .catch(function(error) {
        this_ref.setState({ errors: error.message });
      });
  }
  showErrors() {
    if (this.state.errors) {
      return <div className="alert alert-danger">{this.state.errors}</div>;
    } else {
      return <div />;
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
                      <CardNumberElement placeholder="Test card: 4242 4242 4242 4242" />
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
              <div className="checkout_next">
                <button
                  onClick={this.backStage.bind(this)}
                  type="button"
                  className="btn btn-md btn-white back"
                >
                  {this.props.back}
                </button>
                <button type="submit" className="btn btn-md next_step">
                  {this.props.next}
                </button>
              </div>
            </form>
          </Col>
        </div>
      </React.Fragment>
    );
  }
}

export default injectStripe(Payment);
