import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


export default class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>@ Belivie Creative</Text>
      </View>
    );
  }

}
