import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "../../scss/cart.scss";

export default class Checkout extends Component {
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <Container>
          <Row className="checkout_information">
            <Col sm={6} md={12}>
              <h2>Checkout</h2>
              <ul className="list-unstyled color-codes">
                <li className="bg-red dot" />
                <li className="bg-red dot" />
                <li className="bg-red dot" />
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
              <form>
                <div class="form-content">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="">First name*</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder=""
                          value=""
                        />
                      </div>
                      <div class="form-group">
                        <label class="">Last name*</label>
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
                        <label class="">Address *</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder=""
                          value=""
                        />
                      </div>
                      <div class="form-group">
                        <label class="">City *</label>
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
                        <label class="">State *</label>
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
                        <label class="">Zip-code *</label>

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
                        <label class="country">
                          {"Country:"}
                          <h3>{"Greate Britain *"}</h3>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="note">
                    <h3>
                      My billing information is the same as my delivery
                      information{" "}
                    </h3>
                  </div>
                  <div className="checkout_next">
                    <button type="button" class="btn btn-lg back">
                      Back
                    </button>
                    <button type="button" class="btn btn-lg next_step">
                      Next Step
                    </button>
                  </div>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
