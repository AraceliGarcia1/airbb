import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements'


export default function UserInfo(props) {
     console.log(props)
     const {infoUser:{id,photoUrl,displayName,email}}=props
  return (
    <View style={styles.container}>
     <Avatar
     rounded
     size="large"
     containerStyle={styles.avatarContainer}
     source={photoUrl?{uri:photoUrl}: require("../../../assets/profileGuest2.png")}
     >
          <Avatar.Accessory size={22} onPress={()=>console.log("hola")}/>
     </Avatar>
     <View>
     <Text style={styles.displayName}>
       {displayName ? displayName:"Anónimo"}
     </Text>
     <Text>
     {email ? email:"Red social"}
     </Text>
     </View>
    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    backgroundColor:"#fff",
    paddingTop:30,
    paddingBottom:30,
  },
  avatarContainer:{
    marginRight:20,
  },
  displayName:{
    fontWeight:"bold",
    paddingBottom:5,
  }


})