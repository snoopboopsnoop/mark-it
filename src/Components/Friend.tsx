import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { Friend, Transaction } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getLastTrans } from '../../firebase.config';


type FriendDisplayProps = {
    friend: Friend,
    color: string,
    height: number,
}

let defaultTransaction:Transaction = {
    amount: 0,
    date: new Date(),
    paid: '',
    debt: '',
    note: '',
    id: '0',
}

export default function FriendDisplay(props: FriendDisplayProps) {
    const navigation = useNavigation();
    const [ lastTransaction, setLastTransaction ] = useState<Transaction>(defaultTransaction);

    useEffect(() => {
        async function getLast() {
            try{
                const data:Transaction = await getLastTrans(props.friend.uid);
                console.log("get last data => ", data)
                setLastTransaction(data);
            }
            catch(error) {
                console.error(error)
            }
        }
        getLast();
    }, [])

    return (
        <TouchableHighlight
            style={{backgroundColor: (props.color == '#EFEFEF') ? '#F6F6F6' : '#EFEFEF' }}
            onPress={ () =>
                navigation.navigate('FriendDetail', { friendData: props.friend, title: props.friend.username })
            }
        >
            <View style={[styles.container, {backgroundColor: props.color, height: (props.height < 70) ? 70 : props.height}]}>
                <View style={styles.accContainer}>
                    <Image 
                        style={styles.pfp}
                        source={require('../assets/bucket-gorilla.jpg')}
                    />
                    <Text style={styles.accName}>
                        {props.friend.username}
                    </Text>
                </View>
                <View style={styles.moneyContainer}>
                    <Text style={[
                            styles.balanceText,
                            {color: (props.friend.balance == 0) ? '#9F9F9F' : (props.friend.balance > 0) ? '#28BC1B' : '#EE3B3B'}
                            ]}>
                        {props.friend.balance < 0 ? '-' : ''}${Math.abs(props.friend.balance).toFixed(2)}
                    </Text>
                    <Text style={styles.lastTransText}>
                        Last transaction:{' '}
                        {lastTransaction.date.getMonth()+1}/{lastTransaction.date.getDate()}/{lastTransaction.date.getFullYear()%100}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles =  StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 55,
        paddingVertical: 13,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pfp: {
        borderRadius: 10000,
        height: '100%',
        aspectRatio: 1,
    
    },
    accContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 7,
        gap: 4,
    },
    accName: {
        width: 77,
        height: 16,
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 12,
        textAlign: 'center',
        color: '#696969'
    },
    moneyContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 7,
        width: 117,
        height: '100%',
    },
    balanceText: {
        width: 117,
        height: 49,
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 36,
        textAlign: 'center',
        padding: 0,
        lineHeight: 49,
    },
    lastTransText: {
        width: 117,
        height: 14,
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 10,
        textAlign: 'center',
        color: '#696969',
    }
})