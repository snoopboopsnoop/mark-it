import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign }  from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

let degrees = '0deg';

export default function TransactionPage() {
const [isPaying, changePayer] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={styles.accContainer}>
                    <Image
                        style={styles.pfp}
                        source={require('./assets/Suzumiya_Haruhi.jpg')}
                    />
                    <View style={styles.pfp}>
                        <TouchableOpacity
                            onPress={() => {
                                changePayer(!isPaying)
                            }}
                        >
                            <Ionicons
                            name="arrow-back"
                            size={48}
                            color='#696969'
                            style={[{alignSelf: 'center', transform: [{rotate: (isPaying) ? '180deg' : '0deg' }] }]}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[{width: '33%', aspectRatio: 1, alignItems: 'center', justifyContent: 'flex-end'}]}>
                        <Image 
                            style={[{width: '100%', height: undefined, aspectRatio: 1, borderRadius: 10000}]}
                            source={require('./assets/bucket-gorilla.jpg')}
                        />
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => {
                            }}
                        >
                            <AntDesign
                            name="plus"
                            size={24}
                            color='#EFEFEF'
                            style={[{alignSelf: 'center'}]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.amtContainer}>

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
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrow: {
        height: 40,
        width: undefined,
        aspectRatio: 1,
    },
    addButton: {
        position: 'absolute',
        borderRadius: 40,
        width: 41,
        height: 41,
        backgroundColor: '#B0D3AA',
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    amtContainer: {
        
    },
    footer: {
        width: '100%',
        height: 138,
        backgroundColor: '#efefef'
    }
})