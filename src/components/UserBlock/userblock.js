import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import logo from "../../images/tshirtshop.png";
import Image from "react-bootstrap/Image";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "../../scss/navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import {PROVIDERS} from "../../services/constants"
import * as Actions from "../../actions";
import io from 'socket.io-client';
import {setCookie,getCookie,deleteCookie} from "../../services/helpers";
import { API_ROOT } from "../../services/constants";
import { setUser } from "../../actions";
const socket = io("http://localhost:5000");

class UserBlock extends Component {
  constructor(props)
  {
      super(props);
      this.state={
        user:{}
      }
  }
  componentDidMount() {
    var c=getCookie("s-atk");
    var state=this.state;
    if(c)
    {
      this.props.checkUserLogin(c);
    }
   
  }
  logout()
  {
    deleteCookie("s-atk");
    this.props.setUser({name:null,photo:null});
  }
  render() {
    console.log(this.props,"dsfdsfdsfsdfsdfdsfdsfds");
    let name=null;
    let photo=null;
    if(this.props.user)
    {
      name= this.props.user.name;
      photo= this.props.user.photo;
    }
      
    
    return (
          <div class="topbar">
          <div class="container">
            <div class="register-block">
            Hi! 
              {name
              ? 
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <img src={photo} alt={name} style={{"width":"30px"}}/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item ><h4>{name}</h4></Dropdown.Item>
                    <Dropdown.Item onClick={this.logout.bind(this)}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
              : <LinkContainer to="/login">
                  <Nav.Link>Sign in</Nav.Link>
                </LinkContainer>
            }
            </div>
            <div class="topbar-menu">
              <ul class="list-unstyled">
                <li>
                  <a href="#">Daily Deals</a>
                </li>
                <li>
                  <a href="#">Sell</a>
                </li>
                <li>
                  <a href="#">Help &amp; Contact</a>
                </li>
              </ul>
            </div>
            <div class="currency-block">&#163; GBP</div>
            <div class="price-block">
              <a href="">
                <i class="fa fa-shopping-bag" aria-hidden="true" />
              </a>{" "}
              Your bag: &#163;3.99
            </div>
            <div class="clearfix" />
          </div>
        </div>
    );
  }
}


const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.get("user")
  }
};


function mapDispatchToProps(dispatch) {
  return {
    setUser: user => dispatch(setUser(user)),
    checkUserLogin:token=>dispatch(Actions.checkUserLogin.request(token))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBlock);
