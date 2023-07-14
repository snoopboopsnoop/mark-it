import { View, TouchableOpacity, Text, StyleSheet, TextInput, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from 'react';
import { app } from '../../firebase.config';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';

import { registration } from '../../firebase.config';

const auth = getAuth(app);

export default function Signup() {
    const [value, setValue] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: '',
    });
    const navigation = useNavigation();

    async function signUp() {
        if(value.email == '' || value.password == '' || value.firstName == '' || value.lastName == '' || value.username == '') {
            console.log("fuck")
            setValue({
                ...value,
                error: 'All inputs (except profile picture) are required.'
            })

            return;
        }
        
        try {
            await registration(value.email, value.password, value.firstName, value.lastName, value.username);
            navigation.navigate('Login')
        } 
        catch(error: unknown) {
            setValue({ ...value, error: error.message})
        }

    };

    return(
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <View style={styles.innerContainer}>
                        <View style={styles.accContainer}>
                            <View style={[{justifyContent: 'flex-end'}]}>
                                <Image 
                                    style={styles.pfp}
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
                            <TextInput
                                placeholder='Username'
                                value={value.username}
                                onChangeText={ (text) => setValue({ ...value, username: text}) }
                                style={[styles.input, {height: '20%'}]}
                            />
                        </View>
                        <View style={styles.signupContainer}>
                            <TextInput
                                placeholder='First Name'
                                value={value.firstName}
                                onChangeText={ (text) => setValue({ ...value, firstName: text }) }
                                style={styles.input}
                            />
                            <TextInput
                                placeholder='Last Name'
                                value={value.lastName}
                                onChangeText={ (text) => setValue({ ...value, lastName: text }) }
                                style={styles.input}
                            />
                            <TextInput
                                placeholder='Email Address'
                                value={value.email}
                                onChangeText={ (text) => setValue({ ...value, email: text }) }
                                style={styles.input}
                                autoCapitalize='none'
                                autoCorrect={ false }
                                autoComplete='email'
                            />
                            <TextInput
                                placeholder='Password'
                                value={value.password}
                                onChangeText={ (text) => setValue({ ...value, password: text}) }
                                secureTextEntry={ true }
                                style={styles.input}
                                autoCapitalize='none'
                            />
                        </View>
                    </View>
                </View>
                {value.error != '' && <Text style={styles.errorText}>{value.error}</Text>
                }
                <TouchableOpacity
                    style={styles.button}
                    //onPress={() => { loginEmailPassword(value.email, value.password) }}
                    onPress={ () => {
                        setValue({ ...value, error: '' })
                        signUp();
                    }}
                >
                    <Text style={styles.text}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
    },
    button: {
        width: '30%',
        height: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B0D3AA',
        borderRadius: 10,
    },
    input: {
        width: '100%',
        height: '20%',
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 10,
    },
    text: {
        width: '100%',
        height: 19,
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 14,
        textAlign: 'center',
        color: '#696969'
    },
    infoContainer: {
        width: '100%',
        height: '30%',
        //backgroundColor: '#F6F6F6',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingHorizontal: 26,
        paddingVertical: 20,
    },
    innerContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
    },
    accContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingRight: 16,
        width: '50%',
        height: '100%',
        gap: 20,
    },
    signupContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 16,
        width: '50%',
        height: '100%',
        gap: 10,
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
    addButton: {
        position: 'absolute',
        borderRadius: 40,
        width: 41,
        height: 41,
        backgroundColor: '#B0D3AA',
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 12,
        width: '90%',
        textAlign: 'center',
    }
});