import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, ScrollView, Dimensions, } from "react-native";
import { Input, Button, Divider, Icon, Avatar, Image, } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { map, size, filter } from "lodash";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import {Collection, addDoc, collection } from "firebase/firestore"
import{getStorage, ref, uploadBytes,getDownloadURL} from "firebase/storage"
import {db} from "../../utils/firebase"
import {getAuth} from "firebase/auth"
import { isEmpty } from "lodash"
import Modal from "../../utils/Modal"
import uuid from "random-uuid-v4"
import {useNavigation} from "@react-navigation/native"
import { async } from "@firebase/util";

const widthScreen = Dimensions.get("window").width;

export default function AddHouseForm(props) {
    const { toastRef, setLoading } = props;
    const navigation=useNavigation()
    const [imageSelected, setImageSelected] = useState([]);
    const [error, setError] = useState({
        camera: "",
        place: "",
        address: "",
        description: "",
        image: ""
    });
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [place, setPlace] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [locationHouse, setLocationHouse] = useState(null)

    const saveHouse = () =>{
        if(isEmpty(place) || isEmpty(address) || isEmpty(description) || locationHouse==null || imageSelected.length==0){
            setError({
                camera: "Obligatorio",
                place: "Obligatorio",
                address: "Obligatorio",
                description: "Obligatorio",
                image: "Obligatorio"
            })
        }else{
            setError({
                camera: "",
                place: "",
                address: "",
                description: ""
            })
            setLoading(true)
            saveImage().then(async(response)=>{
                try{
                    const auth=getAuth()
                    //si exste la usa, sino la genera 
                    const docRef=await addDoc(collection(db,"houses"),{
                        //si es el mismo key, lo acepta 
                        id:uuid(),
                        place:place,
                        description:description,
                        address:address,
                        location:locationHouse,
                        images:response,
                        rating:0,
                        ratingTotal:0,
                        quantityVoting:0,
                        createAt:new Date(),
                        //mandamos el usuario del que tiene sesion actualmente 
                        createBy:auth.currentUser.uid

                    })
                    setLoading(false)
                    navigation.navigate("travelStack"),{id:1,name:"erick"}

                }catch(err){
                    console.log(err)

                }

            }).catch((err)=>{
                console.log("error al obtener",err)

            })
        }
    }
    // guardar en el storage
    const saveImage = async()=>{
        const imageBlob=[]
        await Promise.all(
            //POR CADA ITERACION DENTRO DEL HASMAP USAMOS UN IMAGE 
            map(imageSelected,async(image)=>{
                const response=await fetch(image)
                const {_bodyBlob}=response
                const storage=getStorage()
                const id= uuid()
                const storageRef=ref(storage,`house/ ${id}`)
                await uploadBytes(storageRef,_bodyBlob)
                .then(async()=>{
                    await getDownloadURL(ref(storage,`house/ ${id}`))
                    .then((url)=>{
                        imageBlob.push(url) 
                    }).catch((err)=>{
                        console.log("error al descargar",err);
                    }).catch((err)=>{
                        console.log("error al registrar", err);
                })
            })
            }))
         return imageBlob
    }
        
    return (
        <ScrollView>
            <ImagePreview imageSelected={imageSelected} />
            <UploadImage
                toastRef={toastRef}
                setImageSelected={setImageSelected}
                imageSelected={imageSelected}
                error={error}
            />

              <Text style={styles.container2}>{error.image}</Text>
           
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
                iconContainerStyle={{ marginRight: 10 }}
                onPress={saveHouse}
            />
            <Map
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                toastRef={toastRef}
                setLocationHouse={setLocationHouse}
            />
        </ScrollView>
    );
}

function ImagePreview(props) {
    const { imageSelected } = props;
    return (
        <View>
            <Image
                source={
                    size(imageSelected)
                        ? { uri: imageSelected[0] }
                        : require("../../../assets/profileGuest2.png")
                }
                style={{ width: widthScreen, height: 200 }}
            />
        </View>
    );
}

