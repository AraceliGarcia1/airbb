import React, {useEffect,useState}from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { Button } from "react-native-elements/dist/buttons/Button";
import UserInfo from "../../components/profile/UserInfo";

export default function UserLogged() {
    const [reaload,setReaload]=useState(false)
    const[infoUser,setInfoUser]=useState(null)
    const auth=getAuth()

    useEffect(()=>{
        (async ()=>{
            const user= await auth.currentUser
            setInfoUser(user)
        })()
        setReaload(false)

    },[reaload])

  return (
    <View style={styles.container}>
       {infoUser && <UserInfo infoUser={infoUser}/>}
      <Button 
      title="Cerrar sesión"
      buttonStyle={styles.btn}
      titleStyle={styles.btnTitle}
  
      onPress={()=>auth.signOut()}
      />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   minHeight:"100%",
   backgroundColor:"#FFF",

  },
  btnTitle: {
   color:"#ff5a60",
  },
  btn: {
    marginTop:30,
    borderRadius:0,
    backgroundColor:"#FFF",
    borderTopWidth:1,
    borderTopColor:"#ff5a60",
    borderBottomWidth:1,
    borderBottomColor:"#ff5a60",
    paddingTop:10,
    paddingBottom:10,
  },
});
//alignten horizontal
//justifycontent vertical
//un componente debe de renderizar, todas las funciones retornan algo

//rnf  // estructura para react native sin styles
//rnfs // estructura basica para react con styles
