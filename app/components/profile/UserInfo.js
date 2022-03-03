import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { getAuth, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownoloadURL
} from "firebase/storage"
import { update } from "lodash";
import Loading from "../Loading";

export default function UserInfo(props) {
  console.log(props);
  const {
    infoUser: { uid, photoURL, displayName, email },
  } = props;
  const [loading, setLoading] = useState(false);
  const changeAvatar = async () => {
    //contiene el status de esa operacion es decir negar o aceptar se tiene que validar el stuatus si acepto o rechazo
    const resultPermissions = await Permissions.askAsync(Permissions.CAMERA);
    if (resultPermissions.permissions.camera.status !== "denied") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        //alto,ancho rectangulo
        aspect: [3, 4],
        quality: 1,
        //base64:true
      });
      //si es false selecciono una imagen, es true no selecciono
      if (!result.cancelled) {
        uploadImage(result.uri)
          .then((result) => {
            console.log("Esta bien hecho");
            uploadPhotoUrl();
          })
          .catch((err) => {
            console.log("Error->", err);
          });
      } else {
        console.log("Es necesario seleccionar un error");
      }
      console.log(result);
    } else {
      console.log("Es necesario aceptar los permisos");
    }
  };

  const uploadImage = async (uri) => {
    setLoading(true);
    const response = await fetch(uri);
    const { _bodyBlob } = response;
    const storage = getStorage();

    const storageRef = ref(storage, `Avatar/test${uid}`);
    return uploadBytes(storageRef, _bodyBlob);
  };

  const uploadPhotoUrl = () => {
    const storage = getStorage();
    getDownoloadURL(ref(storage, `Avatar/test${uid}`))
      .then((url) => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          photoURL: url,
        })
          .then(() => {
            console.log("actualizada");
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log("No se pudo");
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log("No se pudo");
      });
  };
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="large"
        containerStyle={styles.avatarContainer}
        source={
          photoURL
            ? { uri: photoURL }
            : require("../../../assets/profileGuest2.png")
        }
      >
        <Avatar.Accessory size={22} onPress={changeAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anónimo"}
        </Text>
        <Text>{email ? email : "Red social"}</Text>
      </View>
      <Loading isVisible={loading} text="actualizando" />
    </View>
  );
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
  },
});
