import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { size } from "lodash";
import { Image } from "react-native-elements";
import { color } from "react-native-elements/dist/helpers";
import { useNavigation } from "@react-navigation/native";

export default function ListHouses(props) {
  //console.log("props =>", props)
  const { houses } = props;
  const navigation = useNavigation()

  return (
    <ScrollView>
      {size(houses) > 0 ? (
        <FlatList
          data={houses}
          renderItem={(house) => <House house={house} navigation={navigation}/>}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.loadingHouses}>
          <ActivityIndicator size="large" color="#ff5a60" />
          <Text> Cargando Condominios . . . </Text>
        </View>
      )}
    </ScrollView>
  );

  function House(props) {
    const { house } = props;
    const { id, images, place, description, address } = house.item;
    const imageHouse = images[0];

    //console.log("---->", images[0]);

    return (
      <TouchableOpacity onPress={() => navigation.navigate("house", {house: house.item})}>
        <View style={styles.container}>
          <View style={styles.viewImage}>
            <Image
              resizeMode="cover"
              PlaceHolderContent={
                <ActivityIndicator size="large" color="#ff5a60" />
              }
              source={
                imageHouse
                  ? { uri: imageHouse }
                  : require("../../../assets/profileGuest2.png")
              }
              style={styles.img}
            />
          </View>

          <View>
            <Text style={{ fontWeight: "bold" }}> {place} </Text>
            <Text style={{ paddingTop: 2, color: "gray" }}> {address} </Text>
            <Text style={{ paddingTop: 2, color: "gray", width: 300}}>{description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    img: {
        width: 80,
        height: 80
    },
    container: {
        flexDirection: "row",
        margin: 10
    },
    viewImage: {
        marginRight: 15
    }
});
