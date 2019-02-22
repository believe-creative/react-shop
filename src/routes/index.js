import React from "react";
import { Switch, Route } from "react-router";
import Nav from "../components/NavBar/navbar";
import Home from "../containers/Home/home";
import Footer from "../components/Footer/footer";
import Category from "../containers/Category/category";
import Login from "../containers/Login/login";

const routes = (
  <React.Fragment>
    <Nav />
    <div id="main">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/category/:category" component={Category} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
    <Footer />
  </React.Fragment>
);

export default routes;
