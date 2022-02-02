import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import Travel from "../screens/Travel";
import Favorites from "../screens/Favorites";
const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (

        <NavigationContainer>
            <Tab.Navigator initialRouteName="travel">
                <Tab.Screen
                    name="travel"
                    component={Travel}
                    options={{ title: "Viajes" }}
                />
                <Tab.Screen
                    name="favorites"
                    component={Favorites}
                    options={{ title: "Favorites" }}
                />
            </Tab.Navigator>

        </NavigationContainer>
    
    )
}