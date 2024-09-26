import { NavigationActions,DrawerActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {

  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
  this.closeDrawer();
}
function openDrawer() {
  _navigator.dispatch(DrawerActions.openDrawer());
}
function closeDrawer() {
  _navigator.dispatch(DrawerActions.closeDrawer());
}
// add other navigation functions that you need and export them

export default {
  navigate,
  openDrawer,
  closeDrawer,
  setTopLevelNavigator,
};
