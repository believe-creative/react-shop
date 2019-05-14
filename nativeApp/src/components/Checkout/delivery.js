import React, { Component } from "react";
import {Alert, Text, View,Button, TouchableOpacity, ScrollView} from 'react-native';
import { RadioButton } from 'react-native-paper';
import * as Actions from "../../actions";
import { setRegion, setShippingOption } from "../../actions";
import { connect } from "react-redux";
import AddressPopupForm  from "./addressPopupForm";
import {styles} from '../../containers/Home/home-styles';
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
      default: false,
      checked: "",
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
    Alert.alert(
      "Delete Address",
      "Are you sure to delete this address?",
      [  
        {text: 'Yes', onPress: () => {
          this.props.deleteAddress({
            token: this.props.token,
            inAddressId: address_id
          });
          this.props.getAddress({
            token: this.props.token,
            inEmail: this.props.user ? this.props.user.email : ""
          });
          this.setState({ region: null });
        }},      
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        
      ],
      {cancelable: false},
    );    
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
        <Text >{this.state["errors"][opt]}</Text>
      );
    } else {
      return <Text />;
    }
  }

  handleClose() {
    this.setState({ modalShow: false, address: {} });
  }

  setDefaultAddress(address) {
    this.itemInsert(address.id);
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
        <TouchableOpacity style={this.state.selected ? styles.selected:styles.notselected} onPress={() => this.setDefaultAddress(address)}>
          <View style={styles.address_block}>
				 <View >
					 <Text style={{...styles.h3, ...styles.black}}>{address.address_name} Address</Text>
					 <Text>{address.address_1}</Text>
					 <Text>{address.address_2}</Text>
					 <Text>{address.city}, {address.postal_code}</Text>
					 <Text>{address.country}</Text>
					 <Text>Mobile number : {address.mob_phone} </Text>
				 </View>
				<View style={{...styles.delivery_options, ...styles.space_top}}>
					<Text style={{...styles.button, ...styles.mright}} onPress={()=>this.handleEdit(address.id)}>Edit</Text>
					<Text style={{...styles.button, ...styles.mright}} onPress={()=>this.handleDelete(address.id)}>Delete</Text>
				</View>
        	</View>
            </TouchableOpacity>

      );
    });
  }
  render() {
    const { checked } = this.state;
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

        <ScrollView style={styles.gray_bg}>
          <View style={styles.confirmation_block}>
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
			 <Text style={{...styles.h2, ...styles.black, ...styles.nospace}}>Select Address</Text>
			 	<View>
            	{getAddress ? this.addressList(getAddress) : <Text>""</Text>}
				</View>

					<TouchableOpacity onPress={() => this.handleAdd()}>
						<View style={styles.addaddress_block}>
							<Text style={styles.plus}>+</Text>
							<Text  style={{...styles.h2, ...styles.black, ...styles.nospace}}>
                		Add Address
              			</Text>
					</View>
							</TouchableOpacity>
              {this.state.region ? (
                <View >
                  <Text style={{...styles.h3, ...styles.black}}>Delivery Options</Text>
                  <View >
                    {shippingOptions.map(function(option, index) {
                      return (
                        <TouchableOpacity key={index} style={styles.delivery_options} onPress={() => {
                          let state = this_ref.state;
                          state["shippingoption"] = option.shipping_id ;
                          state["checked"] = option.shipping_id ;
                          this_ref.setState(state);
                          this_ref.props.setDelivarydetails(this_ref.state, this_ref.state);
                          this_ref.props.setShippingOption(option);
                       }} >
                        <RadioButton style={styles.radio_btn}
                        value={option.shipping_id}
                        status={checked === option.shipping_id ? 'checked' : 'unchecked'}
                        />
								<Text style={styles.options}>{option.shipping_type}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  {this.showError("shippingoption")}
                </View>
              ) : (
                <Text />
              )}


				<View style={styles.back_and_next_btn_block}>
				  <TouchableOpacity onPress={this.backStage.bind(this)}><Text style={styles.button}>Back</Text></TouchableOpacity>
				  <TouchableOpacity onPress={this.nextStage.bind(this)}><Text style={styles.button}>Next Step</Text></TouchableOpacity>
				</View>
          </View>
        </ScrollView>

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
  mapDispatchToProps,
  null,
  {pure:false}
)(Delivery);
