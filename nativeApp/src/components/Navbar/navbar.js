import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';
import { createDrawerNavigator,createStackNavigator, createAppContainer } from 'react-navigation';
import DropdownMenu from 'react-native-dropdown-menu';
import { connect } from "react-redux";
import * as Actions from "../../actions";
import NavigationService from '../../routes/NavigationService.js';
import UserBlock from '../UserBlock/userblock';
import {styles} from './navbar-styles'; 

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }
  componentDidMount() {
  this.props.getToken();

  }

  componentWillReceiveProps(props) {

    if (props.token) {
      if (this.state.token !== props.token) {
        this.setState({ token: props.token });
        if (!this.props.categories)
          this.props.getCategories({ token: props.token });
      }
    }

  }
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {

    return (
        <View style={styles.header}>
        <UserBlock/>
		 <View style={styles.headtop}>
        <View style={styles.logo}>
		 <Image
        style={{width: 120, height: 60}}
        source={require('../../images/proof-of-concept.png')}
        />
		  </View>
		  <View style={styles.burgermenu}>
        <TouchableOpacity >
          {/*Donute Button Image */}
          <Image
            source={require('../../images/menu_icon.png')}
            style={{ width: 40, height: 25, marginLeft: 5, marginTop: 20, }}
          />
        </TouchableOpacity>
			 </View>
			 </View>
			 <View style={styles.menu_block}>
        {this.props.categories && Object.values(this.props.categories).map((e,index)=>{
          console.log(e);
          return(
            <Text style={{padding: 10, fontSize: 14}} onPress={() => {
                NavigationService.navigate('Categories', {
              itemId: e.department_id,
              categoryName: e.name,
            });
            }}>
           {e.name}
           </Text>
       );
        })}
		  </View>
     </View>

    );
  }

}
const productRequest = Actions.products.request;
const checkUserLogin = Actions.checkUserLogin.request;

const mapStateToProps = state => ({
  categories: state.get("products").categories,
  cart: state.get("products").cart,
  token: state.get("user").token
});

const mapDispatchToProps = dispatch => ({
  productRequest,
  checkUserLogin,
  getCategories: data => dispatch(Actions.getCategories.request(data)),
  getCartProducts: inCartId =>
    dispatch(Actions.getCartProducts.request(inCartId)),
  getToken: () => dispatch(Actions.getToken.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
