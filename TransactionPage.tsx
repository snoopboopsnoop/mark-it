import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign }  from '@expo/vector-icons';
import { useState } from 'react';

export default function TransactionPage() {
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={styles.accContainer}>
                    <Image
                        style={styles.pfp}
                        source={require('./assets/Suzumiya_Haruhi.jpg')}
                    />
                    <View style={styles.pfp}/>
                    <View style={[{width: '33%', aspectRatio: 1, backgroundColor: 'grey', alignItems: 'center'}]}>
                        <Image 
                            style={[{width: '100%', height: undefined, aspectRatio: 1, borderRadius: 10000}]}
                            source={require('./assets/bucket-gorilla.jpg')}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.footer}>

            </View>
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
    mainContainer: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: '#F6F6F6',
        paddingVertical: 28,
        paddingHorizontal: 26,
    },
    accContainer: {
        width: '100%',
        height: 124,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pfp: {
        borderRadius: 10000,
        width: '33%',
        aspectRatio: 1,
    },
    footer: {
        width: '100%',
        height: 138,
        backgroundColor: '#efefef'
    }
})