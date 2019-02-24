import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "../../scss/cart.scss";
import paypal from "../../images/paypal.png";

export default class Payment extends Component {
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
          <Row className="payment_block">
            <Col sm={6} md={12}>
              <div className="paypal">
              <div className="paypal_img"><img src={paypal} /></div>
              <div class="row radio-checkbox-block">
                <p><input type="radio" for="option1" checked /><span></span><label for="option1"><h3>Pay $360 with Paypal</h3></label></p>
              </div>
              </div>
            </Col>

            <Col sm={6} md={12}>
              <form>
                <div class="form-content">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="">Card holders name*</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder=""
                          value=""
                        />
                      </div>
                      </div>
                      <div class="col-md-6">
                      <div class="form-group">
                        <label class="">Card number*</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder=""
                          value=""
                        />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="">validthru *</label>
                        <input
                          type="text"
                          className="form-control validthru"
                          placeholder=""
                          value=""
                        />
                      </div>
                      </div>
                      <div class="col-md-3">
                      <div class="form-group">
                        <label class="">CVV/CVC *</label>
                        <input
                          type="text"
                          class="form-control validthru"
                          placeholder=""
                          value=""
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                    <div class="form-group cvv_text">
                      <p className="">*CVV or CVC is the card security code, unique three digits number on the back of your card separate from its number.*</p>

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
