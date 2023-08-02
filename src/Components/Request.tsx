import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { Friend, Transaction } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { acceptRequest, deleteRequest } from '../../firebase.config';
import { User } from '../../App';

type RequestProps = {
    user: User,
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

export default function Request(props: RequestProps) {
    const navigation = useNavigation();

    return (
        <View
            style={{backgroundColor: (props.color == '#EFEFEF') ? '#F6F6F6' : '#EFEFEF' }}
        >
            <View style={[styles.container, {backgroundColor: props.color, height: (props.height < 70) ? 70 : props.height}]}>
                <View style={styles.accContainer}>
                    <Image 
                        style={styles.pfp}
                        source={require('../assets/bucket-gorilla.jpg')}
                    />
                    <Text style={styles.accName}>
                        {props.user.username}
                    </Text>
                </View>
                <View style={styles.moneyContainer}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => {acceptRequest(props.user.requestID)}}
                    > 
                        <Text
                            style={styles.text}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}
                        >
                            Accept
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={[styles.button, {backgroundColor: '#FF8585'}]}
                        onPress={() => {deleteRequest(props.user.requestID)}}
                    > 
                        <Text
                            style={[styles.text, ]}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}
                        >
                            Reject
                        </Text>
                    </TouchableHighlight>
                </View>
                
            </View>
        </View>
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
        paddingHorizontal: 7,
        width: 117,
        height: '100%',
        gap: 10,
    },
    button: {
        backgroundColor: '#B0D3AA',
        width: '100%',
        height: '30%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        width: 117,
        height: 14,
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 14,
        textAlign: 'center',
        color: '#696969',
    }
})