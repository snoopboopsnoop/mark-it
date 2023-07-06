import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign }  from '@expo/vector-icons';
import { useState } from 'react';
import { Transaction } from '../../App';

import TransactionItem from '../Components/TransactionItem';
import Footer from '../Components/Footer';


const TRANSACTIONS:Transaction[] = [
    {
        date: new Date(),
        note: "bobr",
        amount: '-5.90',
        id: '213812372193812',
    },
    {
        date: new Date(),
        note: "adfjhafadjlkfjadlkfjalknfelakfjhdalkfjalkejfalkedj",
        amount: '14.50',
        id: '14312431241324',
    },
    {
        date: new Date(),
        note: "bobr",
        amount: '-7.80',
        id: '1345134643163',
    },
    {
        date: new Date(),
        note: "bobr",
        amount: '40.00',
        id: '21341255363156',
    },
    {
        date: new Date(),
        note: "bobr",
        amount: '-5.90',
        id: '1234314614351252',
    },
    {
        date: new Date(),
        note: "bobr",
        amount: '-5.90',
        id: '2345642572562456',
    },
    {
        date: new Date(),
        note: "bobr",
        amount: '-5.90',
        id: '1355427652472',
    },
    {
        date: new Date(),
        note: "bobr",
        amount: '-5.90',
        id: '1324534575246746',
    },
    {
        date: new Date(),
        note: "bobr",
        amount: '-5.90',
        id: '13454257562372',
    },
]

export default function FriendDetail() {
    const [ accHeight, setHeight ] = useState(0)

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
                        <Text style={styles.accName}>
                            Desi
                        </Text>
                    </View>
                    <View style={styles.moneyContainer}>
                        <Text style={[
                                styles.balanceText,
                                //{color: (Number(props.friend.balance) == 0) ? '#9F9F9F' : (Number(props.friend.balance) > 0) ? '#28BC1B' : '#EE3B3B'}
                                ]}>
                            $50.25
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
                    <Text style={styles.text}>Transaction History:</Text>
                </View>
                <View style={[styles.transactionHeader, {backgroundColor: '#F6F6F6'}]}>
                    <Text style={[styles.text, {textDecorationLine: 'underline', width: '30%'}]}>
                        Date
                    </Text>
                    <Text style={[styles.text, {textDecorationLine: 'underline', width: '50%'}]}>
                        Note
                    </Text>
                    <Text style={[styles.text, {textDecorationLine: 'underline', width: '20%'}]}>
                        Amount
                    </Text>
                </View>
                <FlatList
                    style={styles.flatContainer}
                    data = {TRANSACTIONS}
                    renderItem = {({ item, index }) =>
                        <TransactionItem
                            data = { item }
                            color = { (index % 2) ? '#F6F6F6' : '#EFEFEF' }
                            height = { accHeight/5 }
                        />
                    }
                />
            </View>
            <Footer/>
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
        width: 77,
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 36,
        textAlign: 'center',
        color: '#696969'
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