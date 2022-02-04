import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import TravelStack from './TravelStack';
import Favorites from '../screens/Favorites';
import Search from "../screens/Search"
import Message from "../screens/Message"
import ProfileStack from './ProfileStack';
const Tab = createBottomTabNavigator();
export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='travel'
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color),
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false
                })}
            >
                <Tab.Screen
                    name='search'
                    component={Search}
                    options={{ title: "Buscar" }}
                />
                <Tab.Screen
                    name='favorites'
                    component={Favorites}
                    options={{ title: "Favoritos" }}
                />
                <Tab.Screen
                    name='travel'
                    component={TravelStack}
                    options={{ title: "Viajes" }}
                />
                <Tab.Screen
                    name='message'
                    component={Message}
                    options={{ title: "Mensajes" }}
                />

                <Tab.Screen
                    name='profile'
                    component={ProfileStack}
                    options={{ title: "Perfil" }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    );
}

const screenOptions = (route, color) => {
    let iconName;
    switch (route.name) {
        case "travel":
            iconName = "airplane-landing"
            break;

        case "favorites":
            iconName = "heart-circle"
            break;

        case "search":
            iconName = "magnify"
            break;

        case "message":
            iconName = "message-outline"
            break;

        case "profile":
            iconName = "account-outline"
            break;
    }
    return (
        <Icon type="material-community" name={iconName} size={22} color={color} />
    )
}
