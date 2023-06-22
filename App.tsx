import { useFonts, NunitoSans_400Regular } from '@expo-google-fonts/nunito-sans';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import Home from './Home';
import Header from './Header';
import FriendDetail from './FriendDetail';

interface User {
  username: string,
  pfp: string,
}

export interface Friend {
  username: string,
  pfp: string,
  balance: string,
  lastTransaction: Date, 
  id: string,
}

interface Transaction {
  date: Date,
  note: string,
  amount: number,
  id: string,
}

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
      NunitoSans_400Regular,
  });

  if (!fontsLoaded) {
      return null;
  }

  return (  
    <NavigationContainer>
      <Stack.Navigator
        // screenOptions={{header: (props) => <Header/>}}
      >
        <Stack.Screen
          name="Home"
          component={ Home }
          options={{
            header: (props) => <Header/> 
          }}
        />
        <Stack.Screen
          name="FriendDetail"
          component={ FriendDetail }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}