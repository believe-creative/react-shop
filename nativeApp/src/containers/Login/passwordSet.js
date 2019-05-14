import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { PROVIDERS } from "../../services/constants";
import { API_ROOT } from "../../services/constants";
import { setUser } from "../../actions";
import * as Actions from "../../actions";
import {Modal,Platform, StyleSheet, Text, View, Image,TouchableOpacity,Button,TextInput,Linking,ScrollView,deviceHeight} from 'react-native';
import axios from "axios";
import NavigationService from '../../routes/NavigationService.js';
import SyncStorage from 'sync-storage';
import {styles} from '../Home/home-styles'; 
import Footer from '../../components/Footer/footer';
import { WebView } from 'react-native-webview';


const socket = io(API_ROOT.split("/api/")[0]);


class SetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: "",
      pwd: "",
      rpwd:'',
      errors:''
    };
  }
  savePassword() {
    if(this.state.pwd.length<=0)
    {
        this.setState({errors:"Please enter password"});
        return;
    }
    else if(this.state.pwd.length<6)
    {
        this.setState({errors:"Please enter Atleast 6 characters"});
        return;
    }
    else if(this.state.pwd!=this.state.rpwd)
    {
        this.setState({errors:"Passwords don't match."});
        return;
    }
    else
    {
        let props = this.props;
        let this_ref = this;
        axios
          .post(
            API_ROOT + "setPassword",
            {
                name:this_ref.state.username,
                email: this_ref.state.email,
                pwd: this_ref.state.pwd
            },
            { headers: { Authorization: `Bearer ${props.token}` } }
          )
          .then(function(response) {
            if (response.data.status === "error") {
              this_ref.setState({ errors: response.data.msg });
            } else {
              SyncStorage.set("s-atk",response.data.token);
              props.setUser(response.data.user);
              this_ref.setState({ errors: null });
              let route =SyncStorage.get("nextRoute");
              if (route) {
                if (route.length > 0) {
                  SyncStorage.remove("nextRoute");
                  NavigationService.navigate(route);
                } else {
                  NavigationService.navigate("Home");
                }
              } else {
                NavigationService.navigate("Home");
              }
            }
          })
    }
  }
  change(e) {
    let state = this.state;
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  }
  componentDidMount() {
    // var c = SyncStorage.get("s-atk");
    // if (c) {
    //   this.props.checkUserLogin(c);
    // } 
    // var props = this.props;
    console.log("SetPassword");
    const { navigation } = this.props;
    const username = navigation.getParam('username', '');
    const email = navigation.getParam('email', '');
    this.setState({username:username,email:email});

  }
  show_errors() {
    if (this.state.errors) {
      return <Text>{this.state.errors}</Text>;
    } else {
      return <View />;
    }
  }
  render() {

    return (
      <ScrollView style={styles.home}>
            {this.show_errors()}
		    <View style={styles.input_block}>
            <Text htmlFor="email" style={styles.input_text}>Name:</Text>
            <TextInput
               style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft:10, paddingRight:10}}
               onChangeText={(text) => this.setState({username:text})}
               value={this.state.username}
               editable={false}
            />
          </View>
          <View style={styles.input_block}>
                <Text htmlFor="email" style={styles.input_text}>Email:</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft:10, paddingRight:10}}
                    onChangeText={(text) => this.setState({email:text})}
                    value={this.state.email}
                    editable={false}
                />
            </View>
            <View style={styles.input_block}>
                <Text htmlFor="email" style={styles.input_text}>Password:</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft:10, paddingRight:10}}
                    onChangeText={(text) => this.setState({pwd:text})}
                    value={this.state.pwd}
                />
            </View>
            <View style={styles.input_block}>
                <Text htmlFor="email" style={styles.input_text}>Enter password Again:</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft:10, paddingRight:10}}
                    onChangeText={(text) => this.setState({rpwd:text})}
                    value={this.state.rpwd}
                />
            </View>
            <View style={styles.login_btn_block}>
                <TouchableOpacity onPress={this.savePassword.bind(this)}><Text style={styles.button}>Submit</Text></TouchableOpacity>
            </View>
			<Footer />           
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.get("user"),
    token: state.get("user").token
  };
};
function mapDispatchToProps(dispatch) {
  return {
    setUser: user => dispatch(setUser(user)),
    checkUserLogin: token => dispatch(Actions.checkUserLogin.request(token))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetPassword);
