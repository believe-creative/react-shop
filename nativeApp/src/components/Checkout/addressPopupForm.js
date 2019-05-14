import React, { Component } from "react";
import {Picker, Modal ,Alert, Text,TextInput, View , TouchableOpacity, Image, ScrollView,TouchableHighlight} from 'react-native';
import * as Actions from "../../actions";
import { setRegion, setShippingOption } from "../../actions";
import { connect } from "react-redux";
import {styles} from '../../containers/Home/home-styles';

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
      modalVisible: false
    };
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    console.log("mount", this.props, this.state);
  }
  componentWillReceiveProps(props) {    
    if (props.addressDetails) {      
      this.setState({
        address: props.addressDetails
      });
    }
  }
  changeRegion(itemValue,itemIndex) {
    let state = this.state;    
    state["address"]["shipping_region_id"] = itemValue;
    state["address"]["region"] = itemValue;

    state["completeRegion"] = itemValue;
    this.setState(state);    
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

  changed(value,title) {    
    let state = this.state;
    state["address"][title] = value;
    this.setState(state);
    this.props.setDelivarydetails(this.state, this.state);
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

  render() {

    let this_ref = this;
    let regions = [];
    let shippingOptions = [];
    let state=this.state;
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
    let getAddress = this.props.getaddress.length > 0 ? this.props.getaddress : "";
      
    return (
      <ScrollView >
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalShow}
          >
          <ScrollView style={styles.add_address_block}>
				 <View style={styles.address_top_block}>
          		<Text style={styles.address_title}>{this.props.addNewAddress ? "Edit Address" : "Add Address"}</Text>
            	<TouchableOpacity onPress={this.props.onHide}><Text style={styles.close}>x</Text></TouchableOpacity>
          	 </View>

              <Text style={styles.input_text}>Name</Text>

              <TextInput value={
                this.props.addNewAddress
                  ? addressList.address_name
                  : addAddressList.address_name
              }
              style={styles.input_field}
              title="address_name" onChangeText={

                  function(text){

                    state["address"]["address_name"] = text;
                    this_ref.setState(state);
                    this_ref.props.setDelivarydetails(this_ref.state, this_ref.state);
                  }}/>

        {this.showError("address_name")}

            <Text style={styles.input_text}>Address 1*</Text>
            <TextInput style={styles.input_field} value={
              this.props.addNewAddress
                ? addressList.address_1
                : addAddressList.address_1
            }
            title="address_1" onChangeText={  function(text){
                console.log(text);

                state["address"]["address_1"] = text;
                this_ref.setState(state);
                this_ref.props.setDelivarydetails(this_ref.state, this_ref.state);
              }}/>


            {this.showError("address_1")}


              <Text style={styles.input_text}>Address 2</Text>
              <TextInput style={styles.input_field} value={
                this.props.addNewAddress
                  ? addressList.address_2
                  : addAddressList.address_2
              }
              title="address_2" onChangeText={function(text){
                  console.log(text);

                  state["address"]["address_2"] = text;
                  this_ref.setState(state);
                  this_ref.props.setDelivarydetails(this_ref.state, this_ref.state);
                }}/>


            {this.showError("address_2")}

              <Text style={styles.input_text}>City *</Text>
              <TextInput style={styles.input_field} value={
                this.props.addNewAddress
                  ? addressList.city
                  : addAddressList.city
              }
              title="city" onChangeText={function(text){
                  console.log(text);

                  state["address"]["city"] = text;
                  this_ref.setState(state);
                  this_ref.props.setDelivarydetails(this_ref.state, this_ref.state);
                }}/>


            {this.showError("city")}


              <Text style={styles.input_text}>Zip-code *</Text>
              <TextInput style={styles.input_field} value={
                this.props.addNewAddress
                  ? addressList.postal_code
                  : addAddressList.postal_code
              }
              title="postal_code" onChangeText={function(text){
                  console.log(text);

                  state["address"]["postal_code"] = text;
                  this_ref.setState(state);
                  this_ref.props.setDelivarydetails(this_ref.state, this_ref.state);
                }}/>


            {this.showError("postal_code")}

              <Text style={styles.input_text}>Country :</Text>
              <TextInput style={styles.input_field} value={
                  this.props.addNewAddress
                    ? addressList.country
                    : addAddressList.country
                }
              title="country" onChangeText={function(text){
                  console.log(text);

                  state["address"]["country"] = text;
                  this_ref.setState(state);
                  this_ref.props.setDelivarydetails(this_ref.state, this_ref.state);
                }}/>


            {this.showError("country")}

            <Text style={styles.input_text}>Mobile Number :</Text>
            <TextInput style={styles.input_field} value={
              this.props.addNewAddress
                ? addressList.mob_phone
                : addAddressList.mob_phone
            }
            title="mob_phone" onChangeText={function(text){
                console.log(text);

                state["address"]["mob_phone"] = text;
                this_ref.setState(state);
                this_ref.props.setDelivarydetails(this_ref.state, this_ref.state);
              }}/>


            {this.showError("mob_phone")}

            <Text style={styles.input_text}>Day Phone Number:</Text>
            <TextInput style={styles.input_field} value={
                this.props.addNewAddress
                  ? addressList.day_phone
                  : addAddressList.day_phone
              }
              title="day_phone" onChangeText={function(text){
                  console.log(text);

                  state["address"]["day_phone"] = text;
                  this_ref.setState(state);
                  this_ref.props.setDelivarydetails(this_ref.state, this_ref.state);
                }} />

            {this.showError("day_phone")}

            <Text style={styles.input_text}>Eve Phone Number :</Text>
            <TextInput style={styles.input_field} value={
              this.props.addNewAddress
                ? addressList.eve_phone
                : addAddressList.eve_phone
            }
              title="eve_phone" onChangeText={function(text){
                  console.log(text);

                  state["address"]["eve_phone"] = text;
                  this_ref.setState(state);
                  this_ref.props.setDelivarydetails(this_ref.state, this_ref.state);
                }}/>

            {this.showError("evn_phone")}

            <Text style={styles.input_text}>Region* :</Text>
            <Picker style={styles.select_field}
              selectedValue={addressList.shipping_region_id}
              onValueChange={function(itemValue, itemIndex){
                  console.log(regions,itemValue,itemIndex);

                  state["address"]["shipping_region_id"] =itemValue;
                  Object.values(regions).map((region1, ind)=> {
                    if(region1.shipping_region_id == itemValue ){
                        state["address"]["region"] = region1.shipping_region;
                        this_ref.setState(state);
                        return;
                    }
                  })


                }}>

              {regions.map(function(region, index) {
                return (
                  <Picker.Item   key={index} label={region.shipping_region} value={region.shipping_region_id} />

                );
              })}
            </Picker>

            {this.showError("region")}
				<View style={{...styles.address_top_block,...styles.space_bot}}>
            <Text style={styles.button} onPress={
                this.props.addNewAddress
                ? this.updateAddress.bind(this)
                : this_ref.saveAddress.bind(this_ref)
              } >Save Changes</Text>
				<TouchableOpacity onPress={this.props.onHide}><Text style={styles.button}>Close</Text></TouchableOpacity>
            </View>

          </ScrollView>
        </Modal>
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
  mapDispatchToProps,
  null,
  {pure:false}
)(AddressPopupForm);
