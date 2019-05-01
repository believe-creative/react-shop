import React from "react";
import { Switch, Route } from "react-router";
import Nav from "../components/NavBar/navbar";
import Home from "../containers/Home/home";
import Footer from "../components/Footer/footer";
import Categories from "../containers/Category/categories";
import Category from "../containers/Category/category";
import ProductDetails from "../containers/ProductDetails/productdetails";
import Checkout from "../components/Checkout/checkout";
import Items from "../components/Items/items";
import Login from "../containers/Login/login";
import UserBlock from "../components/UserBlock/userblock";
import SearchItem from "../components/NavBar/searchitem";

const routes = (
  <React.Fragment>
    <UserBlock />
    <Nav />
    <div id="main">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Items} />
        <Route exact path="/search/:searchitem" component={SearchItem} />
        <Route exact path="/checkout" component={Checkout} />
        <Route
          exact
          path="/product/:productid/:productname"
          component={ProductDetails}
        />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/categories/:category" component={Category} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
    <Footer />
  </React.Fragment>
);

export default routes;
