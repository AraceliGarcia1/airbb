import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './app/navigation/Navigation';
import {app} from "./app/utils/firebase"
import {LogBox} from "react-native"
export default function App() {
  LogBox.ignoreAllLogs(true);
  return (
    <Navigation />
  );
}

const styles = StyleSheet.create({});
