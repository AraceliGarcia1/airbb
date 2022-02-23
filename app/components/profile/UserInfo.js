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
    </View>
  )
}

const styles = StyleSheet.create({


})