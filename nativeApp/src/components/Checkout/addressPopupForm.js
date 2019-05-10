import React, { Component } from "react";
import {Picker,Modal,Alert, Text, View,Button, TouchableOpacity, Image, ScrollView} from 'react-native';
import * as Actions from "../../actions";
import { setRegion, setShippingOption } from "../../actions";
import { connect } from "react-redux";
import { Button ,FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';

class AddressPopupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: "",
      editregion: "",
      customer: {},
      errors: {},
      address: "",
      add_address: "",
      modalVisible: false,
      selectedItems : []
    };
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    console.log("mount", this.props, this.state);
  }
  componentWillReceiveProps(props) {
    console.log(props);
    if (this.props.addressDetails) {
      this.setState({
        address: this.props.addressDetails
      });
    }
  }
  changeRegion(e) {
    let state = this.state;
    state["address"]["shipping_region_id"] = e.currentTarget.value;
    state["address"]["region"] = e.currentTarget.querySelectorAll(
      "option[value='" + e.currentTarget.value + "']"
    )[0].innerText;
    state["completeRegion"] = JSON.parse(
      e.currentTarget
        .querySelectorAll("option[value='" + e.currentTarget.value + "']")[0]
        .getAttribute("data-region")
    );
    this.setState(state);
    console.log(this.state);
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
    state["address"][e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
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
  setOptions(region) {
    this.props.getShippingOptions({
      token: this.props.token,
      inShippingRegionId: region
    });
  }

  updateAddress() {
    let state = this.state;
    this.props.updateAddress({
      token: this.props.token,
      inEmail: this.props.user ? this.props.user.email : "",
      inAddressId: this.props.addressDetails.id,
      inAddressName: state["address"]["address_name"],
      inAddress1: state["address"]["address_1"],
      inAddress2: state["address"]["address_2"],
      inCity: state["address"]["city"],
      inRegion: state["address"]["region"],
      inPostalCode: state["address"]["postal_code"],
      inCountry: state["address"]["country"],
      inShippingRegionId: state["address"]["shipping_region_id"],
      inDayPhone: state["address"]["day_phone"],
      inEvePhone: state["address"]["eve_phone"],
      inMobPhone: state["address"]["mob_phone"]
    });
    this.props.onHide();
    this.props.setRegion(state["completeRegion"]);
    this.props.getShippingOptions({
      token: this.props.token,
      inShippingRegionId: state["address"]["shipping_region_id"]
    });
    this.props.getAddress({
      token: this.props.token,
      inEmail: this.props.user ? this.props.user.email : ""
    });

    this.setState({ address: {} });
  }
  saveAddress() {
    let state = this.state;
    this.props.addAddress({
      token: this.props.token,
      inEmail: this.props.user ? this.props.user.email : "",
      inAddressName: state["address"]["address_name"],
      inAddress1: state["address"]["address_1"],
      inAddress2: state["address"]["address_2"],
      inCity: state["address"]["city"],
      inRegion: state["address"]["region"],
      inPostalCode: state["address"]["postal_code"],
      inCountry: state["address"]["country"],
      inShippingRegionId: state["address"]["shipping_region_id"],
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
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  onSelectedItemsChange = selectedItems => {
   this.setState({ selectedItems });
 };
  render() {
    const { selectedItems } = this.state;
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

    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
            <View>
              <FormLabel>Name</FormLabel>
              <FormInput value={
                this.props.addNewAddress
                  ? addressList.address_name
                  : addAddressList.address_name
              }
              name="address_name" onChangeText={this.changed.bind(this)}/>
            </View>
        {this.showError("address_name")}
          <View>
            <FormLabel>Name</FormLabel>
            <FormInput value={
              this.props.addNewAddress
                ? addressList.address_1
                : addAddressList.address_1
            }
            name="address_1" onChangeText={this.changed.bind(this)}/>
          </View>

            {this.showError("address_1")}

            <View>
              <FormLabel>Name</FormLabel>
              <FormInput value={addressList.city}
              name="city" onChangeText={this.changed.bind(this)}/>
            </View>
            {this.showError("city")}
            <View>
              <FormLabel>Name</FormLabel>
              <FormInput value={
                this.props.addNewAddress
                  ? addressList.address_2
                  : addAddressList.address_2
              }
              name="address_2" onChangeText={this.changed.bind(this)}/>
            </View>

            {this.showError("address_2")}

            <View>
              <FormLabel>Name</FormLabel>
              <FormInput value={
                this.props.addNewAddress
                  ? addressList.postal_code
                  : addAddressList.postal_code
              }
              name="postal_code" onChangeText={this.changed.bind(this)}/>
            </View>

            {this.showError("postal_code")}
            <View>
              <FormLabel>Country :</FormLabel>
              <FormInput   value={
                  this.props.addNewAddress
                    ? addressList.country
                    : addAddressList.country
                }
              name="postal_code" onChangeText={this.changed.bind(this)}/>
            </View>

            {this.showError("country")}
            <View>
            <FormLabel>Day Phone Number:</FormLabel>
            <FormInput   value={
              this.props.addNewAddress
                ? addressList.day_phone
                : addAddressList.day_phone
            }
            name="day_phone" onChangeText={this.changed.bind(this)}/>
          </View>

            {this.showError("day_phone")}
            <View>
            <FormLabel>Mobile Number :</FormLabel>
            <FormInput     value={
                this.props.addNewAddress
                  ? addressList.mob_phone
                  : addAddressList.mob_phone
              }
              name="mob_phone" onChangeText={this.changed.bind(this)}/>
          </View>


            {this.showError("mobile_phone")}

            <View>
            <FormLabel>Eve Phone Number :</FormLabel>
            <FormInput  value={
              this.props.addNewAddress
                ? addressList.eve_phone
                : addAddressList.eve_phone
            }
              name="eve_phone" onChangeText={this.changed.bind(this)}/>
          </View>



            {this.showError("evn_phone")}

              <View>
              <FormLabel>Region* :</FormLabel>
              <FormInput  value={
                this.props.addNewAddress
                  ? addressList.eve_phone
                  : addAddressList.eve_phone
              }
                name="eve_phone" onChangeText={this.changed.bind(this)}/>
            </View>
            <View>
            <Picker
              selectedValue={addressList.shipping_region_id}
              style={{height: 50, width: 100}}
              onValueChange={this_ref.changeRegion.bind(this_ref)}>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
              {regions.map(function(region, index) {
                return (
                  <Picker.Item   key={index} label={region.shipping_region} value={region.shipping_region_id} />

                );
              })}
            </Picker>
            </View>



              {this.showError("region")}
              <Button
    raised

    title='Close'
    onPress={this.props.onHide} />
    <Button
    raised
    icon={{name: 'cached'}}
    title='Save Changes'
    onPress={
      this.props.addNewAddress
        ? this.updateAddress.bind(this)
        : this.saveAddress.bind(this)
    } />
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>

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
    updateAddress: data => dispatch(Actions.updateAddress.request(data)),
    addAddress: data => dispatch(Actions.addAddress.request(data)),
    getAddress: data => dispatch(Actions.getAddress.request(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressPopupForm);
