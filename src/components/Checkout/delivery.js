import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../scss/cart.scss";
import * as Actions from "../../actions";
import { setRegion,setShippingOption } from "../../actions";
import { connect } from "react-redux";

class Delivery extends Component {
  constructor(props)
  {
      super(props);
      this.state={
        region:"",
        customer:{}
      }
  }
  componentDidMount(){
    this.props.getShippingRegions();
   }
   componentWillReceiveProps(props)
   {
      if(props.user)
      {
        if(props.user.email)
        {
          if(props.customer)
          {
              if(props.customer!==this.state.customer)
              {
                  this.setState({customer:props.customer});
              }
          }
          else
          {
              props.getCustomerInfo(props.user.email);
          }
        }

      }
   }
  changeRegion(e)
   {
      let state=this.state;
      state["region"]=e.currentTarget.value;
      state["regionName"]=e.currentTarget.querySelectorAll("option[value='"+e.currentTarget.value+"']")[0].innerText;
      state["completeRegion"]=JSON.parse(e.currentTarget.querySelectorAll("option[value='"+e.currentTarget.value+"']")[0].getAttribute("data-region"));
      this.setState(state);
      this.props.setDelivarydetails(this.state,this.state);
      this.props.setRegion(state["completeRegion"]);
      this.props.getShippingOptions(state["region"]);
   }
   setShippingOption(e)
   {
      let state=this.state;
      state["shippingOption"]=JSON.parse(e.currentTarget.getAttribute("data-option"));
      this.setState(state);
      this.props.setDelivarydetails(this.state,this.state);
      this.props.setShippingOption(state["shippingOption"]);
   }

  changed(e)
  {
      let state=this.state;
      state["customer"][e.currentTarget.name]=e.currentTarget.value;
      this.setState(state);
      this.props.setDelivarydetails(this.state,this.state);
  }

  render() {
    let this_ref=this;
    let regions=[];
    let shippingOptions=[];
    if(this.props.regions)
        regions=this.props.regions
    if(this.props.shippingOptions)
      shippingOptions=this.props.shippingOptions
    let customer={address1:"",address2:"",city:"",zip:"",country:""};
    if(this.state.customer)
    {
      if(this.state.customer.name)
      {
        customer=this.state.customer;
      }
    }
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
                        value={customer.address_1}
                        name="address_1"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={customer.address_2}
                        name="address_2"
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
                        value={customer.city}
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
                        value={customer.postal_code}
                        name="postal_code"
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
                        value={customer.country}
                        name="country"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    <div className="form-group form-check">
                          <span />
                          <label htmlFor="male">
                            <h3>
                              Region *
                            </h3>
                          </label>
                          <select className="selectpicker" value={this.state.region} onChange={this_ref.changeRegion.bind(this_ref)}>
                              {regions.map(function(region,index){
                                  return(
                                    <option key={index} data-region={JSON.stringify(region)} value={region.shipping_region_id}>
                                        {region.shipping_region}
                                    </option>
                                  )

                              })}
                          </select>
                    </div>
                    {this.state.region?<div className="form-group delivery_options">
                      <label className="form-check-label" htmlFor="exampleCheck1">
                        <h2>Delivery Options </h2>
                      </label>
                      <div className="row radio-checkbox-block">
                      {shippingOptions.map(function(option,index){
                        return(
                          <div key={index} className="col-md-6">
                            <p>
                              <input type="radio" data-option={JSON.stringify(option)} data-value={option.shipping_id} name="shippingoption" id={"option"+option.shipping_id} onClick={this_ref.setShippingOption.bind(this_ref)} />
                              <span />
                              <label htmlFor={"option"+option.shipping_id}>
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
    shippingOptions:state.get("shipping").shippingOptions,
    user:state.get("user"),
    customer:state.get("user").customer,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getShippingRegions: () => dispatch(Actions.getShippingRegions.request()),
    setRegion:(regionId) => dispatch(setRegion(regionId)),
    setShippingOption:(inShippingId) => dispatch(setShippingOption(inShippingId)),
    getCustomerInfo:(inEmail) => dispatch(Actions.getCustomerInfo.request(inEmail)),
    getShippingOptions: (inShippingRegionId) => dispatch(Actions.getShippingOptions.request(inShippingRegionId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delivery);
