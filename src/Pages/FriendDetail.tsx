import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign }  from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Transaction } from '../../App';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { getTransactions, getFriendData } from '../../firebase.config';
import { Friend } from '../../App';

import TransactionItem from '../Components/TransactionItem';
import Footer from '../Components/Footer';
import Header from '../Components/Header';


type friendProps = {
    friend: Friend,
}

const TRANSACTIONS:Transaction[] = [
    
]

export default function FriendDetail( { navigation, route }, props: friendProps) {
    const [ accHeight, setHeight ] = useState(0)
    const [ transactions, setTransactions ] = useState<Transaction[]>([]);
    const [ refresh, setRefresh ] = useState(false);
    const [ friendData ] = useState(route.params?.friendData);
    console.log("friendData")
    console.log(friendData);
    console.log("frienddata username");
    console.log(friendData.username);
    const [ friend, setFriend ] = useState<Friend>();

    const isFocused = useIsFocused();

    // navigation.setOptions({
    //     header: (props) => {
    //         <Header
    //             home={ false }
    //             title={ friendData.username }
    //         />
    //     }
    // })

    async function refreshTransactions() {
        console.log("refresh transactions")
        const data:Transaction[] = await getTransactions(friendData.uid);
        console.log('data')
        console.log(data);
        setTransactions(data);
        console.log('transactions')
        console.log(transactions)
    }

    // useEffect(() => {
    //     refreshTransactions();
    // }, [])

    useEffect(() => {
        if(isFocused) {
            refreshTransactions();
        }
    }, [isFocused])

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <TouchableOpacity
                    style={styles.ellipsis}
                >
                    <AntDesign name="ellipsis1" size={30} color="#696969"/>
                </TouchableOpacity>
                <View style={styles.innerContainer}>
                    <View style={styles.accContainer}>
                        <Image 
                            style={styles.pfp}
                            source={require('../assets/bucket-gorilla.jpg')}
                        />
                        <Text
                            style={[styles.accName, { fontSize: undefined }]}
                            adjustsFontSizeToFit={true}
                            numberOfLines= { 1 }
                        >
                            {friendData.username}
                        </Text>
                    </View>
                    <View style={styles.moneyContainer}>
                        <Text
                            style={[
                                styles.balanceText,
                                {color: (friendData.balance == 0) ? '#9F9F9F' : (friendData.balance > 0) ? '#28BC1B' : '#EE3B3B'}
                                ]}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1} 
                        >
                            ${friendData.balance}
                        </Text>
                        <Text style={styles.lastTransText}>
                            Last transaction: 6/11/23
                        </Text>
                    </View>
                </View>
            </View>
            <View
                style={styles.scrollContainer}
                onLayout={(event) => {
                setHeight(event.nativeEvent.layout.height)
                }}
            >
                <View style={styles.transactionHeader}>
                    <Text style={styles.text}>Transaction History (last 5):</Text>
                </View>
                <View style={[styles.transactionHeader, {backgroundColor: '#F6F6F6'}]}>
                    <Text style={[styles.text, {textDecorationLine: 'underline', width: '30%'}]}>
                        Date
                    </Text>
                    <Text style={[styles.text, {textDecorationLine: 'underline', width: '45%'}]}>
                        Note
                    </Text>
                    <Text style={[styles.text, {textDecorationLine: 'underline', width: '25%'}]}>
                        Amount
                    </Text>
                </View>
                <FlatList
                    onRefresh={ refreshTransactions }
                    refreshing = { refresh }
                    style={styles.flatContainer}
                    data = { transactions }
                    renderItem = {({ item, index }) =>
                        <TransactionItem
                            data = { item }
                            color = { (index % 2) ? '#F6F6F6' : '#EFEFEF' }
                            height = { accHeight/5 }
                        />
                    }
                />
            </View>
            <Footer {...friendData}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1,
        padding: 0,
    },
    infoContainer: {
        width: '100%',
        height: 257,
        backgroundColor: '#F6F6F6',
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingHorizontal: 26,
        paddingVertical: 20,
    },
    ellipsis: {
        height: 32,
    },
    innerContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    accContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingRight: 16,
        width: '50%',
        height: '100%',
    },
    pfp: {
        borderRadius: 10000,
        height: 143,
        width: undefined,
        aspectRatio: 1,
    },
    accName: {
        width: '100%',
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 36,
        textAlign: 'center',
        color: '#696969',
        padding: 10,
    },
    moneyContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 7,
        width: '50%',
        height: '100%',
    },
    balanceText: {
        width: '100%',
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 48,
        textAlign: 'center',
        padding: 0,
        color: '#28BC1B',
    },
    lastTransText: {
        width: 117,
        height: 14,
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 10,
        textAlign: 'center',
        color: '#696969',
    },
    scrollContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 0,
        width: '100%',
        flexGrow: 1,
      },
      transactionHeader: {
        width: '100%',
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 25,
        backgroundColor: '#EFEFEF',
      },
      flatContainer: {
        flex: 1,
        width: '100%'
      },
      text: {
        width: '100%',
        height: 19,
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 14,
        textAlign: 'left',
        color: '#696969'
      },
})