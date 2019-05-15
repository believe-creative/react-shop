import React, { Component } from "react";
import {Platform, StyleSheet, Text, View,Button, Linking, TouchableOpacity, Image, ScrollView} from 'react-native';
import { connect } from "react-redux";
import * as Actions from "../../actions";
import Carousel from "react-native-carousel";
import Footer from '../../components/Footer/footer';
import NavBar from '../../components/Navbar/navbar';
import {styles} from '../Home/home-styles';
import {SERVER_ROOT} from '../../services/constants';
import SyncStorage from 'sync-storage';
const handleOnDragStart = e => e.preventDefault();
import AnimatedLoader from "react-native-animated-loader";

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: "",
      buttonStyles: { cursor: "pointer" },
      cart: null,
      productImageName: "",
      activeClass: "active",
      adding: false,
      link: null
    };
     this.productid = props.navigation.getParam('productid');

  }

  addtoCart(e) {
    let cart = SyncStorage.get("react-shop-cart");
    let props = this.props;
    if (cart) {
      cart = cart;
      props.AddToCart({
        token: props.token,
        inCartId: cart.inCartId,
        inProductId: this.props.productdetails[0].product_id,
        inAttributes: null
      });
    } else {      
      props.AddToCart({
        token: props.token,
        inCartId: null,
        inProductId: this.props.productdetails[0].product_id,
        inAttributes: null
      });
    }

    this.setState({ show: "show", adding: true });
    setTimeout(() => {
      this.setState({
        show: ""
      });
    }, 1000);
  }
  componentDidMount() {    
    this.props.loadProduct({
      token: this.props.token,
      inProductId: this.productid
    });
    this.props.getProductRecommendations({
      token: this.props.token,
      inProductId: this.productid
    });
    this.props.getProductLocations({
      token: this.props.token,
      inProductId: this.productid
    });
    this.props.setSubCategory(false);
    this.setState({ link: this.productid});
  }

  componentWillReceiveProps(props) {    
    let localCart = SyncStorage.get("react-shop-cart");
    if (localCart != null) {
      if (this.state.cart === null || this.state.cart === undefined) {
        this.props.getCartProducts({
          token: props.token,
          inCartId: localCart.inCartId
        });
      } else if (props.cart.count !== this.state.cart.count) {
        this.props.getCartProducts({
          token: props.token,
          inCartId: props.cart.inCartId
        });
      }

      this.setState({ cart: props.cart, adding: false});
    }

    if (this.state.link !== this.productid) {      
      props.loadProduct({
        token: props.token,
        inProductId: this.productid
      });
      props.getProductRecommendations({
        token: props.token,
        inProductId: this.productid
      });
      props.getProductLocations({
        token: props.token,
        inProductId: this.productid
      });
      this.setState({ link: this.productid });
    }
  }

  update(e) {
    let state = this.state;
    state["buttonStyles"] = { pointerEvents: "none" };
    this.setState(state);
    let count = parseInt(e.currentTarget.getAttribute("data-quantity"));
    let param = parseInt(e.currentTarget.getAttribute("data-param"));
    count = count + param;
    if (count < 0) {
      let state = this.state;
      state["buttonStyles"] = { pointerEvents: "auto", cursor: "pointer" };
      this.setState(state);
    } else {
      this.props.updateProductQuantity({
        token: this.props.token,
        inItemId: e.currentTarget.getAttribute("data-item"),
        inQuantity: count
      });
    }
  }
  handleClick(name) {
    this.setState({ productImageName: name, activeClass: "" });
  }

  productPrice() {
    let discountedPrice = this.props.productdetails[0]
      ? this.props.productdetails[0].discounted_price
      : "";
    if (discountedPrice !== "0.00") {
      return (
        <View>
          <Text style={{...styles.price, ...styles.red}}>

             <Text style={{...styles.black, ...styles.price_text}}>Price: </Text>
            <Text style={styles.price_stripe}>{this.props.productdetails[0]
              ? "$" + this.props.productdetails[0].price
              : ""}</Text>
                </Text>
          <Text style={{...styles.price, ...styles.red}}>
            <Text style={{...styles.black, ...styles.price_text}}>Discounted Price: </Text>
            {this.props.productdetails[0]
              ? "$" + this.props.productdetails[0].discounted_price
              : ""}

            </Text>
            </View>
      );
    } else {
      return (
        <View>
         <Text style={{...styles.price, ...styles.red}}>
        Price:
          {this.props.productdetails[0]
            ? "$" + this.props.productdetails[0].price
            : ""}
          </Text>
          </View>
      );
    }
  }
  render() {
    let visible=true;
    let productImg1 = this.props.productdetails[0]
      ? this.props.productdetails[0].image
      : "";
    let productImg2 = this.props.productdetails[0]
      ? this.props.productdetails[0].image_2
      : "";
    let productId = this.props.productdetails[0]
      ? this.props.productdetails[0].product_id.toString()
      : "";
    let productlocations = this.props.productlocations[0]
      ? this.props.productlocations[0].department_name.toLowerCase()
      : "";

    if(this.props.productdetails[0])
    {
      visible=false;
    }
    // console.log(this.props.productdetails[0]);
    let cart = { count: 0, products: [] };
    if (this.props.cart) cart = this.props.cart;
    let hasItems = cart.count > 0 ? true : false;
    let this_ref = this;
    let items = "";
    if (this.props.productrecommendations.length > 0) {
      items = this.props.productrecommendations.map((item, index) => {
        return (
          <View
            key={index}
            onDragStart={handleOnDragStart}
          >
                  <Text>{item.product_name}</Text>
                  <Text>{item.description}</Text>
                  <Text>&#163;14.99</Text>
            </View>
        );
      });
    }


      return (
        <View>
        <NavBar/>
        <ScrollView style={styles.home}>
        <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../../lottie-loader.json")}
          animationStyle={{width: 100, height: 100}}
          speed={2}
        />
          <View style={styles.shop_now_panel}>
                  <View>
                      <Text style={{...styles.h2, ...styles.black}}>
                        {this.props.productdetails[0]
                          ? this.props.productdetails[0].name
                          : ""}
                      </Text>
                      <Text style={styles.productdesc}>
                        {this.props.productdetails[0]
                          ? this.props.productdetails[0].description
                          : ""}
                      </Text>
                  </View>
                  {this.productPrice()}
                  <View style={styles.space_top}>
                    <Image style={{width: null, height: 320, marginBottom: 0}}
                    source={{uri: SERVER_ROOT + "images/product_images/" +`${
                      this.state.productImageName
                        ? this.state.productImageName
                        : this.props.productdetails[0]
                          ? this.props.productdetails[0].image
                          : "a-partridge-in-a-pear-tree-2.gif"
                    }`}}
                        />
                    </View>

							<View style={styles.thumb_block_main}>

									<Image onPress={() => { this.handleClick(this.props.productdetails[0]? this.props.productdetails[0].image: "a-partridge-in-a-pear-tree-2.gif");}} 
									style={{width: 60, height: 60, }} 
									source={{uri: SERVER_ROOT + "images/product_images/" +`${
										  this.props.productdetails[0]
											 ? this.props.productdetails[0].image
											 : "a-partridge-in-a-pear-tree-2.gif"
										}`}}
								 />

									<Image onPress={() => { this.handleClick( this.props.productdetails[0]? this.props.productdetails[0].image_2: "a-partridge-in-a-pear-tree-2.gif");}} 
										style={{width: 60, height: 60, marginLeft:15,}}
										source={{uri: SERVER_ROOT + "images/product_images/" +`${
											  this.props.productdetails[0]
												 ? this.props.productdetails[0].image_2
												 : "a-partridge-in-a-pear-tree-2.gif"
											}`}}
									 />

						 	</View>

                      <View style={{...styles.center_position, ...styles.space_top}}>
							 	<TouchableOpacity onPress={this.addtoCart.bind(this)}><Text style={styles.button}>Add to cart</Text></TouchableOpacity>
							 </View>
                    
                  </View>
              <Footer/>
          </ScrollView>
        </View>
      );

  }
}
const mapStateToProps = state => {
  return {
    cart: state.get("products").cart,
    productdetails: state.get("products").product,
    productrecommendations: state.get("products").productrecommendations,
    productlocations: state.get("products").productLocations,
    token: state.get("user").token,
    showSubCategory: state.get("showSubCategory").showSubCategory
  };
};

const mapStateToDispatch = dispatch => ({
  setSubCategory: data => dispatch(Actions.setSubCategory(data)),
  loadProduct: data => dispatch(Actions.product.request(data)),
  AddToCart: (inCartId, inProductId, inAttributes) =>
    dispatch(Actions.AddToCart.request(inCartId, inProductId, inAttributes)),
  updateProductQuantity: data =>
    dispatch(Actions.updateProductQuantity.request(data)),
  getCartProducts: data => dispatch(Actions.getCartProducts.request(data)),
  getProductRecommendations: data =>
    dispatch(Actions.getProductRecommendations.request(data)),
  getProductLocations: data => dispatch(Actions.productLocations.request(data))
});

export default connect(
  mapStateToProps,
  mapStateToDispatch,
  null,
  {pure:false}
)(ProductDetails);
