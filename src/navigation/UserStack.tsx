import { useFonts, NunitoSans_400Regular } from '@expo-google-fonts/nunito-sans';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from '../Pages/Home';
import Header from '../Components/Header';
import FriendDetail from '../Pages/FriendDetail';
import TransactionPage from '../Pages/TransactionPage';
import Login from '../Pages/Login';
import HomeScreen from './HomeScreen';
import { AccDrawer } from './AccDrawer';

const Drawer = createDrawerNavigator();

export default function UserStack() {
  return (  
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerPosition: 'right',
          swipeEnabled: false,
        }}
      >  
        <Drawer.Screen
          name="HomeStack"
          component={HomeScreen}
          options={{drawerItemStyle:{display: 'none'}}}
        />
        <Drawer.Screen name="Log Out" component={Login}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}