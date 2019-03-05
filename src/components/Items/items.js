import React, { Component } from "react";
import "../../scss/cart.scss";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { confirmAlert } from 'react-confirm-alert';
import * as Actions from "../../actions";
import 'react-confirm-alert/src/react-confirm-alert.css'

class Items extends Component {
  constructor(props) {
    super(props);
    this.state={
      buttonStyles:{cursor:"pointer"},
      cart:{}
    }
  }
  componentDidMount()
  {
    const props=this.props;
    let state=this.state;
    state["buttonStyles"]={pointerEvents: "auto","cursor":"pointer"};
    if(props.cart)
    {
      if(props.cart.count!==undefined && props.cart.count!=null)
      {
         if(props.cart.count<=0)
         {

           state["buttonStyles"]={pointerEvents: "none"};
         }
         state["cart"]=props.cart;
      }
    }

    this.setState(state);
  }
  componentWillReceiveProps(props)
  {
    let state=this.state;
    state["buttonStyles"]={pointerEvents: "auto","cursor":"pointer"};
    if(props.cart.count!==undefined && props.cart.count!==null)
     {
        if(this.state.cart.count===undefined || this.state.cart.count===null)
        {
            this.props.getCartProducts({token:props.token,inCartId:props.cart.inCartId});
        }
        else if(props.cart.count!==this.state.cart.count)
        {
          this.props.getCartProducts({token:props.token,inCartId:props.cart.inCartId});
        }
        if(props.cart.count<=0)
        {

          state["buttonStyles"]={pointerEvents: "none"};
        }
        state["cart"]=props.cart;
     }
    this.setState(state);
  }
  remove(e)
  {
    let props=this.props;
    let this_ref=this;
    let item=e.currentTarget.getAttribute("data-item");
    confirmAlert({
      title: e.currentTarget.getAttribute("data-name"),
      message: 'remove this product?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            let state=this_ref.state;
            state["buttonStyles"]={pointerEvents: "none"};
            this_ref.setState(state);
            return props.removeFromCart({token:props.token,inItemId:item});

          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    })
  }
  update(e)
  {
    let state=this.state;
    state["buttonStyles"]={pointerEvents: "none"};
    this.setState(state);
    let count=parseInt(e.currentTarget.getAttribute("data-quantity"));
    let param=parseInt(e.currentTarget.getAttribute("data-param"));
    count=count+param;
    if(count<0)
    {
      let state=this.state;
      state["buttonStyles"]={pointerEvents: "auto","cursor":"pointer"};
      this.setState(state);
    }
    else
    {
      this.props.updateProductQuantity({token:this.props.token,inItemId:e.currentTarget.getAttribute("data-item"),inQuantity:count});
    }

  }
  render() {
    let cart = { count: 0, products: [] };
    if (this.props.cart) cart = this.props.cart;
    let hasItems=cart.count>0?true:false;
    let this_ref=this;
    return (<React.Fragment>
      {hasItems?
        <div className="pt-5 mb-5">
          <div className="container">
            <div className="bg-white cart-block">
              <div className="row">
                <div className="col-md-10 offset-md-1">
                  <h2>{cart.count} Items In Your Cart</h2>
                  <div className="cart-top-block pt-2 pb-2 mb-3">
                    <ul className="list-unstyled">
                      <li>Item</li>
                      <li>Size</li>
                      <li>Quantity</li>
                      <li>Price</li>
                    </ul>
                    <div className="clearfix" />
                  </div>
                  <div className="cart-bot-block">
                    {cart.products.map(function(product,key) {
                      return (
                        <div key={key} className="cart-single-block">
                          <ul className="list-unstyled">
                            <li className="img-block">
                              <img
                                src={require(`../../images/product_images/${
                                  product.thumbnail
                                    ? product.thumbnail
                                    : "afghan-flower-2.gif"
                                }`)}
                              />
                              <span>
                                <h3>{product.name}</h3>
                                <p>Men BK3569</p>
                                <p className="remove">
                                  <a data-item={product.item_id} data-name={product.name} style={this_ref.state.buttonStyles} onClick={this_ref.remove.bind(this_ref)}>
                                    <span>&#10005;</span> Remove
                                  </a>
                                </p>
                              </span>
                            </li>
                            <li>XXL</li>
                            <li className="quantity-block">
                              <span>
                                <a data-param="-1" data-item={product.item_id} data-quantity={product.quantity} style={this_ref.state.buttonStyles} onClick={this_ref.update.bind(this_ref)} >&#8722;</a>
                              </span>
                              <span className="number-block">
                                {product.quantity}
                              </span>
                              <span>
                                <a data-param="1" data-item={product.item_id} style={this_ref.state.buttonStyles} data-quantity={product.quantity} onClick={this_ref.update.bind(this_ref)}  >&#43;</a>
                              </span>
                            </li>
                            <li className="price">&#163;{product.price}</li>
                          </ul>
                          <div className="clearfix" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="container cart-bottom-block">
              <div className="row">
                <div className="col-md-10 offset-md-1">
                  <LinkContainer to={"/"} className="btn btn-md btn-white">
                    <a>Back to Shop</a>
                  </LinkContainer>
                  <LinkContainer style={this.state.buttonStyles} to={"/checkout"} className="btn btn-md">
                    <a>Checkout</a>
                  </LinkContainer>
                </div>
              </div>
            </div>
          </div>
        </div>:
      <div className="pt-5 mb-5">
        <div className="container">
          <div className="bg-white cart-block">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <h2>There no items in the cart.</h2>
              </div>
            </div>
          </div>
          <div className="container cart-bottom-block">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <LinkContainer to={"/"} className="btn btn-md btn-white">
                  <a>Back to Shop</a>
                </LinkContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    cart: state.get("products").cart,
    token:state.get("user").token
  };
};

const mapStateToDispatch = dispatch => ({
  updateProductQuantity: (data) => dispatch(Actions.updateProductQuantity.request(data)),
  removeFromCart:(data) => dispatch(Actions.removeFromCart.request(data)),
  getCartProducts: (data) => dispatch(Actions.getCartProducts.request(data))

});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Items);
