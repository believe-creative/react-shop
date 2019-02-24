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
            <Col sm={6} md={12}>
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
                    <div class="col-md-12">
                      <div class="form-group country">
                        <label >
                          {"Country:"}
                          <h3>{"Greate Britain *"}</h3>
                        </label>
                      </div>
                        <div class="form-group form-check">
                      <div class="radio-checkbox-block">
                				<p><input type="checkbox" for="male" /><span></span><label for="male"><h3>
                          My billing information is the same as my delivery
                          information{" "}
                        </h3></label></p>
                			</div>
                      </div>

                      <div class="form-group delivery_options">
                        <label class="form-check-label" for="exampleCheck1"><h2>
                          Delivery Options{" "}
                        </h2></label>
                        <div class="row radio-checkbox-block">
                          <div class="col-md-6">
                  				    <p><input type="radio" for="option1" checked /><span></span><label for="option1"><h3>Standard Shipping:</h3>(free, 2-3 business days)</label></p>
                  				</div>
                          <div class="col-md-6">
                              <p><input type="radio" for="option2" /><span></span><label for="option2"><h3>Express Shipping:</h3>(28 Dollar, 1-2 business days)</label></p>
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
