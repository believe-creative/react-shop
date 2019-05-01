import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { confirmAlert } from "react-confirm-alert";
import { ButtonToolbar, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "../../scss/cart.scss";
import * as Actions from "../../actions";
import { setRegion, setShippingOption } from "../../actions";
import { connect } from "react-redux";
import axios from "axios";
import AddressPopupForm from "./addressPopupForm";
import { API_ROOT } from "../../services/constants";
class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: "",
      customer: {},
      errors: {},
      address: {},
      modalShow: false,
      address_id: "",
      default: false
    };
    this.handleClose = this.handleClose.bind(this);
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
    console.log(props, "propjjjjjjjjjjjjjjjjjjjjjjjjjjjjs");
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
    state["customer"][e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
    this.props.setDelivarydetails(this.state, this.state);
  }
  itemInsert(address_id) {
    var addressDetails = {};
    let state = this.state;
    this.props.getaddress.map((e, index) => {
      if (address_id === e.id) {
        addressDetails = e;
        Object.keys(addressDetails).map(key => {
          state["customer"][key] = addressDetails[key];
        });
        this.setState(state);
        this.props.setDelivarydetails(this.state, this.state);
        this.setState({ address: e, shippingoption: null });
        this.props.setAddress(addressDetails);
      }
    });
  }
  handleEdit(address_id) {
    this.props.getaddress.map((e, index) => {
      if (address_id === e.id) {
        let addressDetails = e;
        this.setState({
          address: e,
          modalShow: true,
          addNewAddress: true,
          region: e.shipping_region_id
        });
      }
    });
  }
  handleDelete(address_id) {
    confirmAlert({
      title: "Delete Address",
      message: "are you sure delete this address!",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.deleteAddress({
              token: this.props.token,
              inAddressId: address_id
            });
            this.props.getAddress({
              token: this.props.token,
              inEmail: this.props.user ? this.props.user.email : ""
            });
            this.setState({ region: null });
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  }

  handleAdd() {
    this.setState({ modalShow: true, addNewAddress: false, address: {} });
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

    if (!state["shippingoption"]) {
      state["errors"]["shippingoption"] = "Should select a delivery option.";
      hasErrors = true;
    }
    if (!hasErrors) {
      this_ref.props.nextStage(this_ref.stage);
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

  handleClose() {
    this.setState({ modalShow: false, address: {} });
  }

  setDefaultAddress(address) {
    this.setState({
      default: true,
      address_id: address.id,
      region: address.shipping_region_id
    });
    this.props.getShippingOptions({
      token: this.props.token,
      inShippingRegionId: address.shipping_region_id
    });
  }
  addressList(getAddress) {
    return getAddress.map((address, index) => {
      return (
        <div key={index} className="col-md-6 col-lg-4 item">
          <div
            className={
              "hot_block" +
              " " +
              (address.id == this.state.address_id ? "default" : "")
            }
            onClick={() => this.setDefaultAddress(address)}
          >
            <div
              className="address"
              onClick={add => this.itemInsert(address.id)}
            >
              <h3>{address.address_name} Address</h3>
              <div>
                <div>{address.address_1} </div>
                <div> {address.address_2}</div>
                <div>
                  {address.city}, {address.postal_code}
                </div>
                <div> {address.country}</div>
              </div>
              <p>Mobile number : {address.mob_phone} </p>
            </div>

            <div className="next_step">
              <button
                type="button"
                className="btn btn-md save_address"
                onClick={() => this.handleEdit(address.id)}
              >
                Edit
              </button>

              <button
                type="button"
                className="btn btn-md "
                onClick={() => this.handleDelete(address.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    let this_ref = this;
    let regions = [];
    let shippingOptions = [];
    console.log(this.state, "state");
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
            <AddressPopupForm
              modalShow={this.state.modalShow}
              onHide={this.handleClose}
              addressDetails={this.state.address}
              customerDetails={this.state.customer}
              setDelivarydetails={this.props.setDelivarydetails}
              addNewAddress={this.state.addNewAddress}
              region={this.state.region ? this.state.region : "hello"}
              setDefaultAddress={address => this.setDefaultAddress(address)}
            />
            <div className="col-md-12">
              <h2 className="pb-3">Select Address</h2>
            </div>
            {getAddress ? this.addressList(getAddress) : ""}
            <div className="col-md-6 col-lg-4 item add-address-block">
              <div className="hot_block" onClick={() => this.handleAdd()}>
                <div className="address">
                  <i className="fas fa-plus" />
                  <h3>Add Address</h3>
                </div>
              </div>
            </div>
          </Row>

          {this.state.region ? (
            <div className="form-group delivery_options">
              <label className="form-check-label" htmlFor="exampleCheck1">
                <h2>Delivery Options </h2>
              </label>
              <div className="row radio-checkbox-block">
                {shippingOptions.map(function(option, index) {
                  return (
                    <div key={index} className="col-md-6">
                      <input
                        type="radio"
                        data-option={JSON.stringify(option)}
                        data-value={option.shipping_id}
                        name="shippingoption"
                        id={"option" + option.shipping_id}
                        onClick={this_ref.setShippingOption.bind(this_ref)}
                      />
                      <span />
                      <label htmlFor={"option" + option.shipping_id}>
                        <h3>{option.shipping_type}</h3>
                      </label>
                    </div>
                  );
                })}
              </div>
              {this.showError("shippingoption")}
            </div>
          ) : (
            <div />
          )}
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
    getaddress: state.get("products").getAddress,
    address: state.get("order").address
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
    getAddress: data => dispatch(Actions.getAddress.request(data)),
    deleteAddress: data => dispatch(Actions.deleteAddress.request(data)),
    setAddress: data => dispatch(Actions.setAddress(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delivery);
