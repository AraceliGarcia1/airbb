import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile";
import UserGuest from "../screens/profile/UserGuest";
import UserLogged from "../screens/profile/UserLogged";
const Stack= createStackNavigator();



export default function ProfileStack(){
    return(
        <Stack.Navigator
        screenOptions={{
            headerMode: 'screen',
            headerTintColor: 'white',
            headerStyle:{backgroundColor: '#ff5a60'}
        }}
        >
            <Stack.Screen
            name="profileStack"
            component={Profile}
            options={{title:"Perfil"}}
            />

            <Stack.Screen
              name="userGuest"
              component={UserGuest}
              options={{title:"Invitado"}}
            
            />
             <Stack.Screen
              name="userLogged"
              component={UserLogged}
              options={{title:"Perfil de Usuario"}}
            
            />
        </Stack.Navigator>
    )
}
