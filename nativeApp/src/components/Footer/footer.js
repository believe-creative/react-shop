import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, Linking,ScrollView } from 'react-native';
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
      <ScrollView style={styles.footer}>
		  <Text style={styles.ftitle}>Questions?</Text>
		 <FlatList style={styles.block1}
          data={[
            {key: 'Help', url: '#'},
            {key: 'Track Order', url: '#'},
            {key: 'Returns', url: '#'},
          ]}
          renderItem={({item}) => <TouchableOpacity onPress={() => Linking.openURL(item.url)}><Text style={styles.footerlinks}>{item.key}</Text></TouchableOpacity> }
        />
		 <Text style={styles.ftitle}>WHAT'S IN STORE</Text>
		 <FlatList style={styles.block1}
          data={[
            {key: 'Women', url: '#'},
            {key: 'Men', url: '#'},
            {key: 'Product A-Z', url: '#'},
				{key: 'Buy Gift Vouchers', url: '#'},
          ]}
          renderItem={({item}) => <TouchableOpacity onPress={() => Linking.openURL(item.url)}><Text style={styles.footerlinks}>{item.key}</Text></TouchableOpacity> }
        />
		  <Text style={styles.ftitle}>Follow Us</Text>
		 <FlatList style={styles.block1}
          data={[
            {key: 'Facebook', url: '#'},
            {key: 'Twitter', url: '#'},
            {key: 'Youtube', url: '#'},
          ]}
          renderItem={({item}) => <TouchableOpacity onPress={() => Linking.openURL(item.url)}><Text style={styles.footerlinks}>{item.key}</Text></TouchableOpacity> }
        />
		 <View>
			 <Text style={styles.footertext}>Developed by</Text>
			 <TouchableOpacity onPress={() => Linking.openURL('https://www.believecreative.com/')}><Text style={styles.copyright}>Believe Creative</Text></TouchableOpacity> 
		 </View>
      </ScrollView>
    );
  }

}
