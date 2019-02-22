import React from "react";
import { Switch, Route } from "react-router";
import Nav from "../components/NavBar/navbar";
import Home from "../containers/Home/home";
import Footer from "../components/Footer/footer";
import Category from "../containers/Category/category";
import Checkout from "../components/Checkout/checkout";
const routes = (
  <React.Fragment>
    <Nav />
    <div id="main">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/:category" component={Category} />
      </Switch>
    </div>
    <Footer />
  </React.Fragment>
);

export default routes;
