
import React,{useState,useRef} from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import {Image} from "react-native-elements"
import LoginForm from '../../components/profile/LoginForm'
import { useNavigation } from '@react-navigation/native'
import Toast from "react-native-easy-toast"


export default function UserLogin() {
  const navigation=useNavigation()
  const toastRef=useRef()
  
  return (
    <View style={styles.container}>
      
      <ScrollView>
        <Image
         source={require("../../../assets/Airbnb-Logo.png")}
         resizeMode='contain'
         style={styles.img}
        
        />
        <LoginForm navigation={navigation} toastRef={toastRef}/>
        
      </ScrollView>
      <Toast
      ref={toastRef} opacity={0,9}
      position="center"
      
      />
    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    backgroundColor:"#FFF",
    height:"100%"
  },

  img:{
    width:"100%",
    height:150,
    marginTop:20,
    marginBottom:20,
  }

});

