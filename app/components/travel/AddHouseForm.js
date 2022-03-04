import { StyleSheet, Text, View,Alert, Dimensions, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import {Input, Button,Divider, Icon,Avatar, Image} from "react-native-elements"
import *as ImagePicker from "expo-image-picker"
import {map, size,filter} from "lodash"
import * as Location from "expo-location"
import MapView from "react-native-maps"
import {db} from "../../utils/firebase"
import {collection,addDoc} from "firebase/firestore"

const widthScreen=Dimensions.get("window").width

export default function AddHouseForm(props) {
     const {toastRef, setLoading}=props
     const [imageSelected,setImageSelected]=useState([])
     const [error, setError]=useState({camera:"",place:"",address:"",description:""})
    
  return (
      <ScrollView>
           <ImagePreview
           imageSelected={ImagePreview}
           
           />
           <UploadImage
           toastRef={toastRef}
           setImageSelected={setImageSelected}
           imageSelected={imageSelected}
           error={error}
           
           
           />
      </ScrollView>
  )
}


function ImagePreview(props){
     const{imageSelected}=props
     return(
          <View>
               <Image
                source={size(imageSelected)
                    ?{uri:imageSelected[0]}
                    :require("../../../assets/profileGuest2.png")}
                style={{width:widthScreen,height:200}}
               
               
               />
          </View>
     )


}

//actualiza las imagenes
function UploadImage(props){
     const{toastRef,setImageSelected,imageSelected,error}=props
     const addImage=async()=>{
          const resultPermissions=await ImagePicker.requestCameraPermissionsAsync
          if(resultPermissions.status!=="denied"){
               const result=await ImagePicker.launchImageLibraryAsync({
                    allowsEditing:true,
                    aspect:[3,2]
               })
               if(!result.cancelled){
                    setImageSelected(...imageSelected,result.uri)

               }else{
                    toastRef.current.show("Has cerrado galeria")
               }

          }else{
               toastRef.current.show("Es necesario aceptar los permisos",4000)
          }

     }
     const removeImage=(image)=>{
     Alert.alert(
          "Eliminar imagen",
          "¿Estas seguro de eliminar la imagen?",
          [
               {
                    text:"Cancelar",
                    style:"cancel"
               },
               {
                    text:"Eliminar",
                    onPress:()=>{

                         setImageSelected(filter(imageSelected,(imageUri)=>imageUri !== image))
                    }
               }
              
          ]

     )
     }
     return(
          <View style={styles.viewUploadImage}>
               {size(imageSelected)<5 &&(

                      <Icon
                      type='material-community'
                      name='camera'
                      color="#7a7a7a"
                      containerStyle={styles.iconUploadImage}
                      onPress={addImage}
                      errorMessage={error.camera}
                      />
               )}
               {map(imageSelected,(image,index)=>(
                    <Avatar
                     key={index}
                     style={styles.miniatureImage}
                     source={{uri:image}}
                     onPress={()=>removeImage(image)}
                    
                    />

               ))}
             
          </View>
     )
     

}


const styles = StyleSheet.create({

     viewUploadImage:{
          
          flexDirection:"row",
          marginLeft:20,
          marginRight:20,
          marginTop:20,     
     },
     iconUploadImage:{
          alignItems:"center",
          justifyContent:"center",
          marginRight:10,
          height:70,
          width:70,
          backgroundColor:"#e3e3e3"
     },
     miniatureImage:{
          width:70,
          height:70,
          marginRight:10
     }

})