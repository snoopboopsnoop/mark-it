import { View, TouchableOpacity, Text, StyleSheet, TextInput, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from 'react';
import { app, loginEmailPassword } from '../../firebase.config';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';

const auth = getAuth(app);

export default function Login( { navigation }) {
    const [value, setValue] = useState({
        email: '',
        password: '',
        error: '',
    });

    async function signIn() {
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
            setValue({ ...value, error: "Incorrect Email or Password or servers down or some shit idfk"})
        }

    };

    return(
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            
            <View style={styles.container}>
                <Text style={[styles.text, {fontSize: 24, height: undefined}]}> Welcome to Whopay! </Text>
                <Image
                    style={styles.logo}
                    resizeMode='contain'
                    source={require('../assets/logo.png')}
                />
                <TextInput
                    placeholder='Email'
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
                {value.error != '' && <Text style={styles.errorText}>{value.error}</Text>
                }
                <TouchableOpacity
                    style={styles.button}
                    onPress={ () => {
                        setValue({ ...value, error: '' })
                        signIn();
                    }}
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
    errorText: {
        fontSize: 12,
        width: '90%',
        textAlign: 'center',
    }
});