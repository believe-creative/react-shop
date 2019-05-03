import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, Linking } from 'react-native';
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
		  <Text style={styles.ftitle}>Questions?</Text>		 
		 <FlatList style={styles.block1}
          data={[
            {key: 'Help', url: 'http://google.com'},
            {key: 'Track Order', url: 'http://yahoo.com'},
            {key: 'Returns', url: 'http://facebook.com'},
          ]}
          renderItem={({item}) => <TouchableOpacity onPress={() => Linking.openURL(item.url)}><Text style={styles.footerlinks}>{item.key}</Text></TouchableOpacity> }
        />
		 <Text style={styles.ftitle}>WHAT'S IN STORE</Text>
		 <FlatList style={styles.block1}
          data={[
            {key: 'Women', url: 'http://google.com'},
            {key: 'Men', url: 'http://yahoo.com'},
            {key: 'Product A-Z', url: 'http://facebook.com'},
				{key: 'Buy Gift Vouchers', url: 'http://google.com'},
          ]}
          renderItem={({item}) => <TouchableOpacity onPress={() => Linking.openURL(item.url)}><Text style={styles.footerlinks}>{item.key}</Text></TouchableOpacity> }
        />
		  <Text style={styles.ftitle}>Follow Us</Text>
		 <FlatList style={styles.block1}
          data={[
            {key: 'Facebook', url: 'http://google.com'},
            {key: 'Twitter', url: 'http://yahoo.com'},
            {key: 'Youtube', url: 'http://facebook.com'},
          ]}
          renderItem={({item}) => <TouchableOpacity onPress={() => Linking.openURL(item.url)}><Text style={styles.footerlinks}>{item.key}</Text></TouchableOpacity> }
        />
		 <TouchableOpacity onPress={() => Linking.openURL('https://www.believecreative.com/')}><Text style={styles.footertext}>Developed by Believe Creative</Text></TouchableOpacity>
      </View>
    );
  }

}

