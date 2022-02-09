import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import UserGuest from './profile/UserGuest';

export default function Profile(props) {
  console.log(props);
  const{navigation}=props;
  return (
    <UserGuest navigation={navigation} fullName="Araceli Garcia"/>
  );
}

const styles = StyleSheet.create({});
