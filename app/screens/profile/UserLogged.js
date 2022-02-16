import React, {useEffect,useState}from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { Button } from "react-native-elements/dist/buttons/Button";

export default function UserLogged() {
    const [reaload,setReaload]=useState()
    const[infoUser,setInfoUser]=useState()
    useEffect(()=>{
        (async ()=>{
            const user= auth.currentUser
            setInfoUser(user)

        })
        setReaload(false)

    },[reaload])


  const auth = getAuth();
  return (
    <View style={styles.container}>
      <Button 
      title="Cerrar sesión"
      buttonStyle={styles.btn}
      containerStyle={styles.btnContainer}
      onPress={()=>auth.signOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    width: "80%",
  },
  btn: {
    backgroundColor:"#ff5a60",
    color: "#fff",
  },
});
//alignten horizontal
//justifycontent vertical
//un componente debe de renderizar, todas las funciones retornan algo

//rnf  // estructura para react native sin styles
//rnfs // estructura basica para react con styles
