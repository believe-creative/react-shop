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
		 <View style={styles.footer_block}>
		 	<TouchableOpacity onPress={() => {if(this.props.stage){ this.props.stage(0);} NavigationService.navigate('Categories',{itemId: 1, categoryName: "Regional"})}}><Text style={styles.footerlinks}>Regional</Text></TouchableOpacity>
		   <TouchableOpacity onPress={() => {if(this.props.stage){ this.props.stage(0);}NavigationService.navigate('Categories',{itemId: 2, categoryName: "Nature"})}}><Text style={styles.footerlinks}>Nature</Text></TouchableOpacity>
		   <TouchableOpacity onPress={() => {if(this.props.stage){ this.props.stage(0);}NavigationService.navigate('Categories',{itemId: 3, categoryName: "Seasonal"})}}><Text style={styles.footerlinks}>Seasonal</Text></TouchableOpacity>
		 </View>
		  <Text style={styles.ftitle}>Follow Us</Text> 
		 <FlatList style={styles.block1}
          data={[
            {key: 'Facebook', url: 'https://www.facebook.com/believecreative.global'},
            {key: 'Twitter', url: 'https://twitter.com/believecreative'},
            {key: 'Youtube', url: 'https://www.believecreative.com/wp-content/themes/cluster-child/video/HTML5%20games.mp4'},
          ]}
          renderItem={({item}) => <View style={styles.footer_block}><TouchableOpacity onPress={() => Linking.openURL(item.url)}><Text style={styles.footerlinks}>{item.key}</Text></TouchableOpacity></View> }
        />
		 <View>
			 <Text style={styles.ftitle}>Developed by</Text>
			 <View style={styles.footer_block}><TouchableOpacity onPress={() => Linking.openURL('https://www.believecreative.com/')}><Text style={styles.copyright}>Believe Creative</Text></TouchableOpacity></View> 
		 </View>
      </ScrollView>
    );
  }

}
