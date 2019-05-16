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
import NavBar from '../../components/Navbar/navbar';
import {LoginManager,LoginButton,AccessToken} from 'react-native-fbsdk';


const socket = io(API_ROOT.split("/api/")[0]);


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      email: "",
      pwd: "",
      errors: null,
      isSigninInProgress:false
    };
  }

  login() {
    let props = this.props;
    let this_ref = this;
    axios
      .post(
        API_ROOT + "login",
        {
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
        }
      })
      .catch(function(error) {});
  }
  change(e) {
    let state = this.state;
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  }
  logout()
  {
    console.log("logged out");
    SyncStorage.remove('s-atk');
    this.props.setUser({ email: null, name: null, photo: null });
    NavigationService.navigate("Home");
  }
  componentDidMount() {
    var c = SyncStorage.get("s-atk");
    if (c) {
      this.props.checkUserLogin(c);
    }
    var props = this.props;

    PROVIDERS.map(provider => {
      socket.on(provider, data => {
        if (data.token) {
          SyncStorage.set("s-atk",data.token);
          props.setUser(data.user);
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
      });
      return provider;
    });

  }
  show_errors() {
    if (this.state.errors) {
      return <Text>{this.state.errors}</Text>;
    } else {
      return <View />;
    }
  }
  openPopup(url) {
    Linking.openURL(url)
  }

  initUser(token) {
    let props=this.props;
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      console.log("dataaaaa",json,props.token,API_ROOT + "userExists");

      axios
      .post(
        API_ROOT + "userExists",
        {
          name: json.name,
          email: json.email
        },
        { headers: { Authorization: `Bearer ${props.token}` } }
      )
      .then(function(response) {
        console.log("here");
        if(response.data.user)
        {
          console.log("here 2");
          SyncStorage.set("s-atk",response.data.token);
          props.setUser(response.data.user);
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
          console.log("here 3");
        }
        else
        {
          console.log("here 4");
            NavigationService.navigate("SetPassword",{username:json.name,email:json.email});
        }
        console.log("here 5");
      },function(e){
        console.log("some error 22",e);
      })
      .catch(function(error) {
        console.log("some error 4444");
      });


    })
    .catch(() => {
      console.log("some error 66666");
    })
  }
  render() {
    let name = null;
    if (this.props.user) {
      name = this.props.user.name;
    }
    if(name){
      NavigationService.navigate(SyncStorage.get("nextRoute"));
    }

    return (
      <View>
      <NavBar />
      <ScrollView style={styles.home}>
			<View style={styles.login_block_main}>
         {name ?
         (<Text style={styles.loggedin_text}>You have already logged.</Text>
			) : (
			  <View>
		 	<View style={styles.social_media}>
				 {PROVIDERS.map((provider, key) => {
           if(provider=="facebook")
           {
              return <LoginButton
              readPermissions={['public_profile']}
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    console.log('login has error: ', result.error)
                  } else if (result.isCancelled) {
                    console.log('login is cancelled.')
                  } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                      console.log(data,"data");
                      const { accessToken } = data
                      this.initUser(accessToken)
                    })
                  }
                }
              }
              onLogoutFinished={() => this.logout.bind(this)}
              key={key}
               />
           }
           else{
           }

         })}
	</View>
				 <View>
					{this.show_errors()}
					<View style={styles.input_block}>
					  <Text htmlFor="email" style={styles.input_text}>Email:</Text>
					  <TextInput
						 style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft:10, paddingRight:10}}
						 onChangeText={(text) => this.setState({email:text})}
						 value={this.state.email}
					  />
					</View>
					<View style={styles.input_block}>
					  <Text htmlFor="email" style={styles.input_text}>Password:</Text>
					  <TextInput
						 style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft:10, paddingRight:10}}
						 onChangeText={(text) => this.setState({pwd:text})}
             value={this.state.pwd}
             secureTextEntry={true}
					  />
					</View>
					  <View style={styles.login_btn_block}>
						<TouchableOpacity onPress={this.login.bind(this)}><Text style={styles.button}>Submit</Text></TouchableOpacity>
					  </View>
				 </View>
			  </View>
			)}
		 	</View>
			<Footer />
      </ScrollView>
      </View>
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
)(Login);
