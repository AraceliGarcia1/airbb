import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Travel from "../screens/Travel";
import AddHouse from "../components/travel/AddHouse";
const Stack = createStackNavigator();

export default function TravelStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle:{backgroundColor: '#ff5a60'}
            }}
        >
            <Stack.Screen
                name="travelStack"
                component={ Travel }
                options={{ title: "Viajes" }}
            />
            <Stack.Screen
                name="addHouse"
                component={ AddHouse }
                options={{ title: "Agrega un condominio" }}
            />

        </Stack.Navigator>
    )
}
