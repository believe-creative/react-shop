import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import bag from "../../images/bag.png";
import pop_image from "../../images/pop_image.png";
import "../../scss/home.scss";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="row header_panel">
          <Container>
            <div className="col-md-6">
              <h1>Background and development</h1>
              <h2>
                Convergent the dictates of the consumer: background and
                development
              </h2>
              <p>
                <LinkContainer to="/categories" className="btn btn-lg">
                  <a>View All</a>
                </LinkContainer>
              </p>
            </div>
          </Container>
        </div>
        <Container>
          <div className="shop_now_panel">
            <div className="row product_panel">
              <div className="col-md-4 product_img">
                <div className="sale">SALE</div>
                <img src={bag} />
              </div>
              <div className="col-md-8 shop_now">
                <h2>Vera Bradley</h2>
                <p>
                  Carry the day in the style with this extra-large tote crafted
                  in our chic B.B. Collection textured PVC. Featuring colorful
                  faux leather trim,this tote offers a roomy interior plus just
                  enough perfectly placed.
                </p>
                <p>
                  <a href="/checkout" className="btn btn-lg">
                    Shop Now
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="register_panel">
            <div className="row shop_now_panel">
              <div className="col-md-4">
                <div className="wow_block">
                  <h1>WOW</h1>
                  <h2 className="red">Check</h2>
                  <h2 className="red">WHAT!</h2>
                </div>
                <div className="wow_men_block">
                  <h1>Men</h1>
                </div>
              </div>
              <div className="col-md-8 ">
                <div className="game_begin_block">
                  <div className="pop">POP</div>
                  <img src={pop_image} />
                  <div className="game_sub_block">
                    <h1>Let The Game begin</h1>
                    <h2>Registration is on - get ready for the Open</h2>
                    <p>
                      <a href="#" className="btn btn-lg">
                        Register
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        {/* <div className="subscribe_panel">
          <div className="row">
            <div className="col-md-6 offset-md-3 subscribe_block">
              <h2 className="red">10% Discount for your subscription</h2>
              <h3>
                Carry the day in style wish this extra-large tote crafted in our
                chic B.B Collection textured PVC. Featuring colorful faux
                leather trim,this tote offers a roomy interior
              </h3>
              <div className="input_search">
                {" "}
                <form action="#" method="post">
                  {" "}
                  <i className="fa fa-envelope" />
                  <input
                    type="text"
                    placeholder="       your email here"
                    className="search"
                  />
                  <a href="#" className="btn btn-md">
                    Subscribe
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
