import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { getUserInfo, getFriendRequests } from "../../firebase.config";
import { useNavigation, useIsFocused } from '@react-navigation/native';

import Request from "../Components/Request";
import { Friend } from "../../App";
import { User } from "../../App";



export default function FriendRequests() {
    const [ accHeight, setHeight ] = useState(0);
    const [ requests, setRequests ] = useState<User[]>([]);
    const [ refresh, setRefresh ] = useState(false);

    const isFocused = useIsFocused();

    console.log("render requests")

    async function refreshRequests() {
        try {
          setRequests([]);
          let tempRequests = [];
          const data = await getFriendRequests();
          for(const entry of data) {
            const friend = await getUserInfo(entry);
            // console.log("friend")
            // console.log(friend);
            tempRequests.push(friend);
          }
          setRequests(tempRequests);
        }
        catch(error) {
          console.error(error)
        }
    }

    function compare( a:Friend, b:Friend) {
        if(a.lastTransaction < b.lastTransaction) {
          return 1;
        }
        else if (a.lastTransaction > b.lastTransaction) {
          return -1;
        }
        return 0;
    }

    useEffect(() => {
        //console.log("focus update")
        if(isFocused) {
          //console.log('focused')
          refreshRequests();
        }
    }, [isFocused]);

    return (
        <View
          style={styles.scrollContainer}
          onLayout={(event) => {
            setHeight(event.nativeEvent.layout.height)
          }}
        >
          <FlatList
            onRefresh={ refreshRequests }
            refreshing = { refresh }
            style={styles.flatContainer} 
            data = { requests }
            // ListEmptyComponent={ emptyComponent }
            renderItem = {({ item, index }) => (
                <Request
                  user = { item }
                  color = { (index % 2) ? '#EFEFEF' : '#F6F6F6' }
                  height = { accHeight/5 }
                />
            )}
          />
        </View>
    )
}

const styles = StyleSheet.create({
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
})