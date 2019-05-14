import React, { Component } from "react";
import * as Actions from "../../actions";
import { connect } from "react-redux";
import ProductList from "../Product/productlist";
import {Text, View,ScrollView, TextInput, TouchableOpacity} from 'react-native';


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
        <ScrollView>          
            <Text>Search Results For "{this.state.searchitem}"</Text>          
          <View>
            {
              <ProductList
                products={this.props.searchItems ? this.props.searchItems : []}
              />
            }
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View>
            <Text>No Search Results For "{this.state.searchitem}"</Text>
        </View>
      );
    }
  }
  render() {
    return (
      <ScrollView>               
            <TextInput
                placeholder="Search"
                onChangeText={this.searchItems.bind(this)}                                
              />              
              <TouchableOpacity onPress={this.searchSubmit.bind(this)}>
                <Text>Search</Text>
              </TouchableOpacity>                       
          {this.SearchProducts()} 
      </ScrollView>
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
