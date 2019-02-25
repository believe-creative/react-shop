import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "../../scss/cart.scss";

export default class Delivery extends Component {
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <Container>
          <Row className="delivery_block">
            <Col md={12}>
              <div className="form-content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="">First name*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value=""
                      />
                    </div>
                    <div className="form-group">
                      <label className="">Last name*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="">Address *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value=""
                      />
                    </div>
                    <div className="form-group">
                      <label className="">City *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="">State *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="">Zip-code *</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value=""
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group country">
                      <label>
                        {"Country:"}
                        <h3>{"Greate Britain *"}</h3>
                      </label>
                    </div>
                    <div className="form-group form-check">
                      <div className="radio-checkbox-block">
                        <p>
                          <input type="checkbox" for="male" />
                          <span />
                          <label for="male">
                            <h3>
                              My billing information is the same as my delivery
                              information{" "}
                            </h3>
                          </label>
                        </p>
                      </div>
                    </div>

                    <div className="form-group delivery_options">
                      <label className="form-check-label" for="exampleCheck1">
                        <h2>Delivery Options </h2>
                      </label>
                      <div className="row radio-checkbox-block">
                        <div className="col-md-6">
                          <p>
                            <input type="radio" for="option1" checked />
                            <span />
                            <label for="option1">
                              <h3>Standard Shipping:</h3>(free, 2-3 business
                              days)
                            </label>
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <input type="radio" for="option2" />
                            <span />
                            <label for="option2">
                              <h3>Express Shipping:</h3>(28 Dollar, 1-2 business
                              days)
                            </label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
