import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator}from "@react-navigation/stack"
import Travel from "../screens/Travel";
const Stack=createStackNavigator();

export default function TravelStack(){
    return(
        <Stack.Navigator
        screenOptions={{
            headerMode: 'screen',
            headerTintColor:'white',
            headerStyle:{backgroundColor:'#ff5a60'}
        }}
        >
            
        <Stack.Screen
        name="travelStack"
        component={Travel}
        opcions={{title: "Viajes"}}
        />

        </Stack.Navigator>
    )
}
//#ff5a60