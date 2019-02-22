import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import "../../scss/home.scss";
import io from 'socket.io-client';
import {PROVIDERS} from "../../services/constants"
import { API_ROOT } from "../../services/constants";
import { setUser } from "../../actions";
import {setCookie,getCookie,deleteCookie} from "../../services/helpers"

const socket = io("http://localhost:5000");

 class Login extends Component {
  constructor(props)
  {
      super(props);
  }
  componentDidMount() {
    var props=this.props
    var this_ref=this;
    PROVIDERS.map(provider => {
      console.log(provider);
      socket.on(provider, data => {
        console.log(data);
        if(data.token)
        {
          console.log(data.user);
          setCookie("s-atk",data.token,0.2);
          props.setUser(data.user);
        } 
      });
    }
    )
   
  }
  render() {
    
    return (
      <div className="login">
        <Container>
        {PROVIDERS.map((provider,key) => 
            <a key={key} href={API_ROOT+"sociallogin/"+provider+"?socketId="+socket.id} target="_blank">{provider}</a>
          )}
        </Container>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: user => dispatch(setUser(user))
  };
}

export default connect(null, mapDispatchToProps)(Login);
