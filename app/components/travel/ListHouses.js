import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { size } from "lodash";
import { Icon, Image } from "react-native-elements";
import React from "react";

export default function ListHouses(props) {
  //console.log("props->",props);
  const { houses } = props;

  return (
    <ScrollView>
      //si es mayor que 0 renderiza
      {size(houses) > 0 ? (
        <FlatList
        data={houses}
        renderItem={(house)=><House house={house}/>}
        keyExtractor={(item,index)=>index.toString()}
        
         />
      ) : (
        <View style={styles.loaderHouses}>
          <ActivityIndicator size="large" color="#ff5a60" />
          <Text>Cargando condominios</Text>
        </View>
      )}
    </ScrollView>
  );
}
function Houses(props) {
  const { house } = props;
  const { id, image, place, description, address } = house.item;
  const imageHouse = images[0];
  return (
    <TouchableOpacity onPress={() => console.log("me presionaste")}>
      <View style={styles.container}>
        <View style={styles.viewImage}>
          <Image
            resizeMode="cover"
            PlaceholderContent={
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
            <Text style={{fontWeight:"bold"}}>{place}</Text>
            <Text style={{paddingTop:2,color:"gray"}}>{address}</Text>
            <Text style={{paddingTop:2,color:"gray"}}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
