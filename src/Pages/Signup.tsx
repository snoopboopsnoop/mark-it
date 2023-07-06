import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { app, loginEmailPassword } from '../../firebase.config';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';

const auth = getAuth(app);

export default function Signup() {
    const [value, setValue] = useState({
        email: '',
        password: '',
        error: '',
    });
    const navigation = useNavigation();

    async function signUp() {
        if(value.email == '' || value.password == '') {
            console.log("fuck")
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })

            return;
        }
        
        console.log("cum")
        const userCredential = await signInWithEmailAndPassword(auth, value.email, value.password);
        console.log(userCredential.user);

    };

    return(
        <View style={styles.container}>
            <TextInput
                placeholder='username'
                value={value.email}
                onChangeText={ (text) => setValue({ ...value, email: text }) }
                style={styles.input}
            />
            <TextInput
                placeholder='password'
                value={value.password}
                onChangeText={ (text) => setValue({ ...value, password: text}) }
                secureTextEntry={ true }
                style={styles.input}
            />
            <TouchableOpacity
                style={styles.button}
                //onPress={() => { loginEmailPassword(value.email, value.password) }}
                onPress={ signUp }
            >
                <Text style={styles.text}>
                    funny monkey
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    button: {
        width: '30%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B0D3AA',
    },
    input: {
        width: '50%',
        height: '5%',
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
        paddingLeft: 20,
    },
    text: {
        width: '100%',
        height: 19,
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 14,
        textAlign: 'center',
        color: '#696969'
      },
});