import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { AntDesign }  from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FakeCurrencyInput } from 'react-native-currency-input';
import { useRoute } from '@react-navigation/native';
import { sendTransaction, getFriendData } from '../../firebase.config';

export default function TransactionPage({ route }) {
    const [isPaying, changePayer] = useState(true);
    const friend = route.params?.friendData;
    console.log("frined => ", friend)

    const [value, setValue] = useState({
        friend: friend,
        amount: 0,
        note: '',
        error: '',
    });

    const navigation = useNavigation();

    async function transact() {
        if(value.amount == 0) {
            setValue({
                ...value,
                error: "can't send a $0 transaction dumbass"
            })
            return;
        }
        console.log('sending transaction')
        await sendTransaction(value);
        navigation.goBack();
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <View style={styles.accContainer}>
                        <Image
                            style={styles.pfp}
                            source={require('../assets/Suzumiya_Haruhi.jpg')}
                        />
                        <View style={styles.pfp}>
                            <TouchableOpacity
                                onPress={() => {
                                    setValue({ ...value, amount: -value.amount})
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
                                source={require('../assets/bucket-gorilla.jpg')}
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
                        <Text style={styles.text}>Amount:</Text>
                        <FakeCurrencyInput
                            keyboardType='number-pad'
                            style={[styles.text, {fontSize: 69, color: (isPaying) ? '#28BC1B' : '#EE3B3B' }]}
                            onChangeValue={(amount) => setValue({ ...value, amount: (((amount > 0 && !isPaying)) ? -amount : amount) || 0})}
                            maxValue={1000}
                            minValue={-1000}
                            prefix={"$"}
                            separator='.'
                            delimiter=','
                            value={ value.amount }
                            showPositiveSign={value.amount != 0 ? true : false}
                            signPosition='beforePrefix'
                        />
                        {value.error != '' && <Text style={styles.errorText}>{value.error}</Text>}
                    </View>
                    <View
                        style={styles.noteContainer}
                    >
                        <TextInput
                            placeholder='Add note...'
                            placeholderTextColor={'#696969'}
                            style={styles.searchInput}
                            multiline={ true }
                            onEndEditing={() => { Keyboard.dismiss() }}
                            value={value.note}
                            onChangeText={(text) => setValue({ ...value, note: text})}
                        />
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={ transact }
                    >
                        <Text style={styles.text}>Send to { friend.username }</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

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
        alignItems: 'center',
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
        width: '100%',
        height: 140,
        alignItems: 'center',
    },
    text: {
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 24,
        textAlign: 'center',
        color: '#696969'
    },
    noteContainer: {
        width: '90%',
        height: 200,
        backgroundColor: '#EFEFEF',
        borderRadius: 13,
        textAlign: 'left',
        padding: 20,
        textAlignVertical: 'top',
        top: 20,
    },
    searchInput: {
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 20,
        color: '#696969',
        width: '100%',
        height: '100%',
        textAlignVertical: 'top',
    },
    footer: {
        width: '100%',
        height: 138,
        backgroundColor: '#efefef',
        alignItems: 'center',
    },
    sendButton: {
        height: '30%',
        backgroundColor: '#B0D3AA',
        borderRadius: 13,
        marginTop: 25,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 12,
        width: '90%',
        textAlign: 'center',
    }
})