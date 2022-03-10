import { StyleSheet, Text, View,Alert, Dimensions, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import {Input, Button,Divider, Icon,Avatar, Image} from "react-native-elements"
import *as ImagePicker from "expo-image-picker"
import {map, size,filter, isEmpty} from "lodash"
import * as Location from "expo-location"
import MapView from "react-native-maps"
import Modal from '../../utils/Modal'
import {db} from "../../utils/firebase"
import {collection,addDoc} from "firebase/firestore"

const widthScreen=Dimensions.get("window").width

export default function AddHouseForm(props) {
     //generacion de estados con el const
     const {toastRef, setLoading}=props
     const [imageSelected,setImageSelected]=useState([])
     const [error, setError]=useState({camera:"",place:"",address:"",description:""})
     const [isVisibleMap,setIsVisibleMap]=useState(false)
     const [place,setPlace]=useState("")
     const [address,setAddress]=useState("")
     const [description,setDescription]=useState("")
     const [locationHouse,setLocationHouse]=useState(null)



     const saveHouse=()=>{
          console.log("hola")
          if(isEmpty(setImageSelected)||isEmpty(setPlace)||isEmpty(setAddress)||isEmpty(setLocationHouse)){
               setError({
               
                    place: "Obligatorio",
                    address: "Obligatorio",
                    description:"Obligatorio"
                  });
          }else{
               
              setError({
               
              place: "",
              address: "",
              description: "",

          });
          console.log(llenos)

          }

     }

    
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
           <FormAdd
           setIsVisibleMap={setIsVisibleMap}
           setPlace={setPlace}
           setDescription={setDescription}
           setAddress={setAddress}
           error={error}
           locationHouse={locationHouse}
           />
           <Button
           title="Crear condominio"
           buttonStyle={styles.btn}
           icon={
                <Icon
                type="font-awesome"
                name="save"
                size={15}
                color="white"
                />

                
           }
           iconContainerStyle={{marginRight:10}}
           onPress={saveHouse}
           
           />
           <Map
           isVisibleMap={isVisibleMap} 
           setIsVisibleMap={setIsVisibleMap}
           toastRef={toastRef}
           setLocationHouse={setLocationHouse}
           
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
                    setImageSelected([...imageSelected,result.uri])

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

function Map(props){
 const {isVisibleMap,setIsVisibleMap,toastRef,setLocationHouse}=props
 const[location,setLocation]=useState()
 useEffect(()=>{
      (async()=>{
           const resultPermissions= await Location.requestForegroundPermissionsAsync()
           if(resultPermissions.status==="granted"){
                let loc=await Location.getCurrentPositionAsync({})
                setLocation({
                     latitude:loc.coords.latitude,
                     longitude:loc.coords.longitude,
                     latitudeDelta:0.001, 
                     longitudeDelta:0.001 

                })

           }else{
                toastRef.current.show("Es necesario aceptar los permisos de ubicacion ")
           }

      })()

 },[])
 const confirmLocation=()=>{
     setLocationHouse(location)
     toastRef.current.show("Ubicacion guardada")
     setIsVisibleMap(false)
 }
 return(
      <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
           <View>
                {location &&(
                     <MapView
                     style={styles.map}
                     initialRegion={location}
                     showsUserLocation={true}
                     onRegionChange={(region)=>setLocation}
                     >
                          <MapView.Marker
                          coordinate={{
                               latitude:location.latitude,
                               longitude:location.longitude
                          }}
                          draggable
                          />


                     </MapView>
                )}
                <View style={{flex:1,alignItems:"center", marginTop:10}}>
                     <Divider style={styles.divider}/>
                </View>
                <View>
                     <Button
                     title="Cancelar"
                     containerStyle={styles.btnContainer}
                     buttonStyle={styles.btnStyleCancel}
                     onPress={()=>setIsVisibleMap(false)}
                     
                     />
                      <Button
                     title="Guardar Ubicacion"
                     containerStyle={styles.btnContainer}
                     buttonStyle={styles.btnStyleSave}
                     onPress={confirmLocation}
                     
                     />
                </View>
           </View>
      </Modal>
 )
}



function FormAdd(props){
     const{setIsVisibleMap,setPlace,setDescription,setAddress,error,locationHouse}=props
     return(
          <View style={styles.viewForm}>
               <Input
               label="Lugar"
               labelStyle={styles.label}
               placeholder="Acapulco"
               containerStyle={styles.inputContainer}
               errorMessage={error.place}   
               onChange={(event)=>setPlace(event.nativeEvent.text)}         
               />
               <Input
               label="Direccion"
               labelStyle={styles.label}
               placeholder="Colonia Laureles"
               containerStyle={styles.inputContainer}
               errorMessage={error.address}   
               onChange={(event)=>setAddress(event.nativeEvent.text)} 
               rightIcon={
                    <Icon
                    type='material-community'
                    name='google-maps'
                    color={locationHouse ? "#00a680": "#c2c2c2"}
                    onPress={()=>setIsVisibleMap(true)}
                    
                    />
               }        
               />
               <Input
               label="Description"
               labelStyle={styles.label}
               placeholder="Comentarios"
               containerStyle={styles.inputContainer}
               inputContainerStyle={styles.textArea}
               errorMessage={error.description}   
               multiline={true}
               onChange={(event)=>setDescription(event.nativeEvent.text)}         
               />


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
     },
     viewForm:{
          marginLeft:10,
          marginRight:10,
          marginTop:16
     },
     label:{
          fontSize:15,
          color:"#ff5a60"    
     },
     inputContainer:{
          marginBottom:16,
     },
     textArea:{
          height:100,
          width:"100%"

     },
     btn:{
          backgroundColor:"#ff5a60",
          margin:20
     },
     map:{
          width:"100%",
          height:560,

     },
     divider:{
          width:"85%",
          backgroundColor:"#ff5a60",
          marginBottom:2,
          
     },
     btnContainer:{
          padding:5,
          marginBottom:10,
     },
     btnStyleCancel:{
          backgroundColor:"#a60a0d"

     },
     btnStyleSave:{
          backgroundColor:"#00a680"
     }




})