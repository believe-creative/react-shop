import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "../../scss/cart.scss";
import * as Actions from "../../actions";

import { connect } from "react-redux";

class Delivery extends Component {
  constructor(props)
  {
      super(props);
      this.state={
        region:null
      }   
  }
  componentDidMount(){
    this.props.getShippingRegions();
   }

  changeRegion(e)
   {
      let state=this.state;
      state["region"]=e.currentTarget.value;
      this.setState(state);
   }
  render() {
    let regions=[];
    if(this.props.regions)
        regions=this.props.regions
    return (
      <React.Fragment>
        <Container>
          <Row className="delivery_block">
            <Col md={12}>
              <div className="form-content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="">Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value=""
                      />
                    </div>
                    <div className="form-group">
                      <label className="">Address 2</label>
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
                      <label className="">Address 1*</label>
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
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value=""
                      />
                    </div>
                    <div className="form-group form-check">
                      <div className="radio-checkbox-block">
                        <p>
                          <span />
                          <label for="male">
                            <h3>
                              Region *
                            </h3>
                          </label>
                          <select className="selectpicker" value={this.state.region} onChange={this.changeRegion.bind(this)}>
                              {regions.map(function(region){
                                  return(
                                    <option value={region.shipping_region_id}>
                                        {region.shipping_region}
                                    </option>
                                  )

                              })}
                          </select>
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
const mapStateToProps = state => {
  console.log(state.get("shipping"),state.get("products"),"hehe ----------------------");
  return {
    cart:state.get("products").cart,
    regions:state.get("shipping").regions
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getShippingRegions: () => dispatch(Actions.getShippingRegions.request())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delivery);
