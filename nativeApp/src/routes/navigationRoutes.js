
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../containers/Home/home';
import Categories from '../containers/Category/categories';
import allCategories from '../containers/Category/allCategories';
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

export const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Categories:Categories,
    allCategories:allCategories,
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

  }
);
