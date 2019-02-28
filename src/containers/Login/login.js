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
import { setCookie, getCookie } from "../../services/helpers";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const socket = io(API_ROOT.split("/api/")[0]);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      email: "",
      pwd: "",
      errors: null
    };
  }
  login() {
    let props = this.props;
    let this_ref = this;

    axios
      .get(API_ROOT + "get_token")
      .then(function(response) {
        axios
          .post(
            API_ROOT + "login",
            {
              email: this_ref.state.email,
              pwd: this_ref.state.pwd
            },
            { Authorization: `Bearer ${response.data.token}` }
          )
          .then(function(response) {
            if (response.data.status === "error") {
              this_ref.setState({ errors: response.data.msg });
            } else {
              setCookie("s-atk", response.data.token, 0.2);
              props.setUser(response.data.user);
              this_ref.setState({ errors: null });
            }
          })
          .catch(function(error) {});
      })
      .catch(function(error) {});
  }
  change(e) {
    let state = this.state;
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  }
  componentDidMount() {
    var c = getCookie("s-atk");
    if (c) {
      this.props.checkUserLogin(c);
    }
    var props = this.props;

    PROVIDERS.map(provider => {
      socket.on(provider, data => {
        if (data.token) {
          setCookie("s-atk", data.token, 0.2);
          props.setUser(data.user);
        }
      });
      return provider;
    });
  }
  show_errors() {
    if (this.state.errors) {
      return <div className="alert alert-danger">{this.state.errors}</div>;
    } else {
      return <div />;
    }
  }
  openPopup(e) {
    e.preventDefault();
    const { provider, socket } = this.props
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = e.currentTarget.getAttribute("href");

    window.open(url, '',       
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }
  render() {
    let name = null;
    const props = this.props;
    if (this.props.user) {
      name = this.props.user.name;
    }
    if (props.user) {
      if (props.user.email) {
        let route = localStorage.getItem("nextRoute");
        if (route) {
          if (route.length > 0) {
            localStorage.setItem("nextRoute", "");
            props.history.push(route);
          }
          else
          {
            props.history.push("/");
          }
        }
        else
        {
          props.history.push("/");
        }
      }
    }
    return (
      <div className="signin-form pt-5">
        <Container>
          <Row>
            <Col md={6} className="offset-md-3">
              {name ? (
                <h4 className="text-center">You have already logged.</h4>
              ) : (
                <div>
                  {PROVIDERS.map((provider, key) => (
                    <a
                      key={key}
                      className={provider}
                      onClick={this.openPopup.bind(this)}
                      href={
                        API_ROOT +
                        "sociallogin/" +
                        provider +
                        "?socketId=" +
                        socket.id
                      }
                      target="_blank"
                      ref="noopener noreferrer"
                    >
                      {provider}
                    </a>
                  ))}
                  <div className="pt-3">
                    {this.show_errors()}
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
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
                      <label htmlFor="pwd">Password:</label>
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
                    <button
                      type="button"
                      className="btn btn-md mb-3"
                      onClick={this.login.bind(this)}
                    >
                      Submit
                    </button>
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
