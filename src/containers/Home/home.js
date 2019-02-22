import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import bag from "../../images/bag.png";
import pop_image from "../../images/pop_image.png";
import "../../scss/home.scss";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div class="row header_panel">
          <Container>
            <div class="col-md-6">
              <h1>Background and development</h1>
              <h2>
                Convergent the dictates of the consumer: background and
                development
              </h2>
              <p>
                <a href="#" class="btn btn-lg">
                  View All
                </a>
              </p>
            </div>
          </Container>
        </div>
        <Container>
          <div class="shop_now_panel">
            <div class="row product_panel">
              <div class="col-md-4 product_img">
                <div class="sale">SALE</div>
                <img src={bag} />
              </div>
              <div class="col-md-8 shop_now">
                <h2>Vera Bradley</h2>
                <p>
                  Carry the day in the style with this extra-large tote crafted
                  in our chic B.B. Collection textured PVC. Featuring colorful
                  faux leather trim,this tote offers a roomy interior plus just
                  enough perfectly placed.
                </p>
                <p>
                  <a href="#" class="btn btn-lg">
                    Shop Now
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div class="register_panel">
            <div class="row shop_now_panel">
              <div class="col-md-4">
                <div class="wow_block">
                  <h1>WOW</h1>
                  <h2 class="red">Check</h2>
                  <h2 class="red">WHAT!</h2>
                </div>
                <div class="wow_men_block">
                  <h1>Men</h1>
                </div>
              </div>
              <div class="col-md-8 ">
                <div class="game_begin_block">
                  <div class="pop">POP</div>
                  <img src={pop_image} />
                  <div class="game_sub_block">
                    <h1>Let The Game begin</h1>
                    <h2>Registration is on - get ready for the Open</h2>
                    <p>
                      <a href="#" class="btn btn-lg">
                        Register
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <div class="subscribe_panel">
          <div class="row">
            <div class="col-md-6 offset-md-3 subscribe_block">
              <h2 class="red">10% Discount for your subscription</h2>
              <h3>
                Carry the day in style wish this extra-large tote crafted in our
                chic B.B Collection textured PVC. Featuring colorful faux
                leather trim,this tote offers a roomy interior
              </h3>
              <div class="input_search">
                {" "}
                <form action="#" method="post">
                  {" "}
                  <i class="fa fa-envelope" />
                  <input
                    type="text"
                    value=""
                    placeholder="       your email here"
                    class="search"
                  />
                  <a href="#" class="btn btn-md">
                    Subscribe
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
