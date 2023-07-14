import { useFonts, NunitoSans_400Regular } from '@expo-google-fonts/nunito-sans';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../Pages/Home';
import Header from '../Components/Header';
import FriendDetail from '../Pages/FriendDetail';
import TransactionPage from '../Pages/TransactionPage';
import Settings from '../Pages/Settings';
import Friends from '../Pages/Friends';

const Stack = createNativeStackNavigator();

export default function UserStack() {

  return (  
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ Home }
          options={{
            header: (props) =>
              <Header
                home={ true }
                title={ 'Home' }
              /> 
          }}
        />
        <Stack.Screen
          name="FriendDetail"
          component={ FriendDetail }
          options={{
            header: (props) =>
              <Header
                home={ false }
                title={ 'Details' }
              />  
          }}
        />
        <Stack.Screen
          name="TransactionPage"
          component= { TransactionPage }
          options={{
            header: (props) =>
              <Header
                home={ false }
                title={ 'New Transaction' }
              /> 
          }}
        />
        <Stack.Screen
          name="Settings"
          component= { Settings }
          options={{
            header: (props) =>
              <Header
                home={ false }
                title={ 'Settings' }
              /> 
          }}
        />
        <Stack.Screen
          name="Friends"
          component= { Friends }
          options={{
            header: (props) =>
              <Header
                home={ false }
                title={ 'Add Friends' }
              /> 
          }}
        />
      </Stack.Navigator>
  );
}