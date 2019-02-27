import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "../../scss/checkout.scss";
import Delivery from "./delivery";
import Conformation from "./conformation";
import Payment from "./payment";
import Image from "react-bootstrap/Image";
import successimage from "../../images/success-image.png";
import * as Actions from "../../actions";
import axios from "axios";
import { PROVIDERS } from "../../services/constants";
import { API_ROOT } from "../../services/constants";
import { clearCart } from "../../actions";

import { connect } from "react-redux";

import {
  StripeProvider,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from "react-stripe-elements";

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

  componentDidMount()
  {
      if(!this.props.user.email)
      { 
          this.props.history.push('/login');
          localStorage.setItem("nextRoute","/checkout");
      }
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
        axios
          .post(API_ROOT + "payment", {
            email: this.props.user.email,
            id: token.card_id,
            inCartId:this.props.cart.inCartId,
            inCustomerId:this.props.customer.customer_id,
            inShippingId:this.props.cart.shippingOption.shipping_id,
            amount:totalAmount+this.props.cart.shippingOption.cost,
            inTaxId:0
          })
          .then(function(response) {
            if (response.data.status == "error") {
              this_ref.setState({ errors: response.data.msg });
            } else {
              this_ref.setState({ errors: null });
              let state = this_ref.state;
              state["stage"] = state["stage"] + 1;
              this_ref.setState(state);
            }
          })
          .catch(function(error) {
          });
      });
  }
  showstages() {
    if (this.state.stage == 0) {
      return (
        <Delivery setDelivarydetails={this.setDelivarydetails.bind(this)} />
      );
    } else if (this.state.stage == 1) {
      return <Conformation />;
    } else if (this.state.stage == 2) {
      return (
        <StripeProvider apiKey="pk_test_7bmdPQNsz569HDDDKiNUn76k">
          <Elements>
          
                
                    <Payment user={this.props.user} cart={this.props.cart} customer={this.props.customer} backStage={this.backStage.bind(this)} nextStage={this.nextStage.bind(this)} back={"back"} next={"pay"}   />
                  
          </Elements>
        </StripeProvider>
      );
    } else {
      return (
        <Row className="success-block">
          <Col
            md={6}
            lg={4}
            className="offset-md-3 offset-lg-4 pb-5 text-center"
          >
            <div>
              <Image
                src={successimage}
                className="justify-content-start nav-logo"
                fluid
              />
              <h1>Success!</h1>
              <p>
                Your items will be shipped shortly, you will get email with
                details.
              </p>
            </div>
            <LinkContainer
              className="btn btn-md next_step mt-4"
              to={"/categories"}
            >
              <a>{"Back to shop"}</a>
            </LinkContainer>
          </Col>
        </Row>
      );
    }
  }
  backStage() {
    let state = this.state;
    state["stage"] = state["stage"] - 1;
    this.setState(state);
  }
  nextStage(e) {
    let state=this.state;
    let this_ref=this;
    state["delivery"]["errors"]=[];
    if(this.state.stage==0){
      if(!state["delivery"]["customer"]["address_1"])
      {
          state["delivery"]["errors"].push("Name is required");
      }
      if (!state["delivery"]["customer"]["city"]) {
        state["delivery"]["errors"].push("City is required");
      }
      if (!state["delivery"]["customer"]["postal_code"]) {
        state["delivery"]["errors"].push("Zip code is required");
      }
      if (!state["delivery"]["customer"]["country"]) {
        state["delivery"]["errors"].push("Country code is required");
      }
      if (!state["delivery"]["region"]) {
        state["delivery"]["errors"].push("Should select a region");
      }
      if (!state["delivery"]["shippingOption"]) {
        state["delivery"]["errors"].push("Should select a delivery option.");
      }
      if(state["delivery"]["errors"]<=0)
      {
        axios
        .get(API_ROOT + "get_token")
        .then(function(response) {
          axios
          .post(API_ROOT + "update-address", {
            inEmail: this_ref.props.user.email,
            inAddress1: state["delivery"]["customer"]["address_1"],
            inAddress2: state["delivery"]["customer"]["address_2"],
            inCity:state["delivery"]["customer"]["city"],
            inRegion:state["delivery"]["regionName"],
            inPostalCode:state["delivery"]["customer"]["postal_code"],
            inCountry:state["delivery"]["customer"]["country"],
            inShippingRegionId:state["delivery"]["region"]
          },{Authorization: `Bearer ${response.data.token}`})
          .then(function(response) {
            let state = this_ref.state;
            state["stage"] = state["stage"] + 1;
            this_ref.setState(state);
          })
          .catch(function(error) {
  
          });
        })
        .catch(function(error) {

        });
        
        
      }
      else
      {
        
      }
      this_ref.setState(state);
    }
    else if(this.state.stage==2)
    { 
      let state = this_ref.state;
      state["stage"] = state["stage"] + 1;
      this_ref.setState(state);
      localStorage.removeItem("react-shop-cart");
      localStorage.removeItem("nextRoute");
      this.props.clearCart();
    }
    else
    {
      let state = this.state;
      state["stage"] = state["stage"] + 1;
      this.setState(state);
    }
  }

  showErrors() {
    let errors = this.state[this.state.stages[this.state.stage].name]["errors"];
    if (errors) {
      return (
        <div>
          {errors.map(function(error) {
            return <div className="alert alert-danger">{error}</div>;
          })}
        </div>
      );
    }
  }

  render() {
    let finalstage = false;
    if (this.state.stage >= 2) finalstage = true;
    return (
      <React.Fragment>
        <Container>
          <div className="checkout_information">
              <Row className="checkout_block">
                <Col md={12}>
                  {this.showErrors()}
                  <h2>Checkout</h2>
                  <ul className="list-unstyled color-codes">
                    <li
                      className={
                        this.state.stage >= 0
                          ? "bg-red dot  active_next"
                          : "bg-red dot"
                      }
                    />
                    <li
                      className={
                        this.state.stage >= 1 ? "bar active_next" : "bar"
                      }
                    />
                    <li
                      className={
                        this.state.stage >= 1
                          ? "bg-red dot  active_next"
                          : "bg-red dot"
                      }
                    />
                    <li
                      className={
                        this.state.stage >= 2 ? "bar active_next" : "bar"
                      }
                    />
                    <li
                      className={
                        this.state.stage >= 2
                          ? "bg-red dot  active_next"
                          : "bg-red dot"
                      }
                    />
                    <li
                      className={
                        this.state.stage >= 3 ? "bar active_next" : "bar"
                      }
                    />
                    <li
                      className={
                        this.state.stage >= 3
                          ? "bg-red dot  active_next"
                          : "bg-red dot"
                      }
                    />
                  </ul>
                </Col>
                <Col md={12}>
                  <ul className="list-unstyled progress-txt">
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

                {this.showstages()}
              </Row>
              {finalstage ? (
                <div />
              ) : (
                <div className="checkout_next">
                  <button
                    onClick={this.backStage.bind(this)}
                    type="button"
                    className="btn btn-md btn-white back"
                  >
                    {this.state.stages[this.state.stage].back}
                  </button>
                  <button
                    onClick={this.nextStage.bind(this)}
                    type="button"
                    className="btn btn-md next_step"
                  >
                    {this.state.stages[this.state.stage].next}
                  </button>
                </div>
              )}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.get("products").cart,
    user: state.get("user")
  };
};

const mapStateToDispatch = dispatch => ({
  getCartProducts: () => dispatch(Actions.getCartProducts.request()),
  clearCart: () => dispatch(clearCart()),
  
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Checkout);
