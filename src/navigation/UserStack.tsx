import { useFonts, NunitoSans_400Regular } from '@expo-google-fonts/nunito-sans';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from './HomeScreen';
import LogoutButton from '../Components/LogoutButton';

const Drawer = createDrawerNavigator();

export default function UserStack() {
  return (  
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerPosition: 'right',
          swipeEnabled: false,
          drawerStyle: styles.container,
        }}
        drawerContent={(props) => <LogoutButton/>}
      >  
        <Drawer.Screen
          name="HomeStack"
          component={HomeScreen}
          options={{drawerItemStyle:{display: 'none'}}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',

  }
})