import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign }  from '@expo/vector-icons';
import { useState } from 'react';
import { Transaction } from './App';

type transactionsProps = {
    data: Transaction
    color: string,
    height: number,
}

export default function TransactionItem(props: transactionsProps) {
    return (
        <View>
            <View style={[styles.transactionView, {backgroundColor: props.color, height: props.height}]}>
                <Text style={[styles.text, {width: '30%'}]}>
                    {props.data.date.getMonth()+1}/{props.data.date.getDate()}/{props.data.date.getFullYear()%100}
                </Text>
                <Text style={[styles.text, {width: '50%', paddingRight: 45}]}>
                    {props.data.note}
                </Text>
                <Text style={[styles.text, {width: '20%', color: (Number(props.data.amount) == 0) ? '#9F9F9F' : (Number(props.data.amount) > 0) ? '#28BC1B' : '#EE3B3B'}]}>
                    {(Number(props.data.amount) < 0) ? '-' : '+'}
                    $
                    {(Number(props.data.amount) < 0) ? props.data.amount.slice(1) : props.data.amount}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    transactionView: {
        width: '100%',
        height: 74,
        paddingHorizontal: 29,
        paddingVertical: 26,
        flexDirection: 'row',
    },
    text: {
        width: 77,
        height: '100%',
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 16,
        textAlign: 'left',
        color: '#696969'
    }
})