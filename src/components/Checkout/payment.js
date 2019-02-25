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

class Payment extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(ev) {
    let this_ref = this;
    let props = this.props;
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe
      .createToken({ name: this.props.user.name })
      .then(({ token }) => {
        axios
          .post(API_ROOT + "login", {
            email: this.state.email,
            pwd: this.state.pwd
          })
          .then(function(response) {
            console.log(response);
            if (response.data.status == "error") {
              this_ref.setState({ errors: response.data.msg });
              console.log(this_ref.state);
            } else {
              setCookie("s-atk", response.data.token, 0.2);
              props.setUser(response.data.user);
              this_ref.setState({ errors: null });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
  }
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <Row className="payment_block">
          <Col sm={6} md={12}>
            <div className="paypal">
              <div className="paypal_img">
                <img src={paypal} />
              </div>
              <div className="row radio-checkbox-block">
                <p>
                  <input type="radio" for="option1" checked />
                  <span />
                  <label for="option1">
                    <h3>Pay $360 with Paypal</h3>
                  </label>
                </p>
              </div>
            </div>
          </Col>

          <Col sm={6} md={12}>
            <form onSubmit={this.handleSubmit}>
              <div className="form-content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="">Card holders name*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value=""
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
            </form>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.get("user")
  };
};

export default connect(
  mapStateToProps,
  null
)(Payment);
