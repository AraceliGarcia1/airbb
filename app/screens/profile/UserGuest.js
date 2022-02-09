import React from "react";
import {View, Text,StyleSheet, ScrollView}from "react-native";
import { Image, Button } from "react-native-elements";

export default function UserGuest(props){
    console.log("userguest",props)
    const {navigation}=props;
    return(
        //despues del . del style son las propiedades que les tenemos que dar diseño dentro de styles
    
          <ScrollView style={styles.container} centerContent={true}>
              <Image
                 source={require("../../../assets/profileGuest.png")}
                 //como se comporta la imagen
                 resizeMode={'contain'}
                 style={styles.img}
              />
              <Text style={styles.title}>Consulta tu perfil de AirB&B</Text>
              <Text style={styles.description}>¿Cómo describirias tu mejor viaje?
                  Buscal y visualiza los mejores lugares para viajar, vota por el que te haya gustado más y comenta como fue ty experiencia
              
              </Text>
              <View style={styles.containerViewBtn}>
                  <Button
                   title="Iniciar Sesion"
                   buttonStyle={styles.btn}
                   containerStyle={styles.btnContainer}
                   //desesctructuracion de icon, pero tambien se puede hacer la renderizacion como en navigation
                   icon={{
                       name: 'sign-in',
                       type:'font-awesome',
                       size:15,
                       color:"white"
                   }}
                   //dando estilos desesctructurando
                   iconContainerStyle={{marginRight:10}}
                  />
              </View>

          </ScrollView>  
     
    )
}

const styles=StyleSheet.create(
    {
        container:{
            backgroundColor:"#FFF",
            height:"100%" //porcentajes
        },
        img:{
            width:"100%",
            height:300,
            marginTop:30,
            marginLeft:30,
            marginRight:30
        },
        title:{
            fontWeight:"bold",
            fontSize:19,
            marginBottom:16,
            textAlign:"center",
            marginLeft:30,
            marginRight:30
        },
        description:{
            textAlign:"center",
            marginBottom:16,
            marginLeft:30,
            marginRight:30
        },
        containerViewBtn:{
            flex:1,
            alignItems:"center"
        },
        btn:{
            backgroundColor:"tomato",
            color:"#fff"
        },
        btnContainer:{
            width:"70%"
        }

    }
)