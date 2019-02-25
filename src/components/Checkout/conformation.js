import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "../../scss/cart.scss";

export default class Conformation extends Component {
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <Row className="conformation_block">
          <Col sm={6} md={12}>
            <div className="form-content form-check">
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group">
                    <label className="">
                      <h3>{"Order summery"}</h3>
                    </label>
                    <table className="order_summery">
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                      </tr>
                      <tr>
                        <td>Green Tshit 2016 Men BK3569</td>
                        <td>2</td>
                        <td>$100</td>
                      </tr>
                      <tr>
                        <td>Green Tshit 2016 Men BK3569</td>
                        <td>1</td>
                        <td>$150</td>
                      </tr>
                      <tr>
                        <td>Green Tshit 2016 Men BK3569</td>
                        <td>2</td>
                        <td>$300</td>
                      </tr>
                      <tr>
                        <td>Green Tshit 2016 Men BK3569</td>
                        <td>1</td>
                        <td>$250</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="">
                      <h3>{"Delivery"}</h3>
                    </label>
                    <div className="address">
                      <h3>{"Address"}</h3>
                      <p>Office 64,8 Colmore Row</p>
                      <p>Birmingham,England,42000</p>
                    </div>
                    <div className="delivery_opts">
                      <h3>{"Delivery options"}</h3>
                      <p>Standard delivery</p>
                      <p>(free,2-3 days)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group  delivery_options pt-4">
              <div className="row">
                <div className="col-md-4">
                  <button type="button" className="btn btn-lg back">
                    NewYear 8%
                  </button>
                </div>
                <div className="col-md-2">
                  <h3>{"Subtotal"}</h3>
                  <h3>{"$368"}</h3>
                </div>
                <div className="col-md-2">
                  <h3>{"Shipping"}</h3>
                  <h3>{"free"}</h3>
                </div>
                <div className="col-md-2">
                  <h3>{"Grandtotal"}</h3>
                  <h3>{"$340"}</h3>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
