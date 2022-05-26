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
import {LoginManager,LoginButton,AccessToken ,GraphRequest,GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

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
    this._responseInfoCallback=this._responseInfoCallback.bind(this);
    this.userInfo="";
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
    GoogleSignin.configure({
    webClientId:"723179674220-dpuchaqikq3rrc5geg1493q63n9m35cb.apps.googleusercontent.com",
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
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
  _signIn() {
    let props=this.props;

  try {
    GoogleSignin.hasPlayServices().then(function(){
          GoogleSignin.signIn().then(function(userinfo){
            axios
            .post(
              API_ROOT + "userExists",
              {
                name: userinfo.user.name,
                email: userinfo.user.email
              },
              { headers: { Authorization: `Bearer ${props.token}` } }
            )
            .then(function(response) {
              // console.log("here");
              if(response.data.user)
              {
                // console.log("here 2");
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
                // console.log("here 3");
              }
              else
              {
                console.log("here 4");
                  NavigationService.navigate("SetPassword",{username:userinfo.user.name,email:userinfo.user.email});
              }
              console.log("here 5");
            },function(e){
              console.log("some error 22",e);
            })
            .catch(function(error) {
              console.log("some error 4444");
            });
          },function(e){
              console.log(e);
          })
    },function(e){
      console.log(e);
    });

  } catch (error) {
    console.log("Error Came now",error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log("user cancelled the login flow");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (f.e. sign in) is in progress already
      console.log("operation (f.e. sign in) is in progress already");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log("play services not available or outdated");
    } else {
      // some other error happened
      console.log("some other error happened",error.toString());
    }
  }
  };
getCurrentUserInfo = async () => {
  try {
    const userInfo = await GoogleSignin.signInSilently();
    this.setState({ userInfo });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      // user has not signed in yet
    } else {
      // some other error
    }
  }
};
isSignedIn = async () => {
  const isSignedIn = await GoogleSignin.isSignedIn();
  this.setState({ isLoginScreenPresented: !isSignedIn });
};
getCurrentUser = async () => {
  const currentUser = await GoogleSignin.getCurrentUser();
  this.setState({ currentUser });
};
signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    this.setState({ user: null }); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};
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
  _responseInfoCallback(data,json,data2){

    let props = this.props;
    console.log("ereeeeee",props);

  }
  initUser(token) {

    let props=this.props;
    const infoRequest = new GraphRequest(
      '/me?fields=name,email&access_token='+ token,
      null,
      function(err,json){
        console.log("sdd",json, err);
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

      }
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }
  render() {
    let name = null;
    if (this.props.user) {
      name = this.props.user.name;
    }

    return (
      <View>
      <NavBar />
      <ScrollView style={styles.home}>
      <View style={styles.login_block_main}>
      {name ?
      (<Text style={styles.loggedin_text}>You have logged successfully.</Text>
        ) : (
          <View style={styles.social_media}>
          <View>

             {PROVIDERS.map((provider, key) => {
               if(provider=="facebook")
               {
                  return <LoginButton
                  style={{ width: 185, height: 30 }}
                  readPermissions={['public_profile', "email"]}
                  onLoginFinished={
                    (error, result) => {
                      console.log("logib",error);
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
             <View   style={{ marginLeft:-3}}>
                   <GoogleSigninButton
                      style={{ width: 192, height: 48 ,marginRight:60,marginTop:5}}
                      size={GoogleSigninButton.Size.Wide}
                      color={GoogleSigninButton.Color.Dark}
                      onPress={this._signIn.bind(this)}
                      disabled={this.state.isSigninInProgress} />
                      </View>
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
