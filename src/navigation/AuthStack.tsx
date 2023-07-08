import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "../Pages/Login";
import Signup from '../Pages/Signup';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{gestureEnabled: false}}
            >
                <Stack.Screen
                    name="Login"
                    component={ Login }
                    options={{
                        headerShown: true 
                    }}
                />
                <Stack.Screen
                    name = "Signup"
                    component = {Signup}
                    options = {{ title: 'Make An Account' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}