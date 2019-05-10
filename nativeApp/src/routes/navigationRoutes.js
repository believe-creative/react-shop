
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../containers/Home/home';
import Categories from '../containers/Category/categories';
import DetailsScreen from '../containers/Home/detailsScreen';
import Login from '../containers/Login/login';
import NavBar from '../components/Navbar/navbar';
import Items from '../components/Items/items';

export const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Categories:Categories,
    Navbar:NavBar,
    Items:Items,
    Login:Login
  },
  {
    initialRouteName: 'Home',

  }
);
