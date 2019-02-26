import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import "../../scss/home.scss";
import "../../scss/login.scss";
import io from "socket.io-client";
import { PROVIDERS } from "../../services/constants";
import { API_ROOT } from "../../services/constants";
import { setUser } from "../../actions";
import * as Actions from "../../actions";
import { setCookie, getCookie, deleteCookie } from "../../services/helpers";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const socket = io(API_ROOT.split("/api/")[0]);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      email: null,
      pwd: null,
      errors: null
    };
  }
  login() {
    let props = this.props;
    let this_ref = this;
    axios
      .post(API_ROOT + "login", {
        email: this.state.email,
        pwd: this.state.pwd
      })
      .then(function(response) {
        console.log(response);
        if (response.data.status == "error") {
          this_ref.setState({ errors: response.data.msg });
          console.log(this_ref.state);
        } else {
          setCookie("s-atk", response.data.token, 0.2);
          props.setUser(response.data.user);
          this_ref.setState({ errors: null });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  change(e) {
    let state = this.state;
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  }
  componentDidMount() {
    var c = getCookie("s-atk");
    var state = this.state;
    if (c) {
      this.props.checkUserLogin(c);
    }
    var props = this.props;
    var this_ref = this;
    PROVIDERS.map(provider => {
      console.log(provider);
      socket.on(provider, data => {
        console.log(data);
        if (data.token) {
          console.log(data.user);
          setCookie("s-atk", data.token, 0.2);
          props.setUser(data.user);
        }
      });
    });
  }
  show_errors() {
    if (this.state.errors) {
      return <div className="alert alert-danger">{this.state.errors}</div>;
    } else {
      return <div />;
    }
  }
  render() {
    let name = null;
    if (this.props.user) {
      name = this.props.user.name;
    }
    return (
      <div className="signin-form mt-5 mb-5">
        <Container>
          <Row>
            <Col md={6} className="offset-md-3">
              {name ? (
                <h4>You have already logged.</h4>
              ) : (
                <div>
                  {PROVIDERS.map((provider, key) => (
                    <a
                      key={key}
                      className={provider}
                      href={
                        API_ROOT +
                        "sociallogin/" +
                        provider +
                        "?socketId=" +
                        socket.id
                      }
                      target="_blank"
                    >
                      {provider}
                    </a>
                  ))}
                  <div className="pt-3">
                    {this.show_errors()}
                    <div className="form-group">
                      <label for="email">Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={this.state.email}
                        placeholder="Enter email"
                        name="email"
                        onChange={this.change.bind(this)}
                      />
                    </div>
                    <div className="form-group">
                      <label for="pwd">Password:</label>
                      <input
                        type="password"
                        className="form-control"
                        id="pwd"
                        value={this.state.pwd}
                        placeholder="Enter password"
                        name="pwd"
                        onChange={this.change.bind(this)}
                      />
                    </div>
                    <div class="mb-3 radio-checkbox-block">
                      <input type="checkbox" />
                      <span />
                      <label for="checkbox">Remember</label>
                    </div>
                    <button
                      type="button"
                      className="btn btn-md mb-3"
                      onClick={this.login.bind(this)}
                    >
                      Submit
                    </button>
                    <div>
                      <a href="#">Forgot Password</a>
                    </div>
                  </div>
                </div>
              )}
              {}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.get("user")
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
