import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React,{useRef} from 'react'  //use Ref es un referencia para el Toast 
import { Image } from 'react-native-elements'
import Toast from 'react-native-easy-toast'

export default function UserCreate() {
  const toastRef=useRef() 
  const navigation = useNavigation()
  return (
    <View style={styles.container} >
      <ScrollView>
        <Image
          source={require("../../../assets/Airbnb-Logo.png")}
          resizeMode="contain"
          style={styles.img}
        />
        <CreateForm navigation={navigation} toastRef={toastRef}/>

      
      </ScrollView>
      <Toast            
      ref={toastRef}          //estilos del toast para el create form
      opacity={0.9}
      position="center"
      />

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