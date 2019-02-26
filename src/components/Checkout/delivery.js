import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "../../scss/cart.scss";
import * as Actions from "../../actions";
import { setRegion,setShippingOption } from "../../actions";
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
      state["regionName"]=e.currentTarget.querySelectorAll("option[value='"+e.currentTarget.value+"']")[0].innerText;
      this.setState(state);

      this.props.setRegion(state["region"]);
      this.props.getShippingOptions(state["region"]);
   }
   setShippingOption(e)
   {
      let state=this.state;
      state["shippingOption"]=e.currentTarget.getAttribute("data-value");
      this.setState(state);

      this.props.setShippingOption(state["shippingOption"]);
   }

  changed(e)
  {
      let state=this.state;
      state[e.currentTarget.name]=e.currentTarget.value;
      this.setState(state);
      this.props.setDelivarydetails(this.state,this.state);
  }

  render() {
    let regions=[];
    let shippingOptions=[];
    if(this.props.regions)
        regions=this.props.regions
    if(this.props.shippingOptions)
      shippingOptions=this.props.shippingOptions
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
                        value={this.state.name}
                        name="address1"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={this.state.address2}
                        name="address2"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="">City *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={this.state.city}
                        name="city"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="">Zip-code *</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={this.state.zip}
                        name="zip"
                        onChange={this.changed.bind(this)}
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
                        value={this.state.country}
                        name="country"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    <div className="form-group form-check">
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
                    {this.state.region?<div className="form-group delivery_options">
                      <label className="form-check-label" for="exampleCheck1">
                        <h2>Delivery Options </h2>
                      </label>
                      <div className="row radio-checkbox-block">
                      {shippingOptions.map(function(option){
                        return(
                          <div className="col-md-6">
                            <p>
                              <input type="radio" data-value={option.shipping_id} name="shippingoption" for={"option"+option.shipping_id} onClick={this.setShippingOption.bind(this)} />
                              <span />
                              <label for={"option"+option.shipping_id}>
                                <h3>{option.shipping_type}</h3>
                              </label>
                            </p>
                          </div>
                        ) 
                      })}
                      </div>
                    </div>:<div></div>}
                    
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
  return {
    cart:state.get("products").cart,
    regions:state.get("shipping").regions,
    shippingOptions:state.get("shipping").shippingOptions
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getShippingRegions: () => dispatch(Actions.getShippingRegions.request()),
    setRegion:(regionId) => dispatch(setRegion(regionId)),
    setShippingOption:(inShippingId) => dispatch(setShippingOption(inShippingId)),
    getShippingOptions:(inShippingRegionId) => dispatch(Actions.getShippingOptions.request(inShippingRegionId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delivery);
