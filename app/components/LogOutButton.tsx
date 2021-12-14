import React, { Component } from "react";
import {StyleSheet, View , Text, TouchableOpacity, Pressable} from "react-native";
import { Modal, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootTabScreenProps } from "../types";

export function LogOutButton({ navigation }){  
  const logOut = async () => {  
    await AsyncStorage.removeItem('userSession');
    navigation.navigate('Login');
  };

  return (
    <>  
    <Pressable style={[styles.button, {backgroundColor: '#ff5555'}]} onPress ={() => logOut()} >
      <Text style = {{color:'white', fontWeight: "bold"}}>Cerrar sesión</Text>
    </Pressable>
    </>
)

}
const styles = StyleSheet.create({
  
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      margin : 10,
      borderRadius: 4,
      elevation: 3,
      width: '90%',    
      backgroundColor: '#a2cff0',
    },
  });
  

export default LogOutButton;