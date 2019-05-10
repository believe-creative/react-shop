
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../containers/Home/home';
import Categories from '../containers/Category/categories';
import DetailsScreen from '../containers/Home/detailsScreen';
import Login from '../containers/Login/login';
import NavBar from '../components/Navbar/navbar';
import Items from '../components/Items/items';
import Checkout from '../components/Checkout/checkout';
import Delivery from '../components/Checkout/delivery';
import Conformation from '../components/Checkout/conformation';

export const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Categories:Categories,
    Navbar:NavBar,
    Items:Items,
    Login:Login,
    Checkout:Checkout,
    Delivery:Delivery,
    Conformation:Conformation
  },
  {
    initialRouteName: 'Home',

  }
);
