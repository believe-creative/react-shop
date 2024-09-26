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
	  paddingTop:15,
	  paddingBottom:10,
  },
  logo:{
	  flex:1,
	  flexDirection:'row',
	  justifyContent:'center',
	  alignItems:'center',
  },
	menu_block:{
		paddingTop:0,
	},
  menu_item_block:{
    	paddingTop:0,
      paddingBottom:0,
  },
	menu_list:{
		fontSize: 18,
		color:'#2e2e2e',
		fontWeight:'700',
		paddingTop:10,
		paddingBottom:10,
		paddingLeft:15,
		paddingRight:15,
	},   
    screenTextStyle:{
       fontSize: 18,
		 paddingTop:10,
		 paddingBottom:10,
		 color: '#000',
		 fontWeight:'600',
    },
	screenStyle:{
		borderBottomColor: '#b4b4b4',
		borderBottomWidth:1,
		flex:0,
		alignItems:'flex-start',
	},
});
