import { View, TouchableOpacity, Text, StyleSheet, TextInput, Image } from 'react-native';
import { useState } from 'react';
import { app, loginEmailPassword } from '../../firebase.config';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';

const auth = getAuth(app);

export default function Login() {
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
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, value.email, value.password);
        }
        catch(error: unknown) {
            console.log(error.message);
        }

    };

    return(
        <View style={styles.container}>
            <Text style={[styles.text, {fontSize: 24, height: undefined}]}> Welcome to Whopay! </Text>
            <Image
                style={styles.logo}
                resizeMode='contain'
                source={require('../assets/logo.png')}
            />
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
                    Sign In
                </Text>
            </TouchableOpacity>
            <Text style={styles.text}>
                Don't have an account?{' '}
                <Text
                    style={[styles.text, {color: '#0000FF'}]}
                    onPress={()=>{ navigation.navigate('Signup') }}
                >
                    Sign up
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
        top: '20%'
    },
    button: {
        width: '30%',
        height: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B0D3AA',
        borderRadius: 10,
    },
    logo: {
        width: '50%',
        height: '5%'
    },
    input: {
        width: '50%',
        height: '5%',
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 20,
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