function UploadImage(props) {
    const { toastRef, setImageSelected, imageSelected, error } = props;

    const addImage = async () => {
        const resultPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (resultPermission.status !== "denied") {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [3, 2],
            });
            if (!result.cancelled) {
                setImageSelected([...imageSelected, result.uri]);
            } else {
                toastRef.current.show("Has cerrado la galería");
            }
        } else {
            toastRef.current.show(
                "Es necesario aceptar los permisos de cámara.",
                4000
            );
        }
    };

    const removeImage = (image) => {
        Alert.alert("Eliminar imagen", "¿Estás seguro de eliminar la imagen?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Elimiar",
                    onPress: () => {
                        setImageSelected(
                            filter(imageSelected, (imageUri) => imageUri !== image)  
                        );
                    },
                },
            ]);
    };
    return (
        <View style={styles.viewUploadImage}>
            {size(imageSelected) < 5 && (
                <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.iconUploadImge}
                    onPress={addImage}
                    errorMessage={error.camera}
                />
            )}
            {map(imageSelected, (image, index) => (
                <Avatar
                    key={index}
                    style={styles.miniatureImage}
                    source={{ uri: image }}
                    onPress={() => removeImage(image)}
                />
            ))}
        </View>
    );
}

function FormAdd(props) {
    //referencia en memoria de esos estados
    const { setIsVisibleMap, setPlace, setDescription, setAddress, error, locationHouse } = props;
    return (
        <View
            style={styles.viewForm}
        >
            <Input
                label="Lugar"
                labelStyle={styles.label}
                placeholder="Acapulco"
                containerStyle={styles.inputContainer}
                errorMessage={error.place}
                onChange={(event) => setPlace(event.nativeEvent.text)}
            />
            <Input
                label="Dirección"
                labelStyle={styles.label}
                placeholder="Colonia Laureles"
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.textArea}
                errorMessage={error.address}
                onChange={(event) => setAddress(event.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="google-maps"
                        color={locationHouse ? "#00a680" : "#c2c2c2"}
                        onPress={() => setIsVisibleMap(true)}
                    />
                    //un calor nulo en javaScript es falso
                }
            />
            <Input
                label="Descripción"
                labelStyle={styles.label}
                placeholder="Comentarios"
                containerStyle={styles.inputContainer}
                errorMessage={error.description}
                multiline={true}
                onChange={(event) => setDescription(event.nativeEvent.text)}
            />
        </View>
    )
}
function Map(props) {
    const { isVisibleMap, setIsVisibleMap, toastRef, setLocationHouse } = props
    const [location, setLocation] = useState()
    useEffect(() => {
        (async () => {
            const resultPermission = await Location.requestForegroundPermissionsAsync()
            if (resultPermission.status === "granted") {
                let loc = await Location.getCurrentPositionAsync({})
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                })
            } else {
                toastRef.current.show("Es necesario aceptar los permisos de ubbicación")
            }
        })() //para que sea autoejecutable ()
    }, [])

    const confirmLocation = () => {
        setLocationHouse(location)
        toastRef.current.show("Ubicación guardada")
        //Para cerrar el modal 
        setIsVisibleMap(false)
    }
    return (
        <Modal
            isVisible={isVisibleMap}
            setIsVisible={setIsVisibleMap}>
            <View>
                {location && (
                    <MapView
                        style={styles.map}
                        initialRegion={location} //ubicación actual de mi usuario
                        showsUserLocation={true}
                        onRegionChange={(region) => setLocation(region)}//que va a hacer cuando la ubicación cambie
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                            draggable
                        />
                    </MapView>
                )}
                <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
                    <Divider style={styles.divider} />
                </View>
                <View>
                    <Button
                        title="Cancelar"
                        style={styles.btnContainerCancel}
                        buttonStyle={styles.btnStyleCancel}
                        onPress={() => setIsVisibleMap(false)}
                    />
                    <Button
                        title="Guardar ubicación"
                        containerStyle={styles.btnContainerCancel}
                        buttonStyle={styles.btnStyleSave}
                        onPress={confirmLocation}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    viewUploadImage: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
    },

    iconUploadImge: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3",
    },
    miniatureImage: {
        height: 70,
        width: 70,
        marginRight: 10,
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 16,
    },
    label: {
        fontSize: 15,
        color: "#ff5a60"
    },
    inputContainer: {
        marginBottom: 16,
    },
    container2: {
     marginTop: 10,
     color: "#ff5a60",
     marginLeft:20,
    },

    textArea: {
        height: 100,
        width: "100%",
    },
    btn: {
        backgroundColor: "#ff5a60",
        margin: 20
    },
    map: {
        width: "100%",
        height: 560,
    },
    divider: {
        width: "85%",
        backgroundColor: "#ff5a60",
        marginBottom: 2
    },
    btnContainerCancel: {
        padding: 5,
        marginBottom: 10
    },
    btnStyleCancel: {
        backgroundColor: "#a60a0d"
    },
    btnStyleSave: {
        backgroundColor: "#00a680",
    }

});