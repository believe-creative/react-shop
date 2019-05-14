import React, { Component } from "react";
import * as Actions from "../../actions";
import { connect } from "react-redux";
import ProductList from "../Product/productlist";
import {Text, StyleSheet, View,ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../../containers/Home/home-styles'; 
import NavBar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';
class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchitem: ""      
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
    this.props.getSearchItems({
      token: this.props.token,
      searchTerm: this.state.searchitem
    });
  }
  SearchProducts() {
    if (this.props.searchItems && this.props.searchItems.length > 0) {      
      return (
        <View>          
            <Text style={{...styles.space, ...styles.h2, ...styles.black}}>Search Results For "{this.state.searchitem}"</Text>          
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
            <Text style={{...styles.space, ...styles.h2, ...styles.black}}>No Search Results For "{this.state.searchitem}"</Text>
        </View>
      );
    }
  }
  render() {
    return (
		 <View style={styles.search_main_block}>
		 	<NavBar />
			<ScrollView>
		 		<View style={styles.search_main}>
					<TextInput style={styles.search_input}
						 placeholder="Search"
						 onChangeText={this.searchItems.bind(this)}                                
					  />              
					 <TouchableOpacity onPress={this.searchSubmit.bind(this)}>
						<Text style={styles.button}>Search</Text>
					 </TouchableOpacity>  
				</View>
				<View style={styles.search_results}>{this.SearchProducts()}</View>
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
