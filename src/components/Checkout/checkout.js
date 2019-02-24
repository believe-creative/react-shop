import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "../../scss/cart.scss";
import Delivery from "./delivery";
import Conformation from "./conformation";
import Payment from "./payment";
import {StripeProvider,Elements,CardNumberElement,CardExpiryElement,CardCVCElement} from 'react-stripe-elements';

export default class Checkout extends Component {
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <Container>
        <div className="checkout_information">
        <form>
          <Row className="checkout_block">
            <Col sm={6} md={12}>
              <h2>Checkout</h2>
              <ul className="list-unstyled color-codes">

                <li className="bg-red dot  active_next" />
                <li className="bar "/>
                <li className="bg-red dot " />
                <li className="bar"/>
                <li className="bg-red dot" />
                <li className="bar"/>
                <li className="bg-red dot" />

              </ul>
            </Col>
            <Col sm={6} md={12}>
              <ul className="list-unstyled">
                <li>
                  <a href="#">
                    <h3>Delivery</h3>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <h3>Conformation</h3>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <h3>Payment</h3>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <h3>Finish</h3>
                  </a>
                </li>
              </ul>
            </Col>

            <Col sm={6} md={12}>

              <Delivery />

            </Col>
          </Row>
          <div className="checkout_next">
            <button type="button" class="btn btn-lg back">
              Back
            </button>
            <button type="button" class="btn btn-lg next_step">
              Next Step
            </button>
          </div>
          </form>
          </div>
          <div className="checkout_information">
          <form>
            <Row className="checkout_block">
              <Col sm={6} md={12}>
                <h2>Checkout</h2>
                <ul className="list-unstyled color-codes">

                  <li className="bg-red dot  active_next" />
                  <li className="bar active_next"/>
                  <li className="bg-red dot active_next" />
                  <li className="bar"/>
                  <li className="bg-red dot" />
                  <li className="bar"/>
                  <li className="bg-red dot" />

                </ul>
              </Col>
              <Col sm={6} md={12}>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">
                      <h3>Delivery</h3>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <h3>Conformation</h3>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <h3>Payment</h3>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <h3>Finish</h3>
                    </a>
                  </li>
                </ul>
              </Col>

              <Col sm={6} md={12}>

                <Conformation />

              </Col>
            </Row>
            <div className="checkout_next">
              <button type="button" class="btn btn-lg back">
                Back
              </button>
              <button type="button" class="btn btn-lg next_step">
                Next Step
              </button>
            </div>
            </form>
            </div>
            <div className="checkout_information">
            <form>
              <Row className="checkout_block">
                <Col sm={6} md={12}>
                  <h2>Checkout</h2>
                  <ul className="list-unstyled color-codes">

                    <li className="bg-red dot  active_next" />
                    <li className="bar active_next"/>
                    <li className="bg-red dot active_next" />
                    <li className="bar active_next"/>
                    <li className="bg-red dot active_next" />
                    <li className="bar"/>
                    <li className="bg-red dot" />

                  </ul>
                </Col>
                <Col sm={6} md={12}>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">
                        <h3>Delivery</h3>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <h3>Conformation</h3>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <h3>Payment</h3>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <h3>Finish</h3>
                      </a>
                    </li>
                  </ul>
                </Col>

                <Col sm={6} md={12}>
                <StripeProvider apiKey="pk_test_7bmdPQNsz569HDDDKiNUn76k">
                      <Elements>
                        <Payment />
                      </Elements>
                </StripeProvider>
                  

                </Col>
              </Row>
              <div className="checkout_next">
                <button type="button" class="btn btn-lg back">
                  Back
                </button>
                <button type="button" class="btn btn-lg next_step">
                  Finish
                </button>
              </div>
              </form>
              </div>
        </Container>
      </React.Fragment>
    );
  }
}
