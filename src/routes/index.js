import React from "react";
import { Switch, Route } from "react-router";
import Nav from "../components/NavBar/navbar";
import Home from "../components/Home/home";
import Footer from "../components/Footer/footer";

const routes = (
  <React.Fragment>
    <Nav />
    <div id="main">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/men" component={Home} />
      </Switch>
    </div>
    <Footer />
  </React.Fragment>
);

export default routes;
