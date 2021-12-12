import React, { Component } from "react";
import {StyleSheet, View , Text, TouchableOpacity, Pressable} from "react-native";
import { Modal, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios'

export function LogOutButton  () {  
  const [modalVisible, setModalVisible] = React.useState(false);
  const logOut = async () => {    
    console.log("logOut")
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
  
    modalView: {
      backgroundColor: "white",
      height: '100%',
    },
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
    itemTitle: {
      fontSize: 22,
      color: 'black',
      padding: 10,    
      paddingLeft: 14,
      fontWeight: "bold"
    },  
    item: {
      backgroundColor: "#ffffff",
      borderColor:'black',
      marginVertical: 1
    },
    question: {
      fontSize: 26,
      color: 'black',
      marginTop: '2%',
      marginLeft: '3%',
      marginBottom: '3%',
      width: '90%',
      fontWeight: "bold"
    },  
  });
  

export default LogOutButton;