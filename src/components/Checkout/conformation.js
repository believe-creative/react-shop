import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "../../scss/cart.scss";
import { connect } from "react-redux";

class Conformation extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    let cart = { count: 0, products: [] };
    let customer={};
    let shippingoption={shipping_type:"",shipping_cost:""}
    if (this.props.cart)
    {
      cart = this.props.cart;
      if(cart.shippingoption)
      {
        shippingoption=cart.shippingoption;
      }
    } 
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
    if (this.props.customer) customer = this.props.customer;
    console.log(customer,"sdfdsfds");
    return (
      <React.Fragment>
        <Row className="conformation_block">
          <Col md={12}>
            <div className="form-content form-check">
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group">
                    <label className="">
                      <h3>{"Order summery"}</h3>
                    </label>
                    <table className="order_summery">
                      <tbody>
                        <tr>
                          <th>Item</th>
                          <th>Qty</th>
                          <th>Price</th>
                        </tr>
                        {cart.products.map(function(product) {
                          return (
                            <tr>
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
                      {
                        Object.keys(customer).map(function(key){
                          if(key=="address_1" || key=="address_2" || key=="city" || key=="country")
                          {
                            return(
                              <p>{customer[key]}</p>
                            )
                          }
                            
                        })
                      }
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
                  <h3>{"Grandtotal"}</h3>
                  <h3>{totalAmount+parseInt(shippingoption.shipping_cost)}</h3>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.get("products").cart,
    customer:state.get("user").customer,
  };
};

export default connect(
  mapStateToProps,
  null
)(Conformation);
