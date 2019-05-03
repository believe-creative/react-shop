import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {styles} from './footer-styles'; 

export default class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  render() {

    return (
      <View style={styles.footer}>
        <Text style={styles.footertext}>@ Belivie Creative</Text>
      </View>
    );
  }

}

