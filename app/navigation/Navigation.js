import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import Travel from "../screens/Travel";
import Favorites from "../screens/Favorites";
import Search from "../screens/Search";
import Message from "../screens/Message";
import Profile from "../screens/Profile";
const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (

        <NavigationContainer>
            <Tab.Navigator initialRouteName="travel"
            screenOptions={({route})=>({
               tabBarIcon:({color})=>screenOptions(route,color),
               tabBarActiveTintColor:'tomato',
               tabBarInactiveTintColor:'gray',
            })}
             >
                <Tab.Screen
                    name="search"
                    component={Search}
                    options={{ title: "Buscar" }}
                />
                <Tab.Screen
                    name="favorites"
                    component={Favorites}
                    options={{ title: "Favoritos" }}
                />
                <Tab.Screen
                    name="travel"
                    component={Travel}
                    options={{ title: "Viajes" }}
                />
                 <Tab.Screen
                    name="message"
                    component={Message}
                    options={{ title: "Mensaje" }}
                />
                 <Tab.Screen
                    name="profile"
                    component={Profile}
                    options={{ title: "Perfil" }}
                />
            </Tab.Navigator>

        </NavigationContainer>
    
    );
}

const screenOptions=(route, color)=>{
    let iconName;
    switch(route.name){
        case "travel":
            iconName="airplane-takeoff"
            break;
        case "favorites":
            iconName="heart-circle"    
            break;
        case "search":
            iconName="card-search"    
            break;
        case "message":
            iconName="forum"    
             break;
        case "profile":
            iconName="account-circle"    
             break;    

    }
    return(
        <Icon type="material-community" name={iconName} size={22} color={color}/>
    )
}