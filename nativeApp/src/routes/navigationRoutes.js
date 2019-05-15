
import { createStackNavigator, createAppContainer } from 'react-navigation';
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

export const RootStack = createStackNavigator(
  {
    
    Home: { screen: HomeScreen, navigationOptions: { header: null } },
    Details: { screen: DetailsScreen, navigationOptions: { header: null } },
    Categories:{ screen: Categories, navigationOptions: { header: null } },
    AllCategories:{ screen: AllCategories, navigationOptions: { header: null } },
    ProductDetails:{ screen: ProductDetails, navigationOptions: { header: null } },
    Navbar:{ screen: NavBar, navigationOptions: { header: null } },
    Items:{ screen: Items, navigationOptions: { header: null } },
    Login:{ screen: Login, navigationOptions: { header: null } },
    Checkout:{ screen: Checkout, navigationOptions: { header: null } },
    Delivery:{ screen: Delivery, navigationOptions: { header: null } },
    Conformation:{ screen: Conformation, navigationOptions: { header: null } },
    SetPassword:{ screen: SetPassword, navigationOptions: { header: null } },
    SearchItem:{ screen: SearchItem, navigationOptions: { header: null } }
  },
  {
    initialRouteName: 'Home',

  }
 
);
