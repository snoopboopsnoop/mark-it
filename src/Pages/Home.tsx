import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import { AntDesign }  from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getFriends, getFriendData } from '../../firebase.config';
import { Friend } from '../../App';
import { useAuthentication } from '../utils/hooks/useAuthentication';

import FriendDisplay from '../Components/Friend';
import Footer from '../Components/Footer';

interface User {
  username: string,
  first_name: string,
  last_name: string,
  password: string,
  pfp: string,
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
    pfp: '../assets/bucket-gorilla.jpg',
    balance: 50.25,
    lastTransaction: new Date(),
    uid: '0',
  },
  // {
  //   username: 'Desi',
  //   pfp: '../assets/bucket-gorilla.jpg',
  //   balance: '0.25',
  //   lastTransaction: new Date(),
  // },
  // {
  //   username: 'Desi',
  //   pfp: '../assets/bucket-gorilla.jpg',
  //   balance: '0.00',
  //   lastTransaction: new Date(),
  // },
  // {
  //   username: 'Desi',
  //   pfp: '../assets/bucket-gorilla.jpg',
  //   balance: '-4.50',
  //   lastTransaction: new Date(),
  // },
  // {
  //   username: 'Desi',
  //   pfp: '../assets/bucket-gorilla.jpg',
  //   balance: '50.25',
  //   lastTransaction: new Date(),
  // },
  // {
  //   username: 'Desi',
  //   pfp: '../assets/bucket-gorilla.jpg',
  //   balance: '50.25',
  //   lastTransaction: new Date(),
  // },
  // {
  //   username: 'Desi',
  //   pfp: '../assets/bucket-gorilla.jpg',
  //   balance: '50.25',
  //   lastTransaction: new Date(),
  // },
];

// async function loadFriends(friends:Friend[]) {
//   console.log(friends);
//   await getFriends(friends);
//   console.log(friends); 
//   friends.forEach((entry) => {
//     console.log("e")
//     console.log(entry);
//   })
// }

const defaultFriend:Friend[] = [
  {
    username: 'unknown',
    pfp: '../assets/bucket-gorilla.jpg',
    balance: 0,
    lastTransaction: new Date(),
    uid: '0',
  },
]

export default function Home() {
  const [ accHeight, setHeight ] = useState(0);
  const [ friends, setFriends ] = useState<Friend[]>([]);
  const [ refresh, setRefresh ] = useState(false);
  const navigation = useNavigation();

  const isFocused = navigation.isFocused();

  async function refreshFriends() {
    try {
      setFriends([]);
      const data:Friend[] = await getFriends();
      for(const entry of data) {
        const friend = await getFriendData(entry);
        console.log("friend")
        console.log(friend);
        setFriends(friends => [...friends, friend]);
      }
    }
    catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if(isFocused) {
      console.log('focused')
      refreshFriends();
    }
  }, [isFocused]);


  console.log("printing at render")
  console.log(friends)
  for (const entry of friends) {
    console.log("entry:")
    console.log(entry);
  }
  console.log("render called");

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View
          style={styles.scrollContainer}
          onLayout={(event) => {
            setHeight(event.nativeEvent.layout.height)
          }}
        >
          <FlatList
            onRefresh={ refreshFriends }
            refreshing = { refresh }
            style={styles.flatContainer} 
            data = { friends }
            // ListEmptyComponent={ emptyComponent }
            renderItem = {({ item, index }) => (
                <FriendDisplay
                  friend = { item }
                  color = { (index % 2) ? '#EFEFEF' : '#F6F6F6' }
                  height = { accHeight/5 }
                />
            )}
          />
        </View>
        <Footer/>
      </View>
    </TouchableWithoutFeedback>
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
