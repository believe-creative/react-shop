import React, { Component } from "react";
import * as Actions from "../../actions";
import { connect } from "react-redux";
import ProductList from "../Product/productlist";
import {Text, StyleSheet, View,ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../../containers/Home/home-styles'; 
import NavBar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';
import AnimatedLoader from "react-native-animated-loader";
class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchitem: "",
      buttonClicked:false,
      finalTerm:null,
      visible:false,
      errors:null      
    };
  }
  componentDidMount() {
    this.props.getSearchItems({
      token: this.props.token,
      searchTerm: this.state.searchitem
    });
  }
  searchItems(searchInfo) {    
    this.setState({ searchitem:searchInfo});
  }
  searchSubmit(){
    if(this.state.searchitem == ""){
      this.setState({visible:false,errors:"Please enter the search term"});
    }else{
      this.props.getSearchItems({
        token: this.props.token,
        searchTerm: this.state.searchitem
      });    
      this.setState({buttonClicked:false,finalTerm:this.state.searchitem, visible:true, errors:null});
    }    
  }
  showError() {
    if (this.state["errors"]) {
      return (
        <Text style={{...styles.basefont,...styles.space,...styles.error}}>{this.state["errors"]}</Text>
      );
    } else {
      return <Text />;
    }
  }
  componentWillReceiveProps(){
    if (this.props.searchItems && this.state.finalTerm) {
      this.setState({buttonClicked:true, visible:false});
    }
  }
  SearchProducts() {    
    if(this.state.buttonClicked){
      if (this.props.searchItems && this.props.searchItems.length > 0) {      
        return (
          <View>          
              <Text style={{...styles.space, ...styles.h2, ...styles.black}}>Search Results For "{this.state.finalTerm}"</Text>          
            <View>
              {
                <ProductList
                  products={this.props.searchItems ? this.props.searchItems : []}
                />
              }
            </View>
          </View>
        );
      } else {
        return (
          <View>
              <Text style={{...styles.space, ...styles.h2, ...styles.black}}>No Search Results For "{this.state.finalTerm}"</Text>
          </View>
        );
      }
    }else{
      return(
        <View></View>
      )
    }
    
  }
  render() {
    const {visible} = this.state;
    return (
		 <View style={styles.search_main_block}>
		 	<NavBar />
			<ScrollView>       
        <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../../lottie-loader.json")}
          animationStyle={{width: 100, height: 100}}
          speed={2}
        />
		 		<View style={styles.search_main}>
					<TextInput style={styles.search_input}
						 placeholder="Search"
						 onChangeText={this.searchItems.bind(this)}                                
					  />              
					 <TouchableOpacity onPress={this.searchSubmit.bind(this)}>
						<Text style={styles.button}>Search</Text>
					 </TouchableOpacity>            
				</View>        
        <View style={styles.search_results}>
        {this.showError()}
        {this.SearchProducts()}
        </View>
				 <Footer />
			</ScrollView>
		</View> 
    );
  }
}
const mapStateToProps = state => {
  return {
    searchItems: state.get("products").searchItem,
    token: state.get("user").token
  };
};
const mapStateToDispatch = dispatch => ({
  getSearchItems: data => dispatch(Actions.getSearchItems.request(data))
});
export default connect(
  mapStateToProps,
  mapStateToDispatch,
  null,
  {pure:false}
)(SearchItem);
