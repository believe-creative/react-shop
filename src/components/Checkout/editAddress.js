import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ButtonToolbar, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "../../scss/cart.scss";
import "../../scss/checkout.scss";
import * as Actions from "../../actions";
import { setRegion, setShippingOption } from "../../actions";
import { connect } from "react-redux";
import axios from "axios";
import { API_ROOT } from "../../services/constants";
class EditAddress extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    this.state = {
      region: "",
      customer: {},
      errors: {},
      address: "",
      add_address: "",
      modalShow: false
    };
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {}
  componentWillReceiveProps(props) {
    if (this.props.addressDetails) {
      this.setState({ address: this.props.addressDetails });
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
    state["address"][e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
    console.log("this.state", this.state);
    this.props.setDelivarydetails(this.state, this.state);
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

  updateAddress() {
    console.log("update");
    let state = this.state;
    console.log(this.props);
    this.props.updateAddress({
      token: this.props.token,
      inEmail: this.props.user ? this.props.user.email : "",
      inAddressId: this.props.addressDetails.id,
      inAddressName: state["address"]["address_name"],
      inAddress1: state["address"]["address_1"],
      inAddress2: state["address"]["address_2"],
      inCity: state["address"]["city"],
      inRegion: state["regionName"],
      inPostalCode: state["address"]["postal_code"],
      inCountry: state["address"]["country"],
      inShippingRegionId: state["region"],
      inDayPhone: state["address"]["day_phone"],
      inEvePhone: state["address"]["eve_phone"],
      inMobPhone: state["address"]["mob_phone"]
    });
    this.props.onHide();
    this.props.getAddress({
      token: this.props.token,
      inEmail: this.props.user ? this.props.user.email : ""
    });
    this.setState({ address: {} });
  }
  saveAddress() {
    console.log("save");
    let state = this.state;
    console.log(this.props);
    this.props.addAddress({
      token: this.props.token,
      inEmail: this.props.user ? this.props.user.email : "",
      inAddressName: state["address"]["address_name"],
      inAddress1: state["address"]["address_1"],
      inAddress2: state["address"]["address_2"],
      inCity: state["address"]["city"],
      inRegion: state.regionName,
      inPostalCode: state["address"]["postal_code"],
      inCountry: state["address"]["country"],
      inShippingRegionId: state.region,
      inDayPhone: state["address"]["day_phone"],
      inEvePhone: state["address"]["eve_phone"],
      inMobPhone: state["address"]["mob_phone"]
    });

    this.props.onHide();
    this.props.getAddress({
      token: this.props.token,
      inEmail: this.props.user ? this.props.user.email : ""
    });
    this.setState({ address: {} });
  }
  handleClose() {
    this.setState({ modalShow: false });
  }

  render() {
    console.log("edit", this.props, this.state);
    let this_ref = this;
    let regions = [];
    let shippingOptions = [];

    if (this.props.regions) regions = this.props.regions;
    if (this.props.shippingOptions)
      shippingOptions = this.props.shippingOptions;
    let addressList = {
      address1: "",
      address2: "",
      city: "",
      zip: "",
      country: ""
    };
    let addAddressList = this.state.address;
    addressList = this.state.address ? this.state.address : "";

    let getAddress =
      this.props.getaddress.length > 0 ? this.props.getaddress : "";
    if (this.props.addNewAddress) {
      console.log("edit render", addressList);
      return (
        <React.Fragment>
          <Modal
            show={this.props.modalShow}
            onHide={this.props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={"edit-address-popup"}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Address
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="">Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addressList.address_name}
                        name="address_name"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("address_name")}
                  </div>
                  <div className="col-md-6" />
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="">Address 1*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addressList.address_1}
                        name="address_1"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("address_1")}
                    <div className="form-group">
                      <label className="">City *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addressList.city}
                        name="city"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("city")}
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="">Address 2</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addressList.address_2}
                        name="address_2"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("address_2")}

                    <div className="form-group">
                      <label className="">Zip-code *</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addressList.postal_code}
                        name="postal_code"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("postal_code")}
                  </div>
                  <div className="col-md-6">
                    <div className="form-group country">
                      <label>{"Country:"}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addressList.country}
                        name="country"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("country")}
                    <div className="form-group">
                      <label>{"Day Phone Number:"}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addressList.day_phone}
                        name="day_phone"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("day_phone")}
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>{"Mobile Number:"}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addressList.mob_phone}
                        name="mob_phone"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("mobile_phone")}
                    <div className="form-group">
                      <label>{"Eve Phone Number:"}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addressList.eve_phone}
                        name="eve_phone"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("evn_phone")}
                  </div>
                  <div className="col-md-12">
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
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-md save_address"
                onClick={this.props.onHide}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-md save_address"
                onClick={this.updateAddress.bind(this)}
              >
                Save Changes
              </button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Modal
            show={this.props.modalShow}
            onHide={this.props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={"edit-address-popup"}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Address
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="">Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addAddressList.address_name}
                        name="address_name"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("address_name")}
                  </div>
                  <div className="col-md-6" />
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="">Address 1*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addAddressList.address_1}
                        name="address_1"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("address_1")}
                    <div className="form-group">
                      <label className="">City *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addAddressList.city}
                        name="city"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("city")}
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="">Address 2</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addAddressList.address_2}
                        name="address_2"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("address_2")}

                    <div className="form-group">
                      <label className="">Zip-code *</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addAddressList.postal_code}
                        name="postal_code"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("postal_code")}
                  </div>
                  <div className="col-md-6">
                    <div className="form-group country">
                      <label>{"Country:"}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addAddressList.country}
                        name="country"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("country")}
                    <div className="form-group">
                      <label>{"Day Phone Number:"}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addAddressList.day_phone}
                        name="day_phone"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("day_phone")}
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>{"Mobile Number:"}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addAddressList.mob_phone}
                        name="mob_phone"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("mobile_phone")}
                    <div className="form-group">
                      <label>{"Eve Phone Number:"}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={addAddressList.eve_phone}
                        name="eve_phone"
                        onChange={this.changed.bind(this)}
                      />
                    </div>
                    {this.showError("evn_phone")}
                  </div>
                  <div className="col-md-12">
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
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-md save_address"
                onClick={this.props.onHide}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-md save_address"
                onClick={this.saveAddress.bind(this)}
              >
                Save Changes
              </button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      );
    }
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
    updateAddress: data => dispatch(Actions.updateAddress.request(data)),
    addAddress: data => dispatch(Actions.addAddress.request(data)),
    getAddress: data => dispatch(Actions.getAddress.request(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAddress);
