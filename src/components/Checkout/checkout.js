import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../scss/checkout.scss";
import Delivery from "./delivery";
import Conformation from "./conformation";
import Payment from "./payment";
import Image from "react-bootstrap/Image";
import successimage from "../../images/success-image.png";
import { clearCart } from "../../actions";

import { connect } from "react-redux";

import { StripeProvider, Elements } from "react-stripe-elements";

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
    console.log("child", e, child);
    let state = this.state;
    state["delivery"] = child;
    state["delivery"]["errors"] = [];

    this.setState(state);
  }

  componentDidMount() {
    if (!this.props.user.email) {
      this.props.history.push("/login");
      localStorage.setItem("nextRoute", "/checkout");
    }
    if (!this.props.cart) {
      this.props.history.push("/");
    } else if (this.props.cart.count <= 0) {
      this.props.history.push("/");
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
        <StripeProvider apiKey="pk_test_7bmdPQNsz569HDDDKiNUn76k">
          <Elements>
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
  backStage(stage) {
    if (stage > 0) {
      let state = this.state;
      state["stage"] = stage - 1;
      this.setState(state);
    } else {
      this.props.history.push("/cart");
    }
  }
  nextStage(stage) {
    if (stage >= 2) {
      localStorage.removeItem("react-shop-cart");
      localStorage.removeItem("nextRoute");
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
      <React.Fragment>
        <Container>
          <div className="checkout_information">
            <Row className="checkout_block">
              <Col md={12}>
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
                      <h3
                        className={this.state.stage >= 0 ? "active_stage" : ""}
                      >
                        Delivery
                      </h3>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <h3
                        className={this.state.stage >= 1 ? "active_stage" : ""}
                      >
                        Confirmation
                      </h3>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <h3
                        className={this.state.stage >= 2 ? "active_stage" : ""}
                      >
                        Payment
                      </h3>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <h3
                        className={this.state.stage >= 3 ? "active_stage" : ""}
                      >
                        Finish
                      </h3>
                    </a>
                  </li>
                </ul>
              </Col>

              {this.showstages()}
            </Row>
          </div>
        </Container>
      </React.Fragment>
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
