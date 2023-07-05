import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign }  from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import FriendDisplay from '../Components/Friend';
import Footer from '../Components/Footer';

interface User {
  username: string,
  first_name: string,
  last_name: string,
  password: string,
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

const FRIENDS:Friend[] = [
  {
    username: 'Desi',
    pfp: './assets/bucket-gorilla.jpg',
    balance: '50.25',
    lastTransaction: new Date(),
    id: '1293812032173',
  },
  {
    username: 'Desi',
    pfp: './assets/bucket-gorilla.jpg',
    balance: '0.25',
    lastTransaction: new Date(),
    id: '183743120493184',
  },
  {
    username: 'Desi',
    pfp: './assets/bucket-gorilla.jpg',
    balance: '0.00',
    lastTransaction: new Date(),
    id: '130987541087953',
  },
  {
    username: 'Desi',
    pfp: './assets/bucket-gorilla.jpg',
    balance: '-4.50',
    lastTransaction: new Date(),
    id: '1235784510232443213',
  },
  {
    username: 'Desi',
    pfp: './assets/bucket-gorilla.jpg',
    balance: '50.25',
    lastTransaction: new Date(),
    id: '1234957120348',
  },
  {
    username: 'Desi',
    pfp: './assets/bucket-gorilla.jpg',
    balance: '50.25',
    lastTransaction: new Date(),
    id: '2134972391041314243',
  },
  {
    username: 'Desi',
    pfp: './assets/bucket-gorilla.jpg',
    balance: '50.25',
    lastTransaction: new Date(),
    id: '1234781324983120',
  },
];

export default function Home() {
  const [ accHeight, setHeight ] = useState(0)
  const navigation = useNavigation()

  console.log(accHeight/5)
  return (  
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View
        style={styles.scrollContainer}
        onLayout={(event) => {
          setHeight(event.nativeEvent.layout.height)
        }}
      >
        <FlatList
          style={styles.flatContainer}
          data = {FRIENDS}
          renderItem = {({ item, index }) =>
              <FriendDisplay
                friend = { item }
                color = { (index % 2) ? '#EFEFEF' : '#F6F6F6' }
                height = { accHeight/5 }
              />
          }
        />
      </View>
      <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    padding: 0,
  },
  scrollContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    width: '100%',
    flexGrow: 1,
  },
  flatContainer: {
    flex: 1,
    width: '100%'
  },
  footer: {
    width: '100%',
    height: 92,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    paddingTop: 10,
  },
  addButton: {
    borderRadius: 40,
    width: 41,
    height: 41,
    backgroundColor: '#B0D3AA',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
