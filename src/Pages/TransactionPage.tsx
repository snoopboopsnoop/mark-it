import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { AntDesign }  from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FakeCurrencyInput } from 'react-native-currency-input';

let degrees = '0deg';

export default function TransactionPage() {
    const [isPaying, changePayer] = useState(true);
    const [value, setValue] = useState(0.00);
    const navigation = useNavigation();

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
                                    setValue(-value)
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
                            onChangeValue={value => setValue((((value > 0 && !isPaying)) ? -value : value) || 0)}
                            maxValue={1000}
                            minValue={-1000}
                            prefix={"$"}
                            separator='.'
                            delimiter=','
                            value={value}
                            showPositiveSign={value != 0 ? true : false}
                            signPosition='beforePrefix'
                        />
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
                        />
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={() => { navigation.goBack() }}
                    >
                        <Text style={styles.text}>Send</Text>
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
        width: '25%',
        backgroundColor: '#B0D3AA',
        borderRadius: 13,
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
    }
})