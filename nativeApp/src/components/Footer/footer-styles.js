import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#fff',
	 fontSize: 16,
	 padding: 15,
	 paddingBottom: 50,
  },
	footertext: {
		color: '#333',
		fontSize: 16,
	},
	item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
	block1: {
		marginBottom: 0,
	},
	ftitle: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#333',
		marginTop: 5,
	},
	footer_block:{
		flex:1,
		alignItems:'flex-start',
		justifyContent:'flex-start',
		flexDirection:'column',
	},
	footerlinks: {
		fontSize: 16,
		color: '#2e2e2e',
		fontWeight: '400',
		marginBottom:5,
	},
	copyright:{
		fontSize: 16,
		color: '#f62f5e',
		fontStyle: 'italic',
		paddingBottom:70,
	},
});