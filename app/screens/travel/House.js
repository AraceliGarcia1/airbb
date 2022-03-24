import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import MyCarousel from '../../utils/MyCarousel';
import Loading from '../../components/Loading';
import {Rating, ListItem} from "react-native-elements"
import Map from '../../utils/Map';
import { map } from 'lodash';

const screeWidth = Dimensions.get ("window").width

export default function House(props) {

    const { navigation } = props
    const {house}=props.route.params
    const { images, place, location, address } = house
    console.log(props.route.params.house);

    useEffect(() => {
      navigation.setOptions({ title: place })
    },[])

  return (
    <ScrollView style={{backgroundColor:"#fff"}}>
      <MyCarousel 
        arrayImage = { images }
        height = { 250}
        width = { screeWidth }
      />
      <TitleHouse
        house={house}

      />
      <HouseInfo
        location={location}
        place={place}
        address={address}

      />
    </ScrollView>
  )
}

function TitleHouse(props){
  const {house}=props
  //guardado en la base de datos 
  const{rating,description,place}=house
  return(
    <View style={styles.containerTitle}>
      <View style={{flexDirection:"row"}}>
        <Text style={styles.place}>{place}</Text>
        <Rating
          style={styles.rating}
          imageSize={40}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  )
}

function HouseInfo(props){
  const {location,place,address}=props
  const listInfo=[
    {
      text:address,
      iconName:"map",
      iconType:"material-community",
      action:null
    },
    {
      text:"7772997901",
      iconName:"phone",
      iconType:"material-community",
      action:null
    },
    {
      text:"casita@gmail.com",
      iconName:"at",
      iconType:"material-community",
      action:null
    }
  ]
  return(
    <View style={styles.containerHouseInfo}>
      <Text style={styles.textInformation}>
        Informacion del condominio
      </Text>
      <Map
        location={location}
        place={place}
        height={200}
      />
      {map(listInfo,(item,index)=>(
        <ListItem bottomDivider key={index}>
        <ListItem.Content>
          <ListItem.Title>{item.text}</ListItem.Title>
          <ListItem.Subtitle>{item.address}</ListItem.Subtitle>
          <ListItem.Chevron onPress={()=>console.log("Hola")}/>
        </ListItem.Content> 
        </ListItem>
      ))}
    </View>
  )
  
  

}

const styles = StyleSheet.create({
  containerTitle:{
    flex:1,
    backgroundColor:"#fff",
    padding:20,

  },
  place:{
    fontSize:20,
    fontWeight:"bold",

  },
  description:{
    marginTop:5,
    color:"gray",

  },
  rating:{
    position:"absolute",
    right:0

  },
  containerHouseInfo:{
    margin:15,
    backgroundColor:"#fff",
    marginBottom:20

  },
  textInformation:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:10,
  }
})