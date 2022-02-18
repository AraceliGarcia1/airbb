
import React,{useState} from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import {Image} from "react-native-elements"
import LoginForm from '../../components/profile/LoginForm'
import { useNavigation } from '@react-navigation/native'


export default function UserLogin() {
  const navigation=useNavigation()
  
  return (
    <View style={styles.container}>
      
      <ScrollView>
        <Image
         source={require("../../../assets/Airbnb-Logo.png")}
         resizeMode='contain'
         style={styles.img}
        
        />
        <LoginForm navigation={navigation}/>
        
      </ScrollView>
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

