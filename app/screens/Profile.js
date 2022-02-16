import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserGuest from "./profile/UserGuest";
import UserLogged from "./profile/UserLogged";

export default function Profile(props) {
  const { navigation } = props;
  const [login, setLogin] = useState();
  const auth = getAuth();
  //recibe una funcion pero mandamos un arrow fuction
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      //validacion si llega nulo o llega con algo
      //si es falso quiere decir que la sesion no esta logeada
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  //true user Logged: false UserGuest

  return login ? <UserLogged /> : <UserGuest navigation={navigation} />;

  //useefect,usefocuesefect
}

const styles = StyleSheet.create({});
