import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input, Button, Icon } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { isEmpty } from "lodash";
import { NavigationRouteContext } from "@react-navigation/native";
//import

export default function LoginForm(props) {
  //desestructurar props
  const {navigation}=props;
  //posicion 0 get, 1 set

  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  const change = (event, type) => {
    setFormData({ ...formData, [type]: event.nativeEvent.text });
    console.log(formData);
  };

  const login = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      setError({
        email: "Campo obligatorio",
        password: "Campo obligatorio",
      });
    } else {
      //Inicio de sesión
      const auth = getAuth();
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        //me regresa una respuesta y por eso ocuapamos el  .then que ejecuta mi promesa
        .then((userCredential) => {
          // Signed in
          //const user = userCredential.user;
          //console.log(user);
          // ...

          navigation.navigate("profileStack")
        })
        .catch((error) => { //implementar los codigos de errores 
          console.log("Usuario y contraseñas incorrectas", error);
        });
      setError({
        email: "",
        password: "",
      });
    }
  };



  return (
    <View style={styles.container}>
      <Input
        placeholder="20203tn087@utez.edu.mx"
        keyboardType="email-address"
        rightIcon={
          <Icon
            type="material-community"
            name="email-outline"
            size={20}
            color="#ff5a60"
          />
        }
        label="Correo Electronico"
        containerStyle={styles.containerInput}
        labelStyle={styles.labelInput}
        // onChange={(event)=>console.log(event)}
        onChange={(event) => change(event, "email")}
        errorMessage={error.email}
      />
      <Input
        placeholder="***********"
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#ff5a60"
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        label="Contraseña:*"
        containerStyle={styles.containerInput}
        labelStyle={styles.labelInput}
        secureTextEntry={showPassword}
        onChange={(event) => change(event, "password")}
        errorMessage={error.password}
      />

      <Button
        title="Iniciar Sesion"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        icon={
          <Icon name="sign-in" type="font-awesome" color="#fff" size={20} />
        }
        iconContainerStyle={{ marginRight: 10 }}
        onPress={login}
      />
      <Text style={styles.textCreateAccount}>
        <Icon
          type="material-community"
          name="account-plus"
          size={20}
          color="#1E84B6"
        />
        Crear Cuenta
      </Text>
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
  containerInput: {
    width: "100%",
    marginBottom: 20,
  },
  labelInput: {
    fontSize: 20,
    color: "#ff5a60",
  },
  btnContainer: {
    width: "70%",
  },
  btn: {
    color: "#fff",
    backgroundColor: "#ff5a60",
  },
  textCreateAccount: {
    color: "#1E84B6",
    marginTop: 16,
  },
});
