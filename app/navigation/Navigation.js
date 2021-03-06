import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import TravelStack from "./TravelStack";
import FavoritesStack from "./FavoritesStack";
import SearchStack from "./SearchStack";
import MessageStack from "./MessageStack";
import ProfileStack from "./ProfileStack";
import TopFiveStack from "./TopFiveStack";
const Tab = createBottomTabNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="profile"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{ title: "Buscar" }}
        />
        <Tab.Screen
          name="favorites"
          component={FavoritesStack}
          options={{ title: "Favoritos" }}
        />
        <Tab.Screen
          name="travel"
          component={TravelStack}
          options={{ title: "Viajes" }}
        />
        <Tab.Screen
          name="message"
          component={MessageStack}
          options={{ title: "Mensajes" }}
        />

        <Tab.Screen
          name="profile"
          component={ProfileStack}
          options={{ title: "Perfil" }}
        />
        <Tab.Screen
          name="topFive"
          component={TopFiveStack}
          options={{ title: "TopFive" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const screenOptions = (route, color) => {
  let iconName;
  switch (route.name) {
    case "travel":
      iconName = "airplane-landing";
      break;

    case "favorites":
      iconName = "heart-circle";
      break;

    case "search":
      iconName = "magnify";
      break;

    case "message":
      iconName = "message-outline";
      break;

    case "profile":
      iconName = "account-outline";
      break;

    case "topFive":
      iconName = "star-circle";
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
};
