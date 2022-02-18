import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile";
import UserGuest from "../screens/profile/UserGuest";
import UserLogged from "../screens/profile/UserLogged";
import UserLogin from "../screens/profile/UserLogin";
const Stack = createStackNavigator();
import UserCreate from "../screens/profile/UserCreate";

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#ff5a60" },
      }}
    >
      <Stack.Screen
        name="profileStack"
        component={Profile}
        options={{ title: "Perfil" }}
      />

      <Stack.Screen
        name="userGuest"
        component={UserGuest}
        options={{ title: "Invitado" }}
      />

      <Stack.Screen
        name="userLogged"
        component={UserLogged}
        options={{ title: "Perfil de Usuario" }}
      />

      <Stack.Screen
        name="userLogin"
        component={UserLogin}
        options={{ title: "Iniciar Sesion" }}
      />

      <Stack.Screen
        name="userCreate"
        component={UserCreate}
        options={{ title: "Crear cuenta" }}
      />
    </Stack.Navigator>
  );
}
