import 'react-native-gesture-handler';
import { useFonts, NunitoSans_400Regular } from '@expo-google-fonts/nunito-sans';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RootNavigation from './src/navigation/Index';

export interface User {
  username: string,
  pfp: string,
  requestID: string,
}

export interface Friend {
  username: string,
  pfp: string,
  balance: number,
  lastTransaction: Date,
  uid: string,
}

export interface Transaction {
  amount: Number,
  date: Date,
  debt: string,
  note: string,
  paid: string,
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