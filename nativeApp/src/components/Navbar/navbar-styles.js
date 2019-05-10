import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header:{
	  backgroundColor: '#fff',
	  borderBottomWidth: 1,
	  borderBottomColor: '#b4b4b4',
	  marginBottom:0,
	  overflow:'hidden',
	  paddingBottom:0,
  },
  headtop:{
	  flex:0,
	  flexDirection: 'row',
	  justifyContent:'flex-end',
	  paddingLeft:15,
	  paddingRight:15,
	  paddingTop:5,
	  paddingBottom:0,
  },
  logo:{
	  flex:1,
	  flexDirection:'row',
	  justifyContent:'flex-start',
  },
});