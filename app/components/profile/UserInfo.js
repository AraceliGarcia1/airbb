import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Avatar } from 'react-native-elements'
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"
import { getAuth, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage" 
import Loading from '../Loading'

export default function UserInfo(props) {

  const { infoUser: { id, photoURL, displayName, email } } = props
  const [isLoading, setLoading] = useState(false)

  const changeAvatar = async () => {
    const resultPermissions = await Permissions.askAsync(Permissions.CAMERA)
    if (resultPermissions.permissions.camera.status !== 'denied') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        //base64: true
      })

      if (!result.cancelled) {
        uploadImage(result.uri).then((result) => {
          console.log("Bien hecho")
          uploadPhotoUrl()
        }).catch((error) => {
          setLoading(false)
          console.log("Error -> ", error)
        })
      } else {
        console.log("Es necesario seleccionar una imagen.")
      }

    } else {
      console.log("Es necesario aceptar los permisos");
    }
  }

  const uploadImage = async (uri) => {
    setLoading(true)
    const response = await fetch(uri)
    const { _bodyBlob } = response
    const storage = getStorage()
    const storageRef = ref(storage, `Avatar/test${id}`)
    return uploadBytes(storageRef, _bodyBlob)
  }

  const uploadPhotoUrl = () => {
    const storage = getStorage()
    getDownloadURL(ref(storage, `Avatar/test${id}`))
      .then((url) => {
        const auth = getAuth()
        updateProfile(auth.currentUser, {
          photoURL: url
        }).then(() => {
          setLoading(false)
          console.log("Foto de perfil actualizada")
        }).catch(() => {
          setLoading(false)
          console.log("No se pudo actualizar la imagen de perfil.");
        })
      }).catch((error) => {
        setLoading(false)
        console.log("No se pudo actualizar la imagen de perfil.");
      })
  }

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="large"
        containerStyle={styles.avatarContainer}
        source={photoURL ? { uri: photoURL } : require("../../../assets/profileGuest2.png")}
      >
        <Avatar.Accessory size={22} onPress={(changeAvatar)} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anónimo"}
        </Text>
        <Text>
          {email ? email : "Red social"}
        </Text>
      </View>
      <Loading isVisible={isLoading} text="Actualizando la foto"/>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingBottom: 30,
  },
  avatarContainer: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  }


})