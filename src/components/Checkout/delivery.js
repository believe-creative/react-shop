import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../scss/cart.scss";
import * as Actions from "../../actions";
import { setRegion, setShippingOption } from "../../actions";
import { connect } from "react-redux";
import axios from "axios";
import { API_ROOT } from "../../services/constants";
class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: "",
      customer: {},
      errors: {},
      address: {}
    };
    this.stage = 0;
  }
  componentDidMount() {
    this.props.getShippingRegions({ token: this.props.token });
    this.props.getAddress({
      token: this.props.token,
      inEmail: this.props.user ? this.props.user.email : ""
    });
  }
  componentWillReceiveProps(props) {
    if (props.user) {
      if (props.user.email) {
        if (props.customer) {
          if (props.customer !== this.state.customer) {
            this.setState({ customer: props.customer });
          }
        } else {
          props.getCustomerInfo({
            token: this.props.token,
            inEmail: props.user.email
          });
        }
      }
    }
  }
  changeRegion(e) {
    let state = this.state;
    state["region"] = e.currentTarget.value;
    state["regionName"] = e.currentTarget.querySelectorAll(
      "option[value='" + e.currentTarget.value + "']"
    )[0].innerText;
    state["completeRegion"] = JSON.parse(
      e.currentTarget
        .querySelectorAll("option[value='" + e.currentTarget.value + "']")[0]
        .getAttribute("data-region")
    );
    this.setState(state);
    this.props.setDelivarydetails(this.state, this.state);
    this.props.setRegion(state["completeRegion"]);
    this.props.getShippingOptions({
      token: this.props.token,
      inShippingRegionId: state["region"]
    });
  }
  setShippingOption(e) {
    let state = this.state;
    state["shippingoption"] = JSON.parse(
      e.currentTarget.getAttribute("data-option")
    );
    this.setState(state);
    this.props.setDelivarydetails(this.state, this.state);
    this.props.setShippingOption(state["shippingoption"]);
  }

  changed(e) {
    let state = this.state;
    console.log("Onchange_this.state", this.state);
    state["customer"][e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
    console.log("this.state", this.state);
    this.props.setDelivarydetails(this.state, this.state);
  }
  itemInsert(address_id) {
    var addressDetails = {};
    let state = this.state;
    this.props.getaddress.map((e, index) => {
      if (address_id === e.id) {
        console.log("hello", e);
        addressDetails = e;
        Object.keys(addressDetails).map(key => {
          state["customer"][key] = addressDetails[key];
        });
        this.setState(state);
        console.log("this.state", this.state);
        this.props.setDelivarydetails(this.state, this.state);
        this.setState({ address: e });
      }
    });

    console.log(addressDetails);
  }
  backStage() {
    this.props.backStage(this.stage);
  }
  nextStage(e) {
    let state = this.state;
    let this_ref = this;
    state["errors"] = {};
    let hasErrors = false;
    if (!state["customer"]["address_1"]) {
      state["errors"]["address_1"] = "Name is required";
      hasErrors = true;
    }
    if (!state["customer"]["city"]) {
      state["errors"]["city"] = "City is required";
      hasErrors = true;
    }
    if (!state["customer"]["postal_code"]) {
      state["errors"]["postal_code"] = "Zip code is required";
      hasErrors = true;
    }
    if (!state["customer"]["country"]) {
      state["errors"]["country"] = "Country is required";
      hasErrors = true;
    }
    if (!state["region"]) {
      state["errors"]["region"] = "Should select a region";
      hasErrors = true;
    }
    if (!state["region"]) {
      state["errors"]["region"] = "Should select a region";
      hasErrors = true;
    }
    if (!state["shippingoption"]) {
      state["errors"]["shippingoption"] = "Should select a delivery option.";
      hasErrors = true;
    }
    if (!hasErrors) {
      axios
        .post(
          API_ROOT + "update-address",
          {
            inEmail: this_ref.props.user.email,
            inAddress1: state["customer"]["address_1"],
            inAddress2: state["customer"]["address_2"],
            inCity: state["customer"]["city"],
            inRegion: state["regionName"],
            inPostalCode: state["customer"]["postal_code"],
            inCountry: state["customer"]["country"],
            inShippingRegionId: state["region"]
          },
          { headers: { Authorization: `Bearer ${this_ref.props.token}` } }
        )
        .then(function(response) {
          this_ref.props.nextStage(this_ref.stage);
        })
        .catch(function(error) {
          this_ref.state["errors"]["general"] = error;
          this_ref.setState(this_ref.state);
        });
    }
    this.setState(state);
  }
  showError(opt) {
    if (this.state["errors"][opt]) {
      return (
        <div className="alert alert-danger">{this.state["errors"][opt]}</div>
      );
    } else {
      return <span />;
    }
  }

  saveAddress() {
    console.log("save");
  }
  render() {
    console.log(this.props);
    let this_ref = this;
    let regions = [];
    let shippingOptions = [];
    if (this.props.regions) regions = this.props.regions;
    if (this.props.shippingOptions)
      shippingOptions = this.props.shippingOptions;
    let customer = {
      address1: "",
      address2: "",
      city: "",
      zip: "",
      country: ""
    };
    if (this.state.customer) {
      if (this.state.customer.address_1) {
        customer = this.state.customer;
      }
    }
    let getAddress =
      this.props.getaddress.length > 0 ? this.props.getaddress : "";

    return (
      <React.Fragment>
        <Container>
          <Row className="address_block items_block">
            {getAddress
              ? getAddress.map((address, index) => {
                  return (
                    <div className="col-md-6 col-lg-4 item">
                      <div className="hot_block">
                        <div
                          className="address"
                          onClick={add => this.itemInsert(address.id)}
                        >
                          <h3>{address.address_name} Address</h3>
                          <div>Address 1 : {address.address_1}</div>
                          <div>Address 2 : {address.address_2}</div>
                          <div>City : {address.city}</div>
                          <div>Country : {address.country}</div>
                          <div>Postal Code : {address.postal_code}</div>
                          <div>Day phone number : {address.day_phone}</div>
                          <div>Evening phone number :{address.eve_phone} </div>
                          <div>Mobile number :{address.mob_phone} </div>
                        </div>
                        <div className="next_step">
                          <button
                            type="button"
                            className="btn btn-md save_address"
                          >
                            Edit
                          </button>
                          <button type="button" className="btn btn-md ">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""}
          </Row>

          <Row className="delivery_block">
            <Col md={12}>
              <h2 className="pb-3">{"Add Address"}</h2>
              {this.showError("general")}
              <div className="form-content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="">Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={customer.name}
                        name="name"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("name")}
                    <div className="form-group">
                      <label className="">Address 1*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={customer.address_1}
                        name="address_1"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("address_1")}
                    <div className="form-group">
                      <label className="">Address 2</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={customer.address_2}
                        name="address_2"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("address_2")}
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
                    {this.showError("city")}
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
                    {this.showError("postal_code")}
                  </div>
                  <div className="col-md-12">
                    <div className="form-group country">
                      <label>{"Country:"}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={customer.country}
                        name="country"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("country")}
                    <div className="form-group form-check">
                      <span />
                      <label htmlFor="male">
                        <h3>Region *</h3>
                      </label>
                      <select
                        className="selectpicker"
                        value={this.state.region}
                        onChange={this_ref.changeRegion.bind(this_ref)}
                      >
                        {regions.map(function(region, index) {
                          return (
                            <option
                              key={index}
                              data-region={JSON.stringify(region)}
                              value={region.shipping_region_id}
                            >
                              {region.shipping_region}
                            </option>
                          );
                        })}
                      </select>
                      {this.showError("region")}
                    </div>

                    {this.state.region ? (
                      <div className="form-group delivery_options">
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          <h2>Delivery Options </h2>
                        </label>
                        <div className="row radio-checkbox-block">
                          {shippingOptions.map(function(option, index) {
                            return (
                              <div key={index} className="col-md-6">
                                <p>
                                  <input
                                    type="radio"
                                    data-option={JSON.stringify(option)}
                                    data-value={option.shipping_id}
                                    name="shippingoption"
                                    id={"option" + option.shipping_id}
                                    onClick={this_ref.setShippingOption.bind(
                                      this_ref
                                    )}
                                  />
                                  <span />
                                  <label
                                    htmlFor={"option" + option.shipping_id}
                                  >
                                    <h3>{option.shipping_type}</h3>
                                  </label>
                                </p>
                              </div>
                            );
                          })}
                        </div>
                        {this.showError("shippingoption")}
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="col-md-12">
          <div className="checkout_next">
            <button
              onClick={this.backStage.bind(this)}
              type="button"
              className="btn btn-md btn-white back"
            >
              Back
            </button>
            <div className="next_step">
              <button
                type="button"
                className="btn btn-md save_address"
                onClick={this.saveAddress.bind(this)}
              >
                Save
              </button>
              <button
                onClick={this.nextStage.bind(this)}
                type="button"
                className="btn btn-md "
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.get("products").cart,
    regions: state.get("shipping").regions,
    shippingOptions: state.get("shipping").shippingOptions,
    user: state.get("user"),
    customer: state.get("user").customer,
    token: state.get("user").token,
    getaddress: state.get("products").getAddress
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getShippingRegions: data =>
      dispatch(Actions.getShippingRegions.request(data)),
    setRegion: regionId => dispatch(setRegion(regionId)),
    setShippingOption: inShippingId =>
      dispatch(setShippingOption(inShippingId)),
    getCustomerInfo: data => dispatch(Actions.getCustomerInfo.request(data)),
    getShippingOptions: data =>
      dispatch(Actions.getShippingOptions.request(data)),
    addAddress: data => dispatch(Actions.addAddress.request(data)),
    getAddress: data => dispatch(Actions.getAddress.request(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delivery);
