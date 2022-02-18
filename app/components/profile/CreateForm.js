import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input, Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import { isEmpty } from "lodash";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Loading from "../Loading";

export default function CreateForm(props) {
  const { navigation } = props;
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const change = (event, type) => {
    setFormData({ ...formData, [type]: event.nativeEvent.text });
  };
  const createA = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password || isEmpty(formData.password2))
    ) {
      setError({
        email: "Obligatorio",
        password: "Obligatorio",
        password2: "Obligatorio",
      });
    } else {
      setLoading(true);
      setError({
        email: "",
        password: "",
        password2: "",
      });

      if (formData.password == formData.password2) {
        setLoading(true);

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
          .then((userCredential) => {
            setLoading(false);

            navigation.navigate("profileStack");
          })
          .catch((error) => {
            setLoading(false);
            console.log("No se pudo crear", error);
          });
      } else {
        setError({
          email: "",
          password: "Las contraseñas no coinciden",
          password2: "",
        });
      }
    }
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="20203tn087@gmail.com"
        keyboardType="email-address"
        rightIcon={
          <Icon
            type="material-community"
            name="email-outline"
            size={22}
            color="#ff5a60"
          />
        }
        label="Correo Electronico"
        containerStyle={styles.containerInput}
        labelStyle={styles.labelInput}
        onChange={(event) => change(event, "email")}
        errorMessage={error.email}
      />

      <Input
        placeholder="*************"
        keyboardType="email-address"
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#ff5a60"
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        label="Password:"
        containerStyle={styles.containerInput}
        labelStyle={styles.labelInput}
        secureTextEntry={showPassword}
        onChange={(event) => change(event, "password")}
        errorMessage={error.password}
      />

      <Input
        placeholder="****************"
        keyboardType="email-address"
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#ff5a60"
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        label="Confirm Password:"
        containerStyle={styles.containerInput}
        labelStyle={styles.labelInput}
        secureTextEntry={showPassword}
        onChange={(event) => change(event, "password2")}
        errorMessage={error.password}
      />

      <Button
        title="Registrarse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        Icon={
          <Icon name="sign-in" type="font-awesome" size={20} color="#FFF" />
        }
        iconContainerStyle={{ marginRight: 10 }}
        onPress={createA}
      />

      <Text style={styles.textCreateAccount}>
        
        

      </Text>
      <Loading isVisible={loading} text="creando cuenta..." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  labelInput: {
    fontSize: 20,
    color: "#ff5a60",
  },
  containerInput: {
    width: "100%",
    marginBottom: 20,
  },
  btnContainer: {
    width: "70%",
  },
  btn: {
    color: "#FFF",
    backgroundColor: "#ff5a60",
  },
  textCreateAccount: {
    color: "##ff5a60",
    marginTop: 16,
  },
});
