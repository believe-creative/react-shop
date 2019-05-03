import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';

export default class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  render() {
    var data = [["C", "Java", "JavaScript", "PHP"], ["Python", "Ruby"], ["Swift", "Objective-C"]];
    return (
        <View style={{flex: 0}}>
       <Image
        style={{width: 150, height: 80}}
        source={require('../../images/proof-of-concept.png')}
      />
     </View>

    );
  }

}
