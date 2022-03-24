import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { db } from "../utils/firebase";
import {
  collection,
  query,
  orderBy,
  getDocs,
  QuerySnapshot,
  Query,
  limit,
} from "firebase/firestore";
import { size } from "lodash";
import { Loading } from "../components/Loading";
import ListHousesFive from "./travel/ListHousesFive";

export default function TopFive(props) {
  console.log("props =>", props)
  
  const { navigation } = props;
  const [user, setUser] = useState();
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (userCrendential) => {
      setUser(userCrendential);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
        getTopFive().then((response) => {
        setHouses(response);
      });
    }, [])
  );

  const getTopFive = async () => {
    const result = [];
    const housesRef = collection(db, "houses");
    const q = query(housesRef, orderBy("rating", "desc"), limit (5));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    return result;
  };

  return (
    <View style={styles.container}>
      <ListHousesFive houses={houses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  iconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  iconContainer2: {
    position: "absolute",
    bottom: 10,
    left: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
