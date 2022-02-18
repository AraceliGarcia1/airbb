import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'
import CreateForm from '../../components/profile/CreateForm'
import { useNavigation } from '@react-navigation/native'



export default function UserCreate() {
  const navigation = useNavigation()
  return (
    <View style={styles.container} >
      <ScrollView>
        <Image
          source={require("../../../assets/Airbnb-Logo.png")}
          resizeMode="contain"
          style={styles.img}
        />
        <CreateForm navigation={navigation}/>

      
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%"
  },
  img: {
    width: "100%",
    height: 150,
    marginTop: 20,
    marginBottom: 20
  }
})