import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import "../../scss/cart.scss";
import { connect } from "react-redux";

class Conformation extends Component {
  constructor(props) {
    super(props);
    this.stage = 1;
  }

  componentDidMount() {}
  backStage() {
    this.props.backStage(this.stage);
  }
  nextStage() {
    this.props.nextStage(this.stage);
  }
  render() {
    let cart = { count: 0, products: [] };
    let customer = {};
    let shippingoption = { shipping_type: "", shipping_cost: "" };
    if (this.props.cart) {
      cart = this.props.cart;
      if (cart.shippingoption) {
        shippingoption = cart.shippingoption;
      }
    }
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
    if (this.props.customer) customer = this.props.customer;
    return (
      <React.Fragment>
        <div className="conformation_block">
          <Col md={12}>
            <div className="form-content form-check">
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group">
                    <label className="">
                      <h3>{"Order summary"}</h3>
                    </label>
                    <table className="order_summery">
                      <tbody>
                        <tr>
                          <th>Item</th>
                          <th>Qty</th>
                          <th>Price</th>
                        </tr>
                        {cart.products.map(function(product, index) {
                          return (
                            <tr key={index}>
                              <td>{product.name}</td>
                              <td>{product.quantity}</td>
                              <td>{product.price}</td>
                            </tr>
                          );
                        })}
                      </tbody>
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
                      {Object.keys(customer).map(function(key, index) {
                        if (
                          key === "address_1" ||
                          key === "address_2" ||
                          key === "city" ||
                          key === "country"
                        ) {
                          return <p key={index}>{customer[key]}</p>;
                        }
                      })}
                    </div>
                    <div className="delivery_opts">
                      <h3>{"Delivery options"}</h3>
                      {shippingoption.shipping_type}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group  delivery_options pt-4">
              <div className="row">
                {/* <div className="col-md-4">
                  <button type="button" className="btn btn-lg back">
                    NewYear 8%
                  </button>
                </div> */}
                <div className="col-md-2">
                  <h3>{"Subtotal"}</h3>
                  <h3>{totalAmount}</h3>
                </div>
                <div className="col-md-2">
                  <h3>{"Shipping"}</h3>
                  <h3>{shippingoption.shipping_cost}</h3>
                </div>
                <div className="col-md-2">
                  <h3>{"Grand Total"}</h3>
                  <h3>
                    {totalAmount + parseInt(shippingoption.shipping_cost)}
                  </h3>
                </div>
              </div>
            </div>
          </Col>
        </div>
        <div className="col-md-12">
          <div className="checkout_next">
            <button
              onClick={this.backStage.bind(this)}
              type="button"
              className="btn btn-md btn-white back"
            >
              Back
            </button>
            <button
              onClick={this.nextStage.bind(this)}
              type="button"
              className="btn btn-md next_step"
            >
              Next Step
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.get("products").cart,
    customer: state.get("user").customer
  };
};

export default connect(
  mapStateToProps,
  null
)(Conformation);
