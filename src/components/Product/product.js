import React, { Component } from "react";
import * as Actions from "../../actions";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { BeatLoader} from 'react-spinners';
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { show: "", items: "" ,adding:false};
  }
  componentDidMount() {}
  componentWillReceiveProps(props){
    console.log(props,"---");
    this.setState({adding:false });
  }
  addtoCart(e) {

    let cart = localStorage.getItem("react-shop-cart");
    let props = this.props;    
    if (cart) {
      cart = JSON.parse(cart);
      props.AddToCart({
        token: props.token,
        inCartId: cart.inCartId,
        inProductId: this.props.product.product_id,
        inAttributes: null
      });
    } else {
      props.AddToCart({
        token: props.token,
        inCartId: null,
        inProductId: this.props.product.product_id,
        inAttributes: null
      });
    }

    this.setState({ show: "show",adding:true });
    setTimeout(() => {
      this.setState({
        show: ""
      });
    }, 1000);
  }

  render() {
    return (
      <div className="col-md-6 col-lg-3 item">
        <div className="hot_block">
          <LinkContainer
            to={
              "/product/" +
              this.props.product.product_id +
              "/" +
              this.props.product.name
            }
          >
            <a>
              {" "}
              <img
                src={require(`../../images/product_images/${
                  this.props.product.thumbnail
                }`)}
                alt={require(`../../images/product_images/${
                  this.props.product.thumbnail
                }`)}
              />
            </a>
          </LinkContainer>
          <LinkContainer
            to={
              "/product/" +
              this.props.product.product_id +
              "/" +
              this.props.product.name
            }
          >
            <a>
              <h3 className="black pt-3">{this.props.product.name}</h3>{" "}
            </a>
          </LinkContainer>
          <h3 className="red">
            {"$" + this.props.product.discounted_price != undefined
              ? this.props.product.discounted_price
              : this.props.product.price}
          </h3>
          <button className="btn btn-sm" onClick={this.addtoCart.bind(this)}>
            Add to cart
            {this.state.adding?<BeatLoader
              color={"#f62f5e"}
              >

            </BeatLoader>:""}

          </button>
          <span className={"add_to_cart mt-2"}>
            <h3 className={"addcart" + this.state.show ? this.state.show : ""}>
              {"Adding to cart"}
            </h3>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.get("products").cart,
    token: state.get("user").token
  };
};

function mapDispatchToProps(dispatch) {
  return {
    AddToCart: (inCartId, inProductId, inAttributes) =>
      dispatch(Actions.AddToCart.request(inCartId, inProductId, inAttributes))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
