
import { createBottomTabNavigator,createSwitchNavigator,createStackNavigator, createAppContainer ,createDrawerNavigator,} from 'react-navigation';
import {Platform, StyleSheet, Text, View,Button, Linking, TouchableOpacity, Image, ScrollView} from 'react-native';
import HomeScreen from '../containers/Home/home';
import Categories from '../containers/Category/categories';
import AllCategories from '../containers/Category/allCategories';
import DetailsScreen from '../containers/Home/detailsScreen';
 import ProductDetails from '../containers/ProductDetails/productdetails';
import Login from '../containers/Login/login';
import NavBar from '../components/Navbar/navbar';
import Items from '../components/Items/items';
import Checkout from '../components/Checkout/checkout';
import Delivery from '../components/Checkout/delivery';
import Conformation from '../components/Checkout/conformation';
import SetPassword from '../containers/Login/passwordSet';
import SearchItem from '../components/Search/searchitem';
import drawerContentComponents from './drawerContentComponents';

export const RootStack = createDrawerNavigator(
  {

    Home: HomeScreen,
    Details: DetailsScreen,
    Categories:Categories,
    AllCategories:AllCategories,
    ProductDetails:ProductDetails,
    Navbar:NavBar,
    Items:Items,
    Login:Login,
    Checkout:Checkout,
    Delivery:Delivery,
    Conformation:Conformation,
    SetPassword:SetPassword,
    SearchItem:SearchItem
  },
  {
    initialRouteName: 'Home',
    contentComponent: drawerContentComponents
  }

);
