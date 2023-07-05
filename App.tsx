import { useFonts, NunitoSans_400Regular } from '@expo-google-fonts/nunito-sans';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/Pages/Home';
import Header from './src/Components/Header';
import FriendDetail from './src/Pages/FriendDetail';
import TransactionPage from './src/Pages/TransactionPage';
import Login from './src/Pages/Login';

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

export interface Transaction {
  date: Date,
  note: string,
  amount: string,
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
          name="Login"
          component={ Login }
          options={{
            headerShown: false 
          }}
        />
        <Stack.Screen
          name="Home"
          component={ Home }
          options={{
            header: (props) =>
              <Header
                home={ true }
                title={ 'Home'}
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
                title={ 'Details'}
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
                title={ 'New Transaction'}
              /> 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}