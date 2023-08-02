import { Text, StyleSheet, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { sendFriendRequest, getFriendWithUsername } from '../../firebase.config';

export default function Friends({ navigation }) {
    const [ value, setValue ] = useState({
        username: '',
        error: '',
    });

    async function request() {
        if(value.username == '') {
            setValue({...value, error: 'Specify user you dumb fuck'});
            return;
        }

        try {
            const uid = await getFriendWithUsername(value.username);
            await sendFriendRequest(uid);
            setValue({...value, error: 'Request sent!', username: ''})
            return;
        }
        catch(error: unknown) {
            setValue({...value, error: error.message})
        }
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.pending}
                onPress={() => { navigation.navigate("Requests") }}
            >
                <Text style={styles.pendingText}>Incoming Friend Requests</Text>
                <View style={styles.pendingRight}>
                    {/* <Text style={styles.pendingText}>0</Text> */}
                    <AntDesign name="right" size={20} color="#696969" />
                </View>
            </TouchableOpacity>
            <View style={styles.addFriend}>
                <Text style={styles.pendingText}>Add Friend by Username</Text>
                <View style={styles.searchBar}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Enter friend's username"
                    placeholderTextColor={'#797979'}
                    value={value.username}
                    onChangeText={(text) => setValue({...value, username: text})}
                  />
                </View>
                {value.error != '' && <Text style={styles.errorText}>{value.error}</Text>}
                <TouchableOpacity
                    style={[styles.searchBar, { backgroundColor: '#B0D3AA', justifyContent: 'center'}]}
                    onPress={() => {
                        setValue({ ...value, error: ''});
                        request();
                        
                    }}
                >
                    <Text style={[styles.pendingText, {fontSize: 14}]}>Send Friend Request</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    pending: {
        width: '100%',
        height: '10%',
        backgroundColor: '#F6F6F6',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        flexDirection: 'row',
    },
    pendingText: {
        fontSize: 16,
        color: '#696969'
    },
    pendingRight: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    addFriend: {
        paddingHorizontal: 25,
        paddingTop: 20,
        flexGrow: 1,
    },
    searchBar: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 11,
        paddingVertical: 3,
        gap: 6,
        width: '100%',
        height: '7%',
        backgroundColor: '#D9D9D9',
        borderRadius: 10, 
        justifyContent: 'space-between',
    },
    searchInput: {
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 13,
        color: '#797979',
        lineHeight: 18,
        width: '100%',
    },
    errorText: {
        fontSize: 12,
        width: '90%',
        textAlign: 'center',
    },
})