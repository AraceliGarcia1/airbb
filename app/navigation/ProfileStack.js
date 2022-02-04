import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile";
import UserGuest from "../screens/profile/UserGuest";

const Stack= createStackNavigator();



export default function ProfileStack(){
    return(
        <Stack.Navigator>
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
        </Stack.Navigator>
    )
}
