import { StyleSheet, Text, View, ScrollView,Image } from 'react-native';
import React,{useState,useEffect,useCallback} from 'react';
import {db} from "../utils/firebase"
import {collection, query,orderBy,getDocs, QuerySnapshot} from "firebase/firestore"
import {useFocusEffect} from "@react-navigation/native"
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { Icon } from 'react-native-elements';
import Loading from "../components/Loading"
import ListHouses from '../components/travel/ListHouses';

export default function Travel(props) {
  const {navigation,route}=props
  console.log("route->",route)
  const [loading,setLoading]=useState(false)
  const[user, setUser]=useState()
  const [houses,setHouses]=useState([])
  useEffect(()=>{
    const auth=getAuth()
    onAuthStateChanged(auth,(userCredential)=>{
      setUser(userCredential)
    })
  },[]
  
  )
  useFocusEffect(
    useCallback(()=>{
      //estado para almacenar el array del estado
      getHouses().then((response)=>{
        setHouses(response)
      })


    },[])
  )
  const getHouses=async()=>{
    const result=[]
    const houseRef=collection(db,"houses")
    //donde la contiene, order(por que se va a ordenar, si es descedente o asce)
    const q=query(houseRef,orderBy("createAt","desc"))
    //le damos los documentos que son validos para el query
    const QuerySnapshot=await getDocs(q)
    //ciclar  el result para retornar 
    QuerySnapshot.forEach((doc)=>{
      result.push(doc)
    })
    return result

  }

  return (
    <View style={styles.container}>
      <Text>Hola</Text>
      <ListHouses houses={houses}/>
      {user &&(
        <Icon
        reverse
        type="material-community"
        size={22}
        color="#ff0560"
        containerStyle={styles.iconContainer}
        name="plus"
        onPress={()=>navigation.navigate("addHouse")}
        
        />
      )}
    
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff"
  },
  iconContainer:{
    position:"absolute",
    bottom:10,
    right:10,
    shadowOffset:{width:2,height:2},
    shadowOpacity:0.5,
  }



});
