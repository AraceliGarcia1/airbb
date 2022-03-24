import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import TopFive from "../screens/TopFive";

const Stack = createStackNavigator();

export default function TopFiveStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#ff5a60' }
            }}
        >
            <Stack.Screen
                name="topFive"
                component={TopFive}
                options={{ title: "Top 5" }}
            />

        </Stack.Navigator>
    )
}

<Stack.Navigator >

</Stack.Navigator>