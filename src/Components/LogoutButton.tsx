import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';

import { logout } from '../utils/logout';

export default function LogoutButton() {
    const navigation = useNavigation();

    return (
        <View style={styles.drawer}>
            <DrawerItem
                label="Settings"
                onPress={() => navigation.navigate('Settings')}
            />
            <DrawerItem
                label="Log Out"
                onPress={() => logout() }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    drawer: {
        width: '100%',
        height: '80%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#EFEFEF',
        paddingVertical: 50,
        
    }
})