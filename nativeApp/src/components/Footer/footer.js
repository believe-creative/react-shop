import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, Linking,ScrollView } from 'react-native';
import {styles} from './footer-styles';
import NavigationService from '../../routes/NavigationService.js'; 

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
		 <Text style={styles.ftitle}>WHAT'S IN STORE</Text>
		  <TouchableOpacity onPress={() => NavigationService.navigate('Categories',{itemId: 1, categoryName: "Regional"})}><Text style={styles.footerlinks}>Regional</Text></TouchableOpacity>
		  <TouchableOpacity onPress={() => NavigationService.navigate('Categories',{itemId: 2, categoryName: "Nature"})}><Text style={styles.footerlinks}>Nature</Text></TouchableOpacity>
		  <TouchableOpacity onPress={() => NavigationService.navigate('Categories',{itemId: 3, categoryName: "Seasonal"})}><Text style={styles.footerlinks}>Seasonal</Text></TouchableOpacity>
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
