import 'react-native-gesture-handler';
import { useFonts, NunitoSans_400Regular } from '@expo-google-fonts/nunito-sans';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import RootNavigation from './src/navigation/Index';

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
    <RootNavigation/>
  );
}